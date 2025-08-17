import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { useI18n } from '../contexts/I18nContext';
import amazonProducts from '../data/amazon_products.json';

interface Product {
  name: string;
  link: string;
  price: string;
  original_image_url: string;
  review_count?: string;
}

// 懒加载图片组件
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {!isInView ? (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/320x320?text=Image+Not+Available';
            }}
          />
        </>
      )}
    </div>
  );
};

const Shop: React.FC = () => {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // 商品分类
  const categories = [
    { id: 'all', name: t('shop.categories.all'), count: amazonProducts.length },
    { id: 'bracelets', name: t('shop.categories.bracelets'), count: amazonProducts.length }, // 目前只有手链
    { id: 'necklaces', name: t('shop.categories.necklaces'), count: 0 },
    { id: 'rings', name: t('shop.categories.rings'), count: 0 },
    { id: 'accessories', name: t('shop.categories.gifts'), count: 0 },
    { id: 'home-decor', name: t('shop.categories.homeDecor'), count: 0 },
  ];

  // 计算推荐分数
  const calculateRecommendedScore = (product: Product): number => {
    const price = parseFloat(product.price.replace('$', ''));
    const reviews = parseInt((product.review_count || '0').replace(/,/g, ''));
    
    // 综合评分：评论数权重更高，价格越低越好
    const reviewScore = Math.log(reviews + 1) * 10; // 对数缩放评论数
    const priceScore = Math.max(0, 50 - price); // 价格越低分数越高
    
    return reviewScore + priceScore * 0.3;
  };

  // 过滤和排序商品
  const filteredProducts = useMemo(() => {
    let products = amazonProducts;

    // 按分类过滤
    if (selectedCategory === 'bracelets') {
      products = amazonProducts; // 目前所有商品都是手链
    } else if (selectedCategory !== 'all') {
      products = []; // 其他分类暂时没有商品
    }

    // 按搜索词过滤
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        case 'price-high':
          const priceA2 = parseFloat(a.price.replace('$', ''));
          const priceB2 = parseFloat(b.price.replace('$', ''));
          return priceB2 - priceA2;
        case 'reviews-high':
          const reviewsA = parseInt((a.review_count || '0').replace(/,/g, ''));
          const reviewsB = parseInt((b.review_count || '0').replace(/,/g, ''));
          return reviewsB - reviewsA;
        case 'reviews-low':
          const reviewsA2 = parseInt((a.review_count || '0').replace(/,/g, ''));
          const reviewsB2 = parseInt((b.review_count || '0').replace(/,/g, ''));
          return reviewsA2 - reviewsB2;
        case 'recommended':
        default:
          // 推荐排序：综合考虑评论数和价格的性价比
          const scoreA = calculateRecommendedScore(a);
          const scoreB = calculateRecommendedScore(b);
          return scoreB - scoreA;
      }
    });

    return sortedProducts;
  }, [searchTerm, selectedCategory, sortBy]);

  // 清理评论数量格式
  const formatReviewCount = (count?: string): string => {
    if (!count) return '0';
    const cleanCount = count.replace(/,/g, '');
    const num = parseInt(cleanCount);
    if (isNaN(num)) return '0';
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return cleanCount;
  };

  return (
    <Layout title={t('shop.meta.title')} description={t('shop.meta.description')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('shop.header.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('shop.header.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Search */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('shop.sidebar.searchTitle')}
              </h3>
              <input
                type="text"
                placeholder={t('shop.filters.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('shop.sidebar.categoriesTitle')}
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coming Soon Notice */}
            {selectedCategory !== 'all' && selectedCategory !== 'bracelets' && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                  {t('shop.sidebar.comingSoon.title')}
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {t('shop.sidebar.comingSoon.message').replace('{category}', categories.find(c => c.id === selectedCategory)?.name.toLowerCase() || '')}
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <p className="text-gray-600 dark:text-gray-400">
                {t('shop.results.showing').replace('{count}', filteredProducts.length.toString())}
                {searchTerm && t('shop.results.forSearch').replace('{searchTerm}', searchTerm)}
                {selectedCategory !== 'all' && t('shop.results.inCategory').replace('{categoryName}', categories.find(c => c.id === selectedCategory)?.name || '')}
              </p>
              
              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {t('shop.filters.sortBy')}
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recommended">{t('shop.filters.sortOptions.featured')}</option>
                  <option value="price-low">{t('shop.filters.sortOptions.priceLow')}</option>
                  <option value="price-high">{t('shop.filters.sortOptions.priceHigh')}</option>
                  <option value="reviews-high">{t('shop.filters.sortOptions.reviewsHigh')}</option>
                  <option value="reviews-low">{t('shop.filters.sortOptions.reviewsLow')}</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product: Product, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                         {/* Product Image */}
                     <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                       <LazyImage
                         src={product.original_image_url}
                         alt={`Morse code bracelet - ${product.name.split(' ').slice(0, 4).join(' ')}`}
                         className="w-full h-full"
                       />
                     </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm text-gray-900 dark:text-white mb-2 line-clamp-3">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {product.price}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                            ({formatReviewCount(product.review_count)} {t('shop.product.reviews')})
                          </span>
                        </div>
                      </div>

                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block text-center"
                      >
                        {t('shop.actions.viewOnAmazon')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {t('shop.empty.noProducts')}
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {t('shop.empty.tryDifferentSearch')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('shop.sections.infoSection.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              <span dangerouslySetInnerHTML={{ __html: t('shop.sections.infoSection.description').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace('morse code translator tool', '<a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">morse code translator</a> tool') }} />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('shop.sections.features.meaningfulMessages.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('shop.sections.features.meaningfulMessages.description')}
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('shop.sections.features.qualityMaterials.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('shop.sections.features.qualityMaterials.description')}
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('shop.sections.features.perfectGifts.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('shop.sections.features.perfectGifts.description')}
              </p>
            </div>
          </div>
        </div>

        {/* SEO Section 1 - Morse Code Bracelets */}
        <div className="mt-12 space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('shop.sections.seoSections.bracelets.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.bracelets.description1').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.bracelets.description2').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('shop.sections.seoSections.bracelets.popularMessages.title')}</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {t('shop.sections.seoSections.bracelets.popularMessages.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SEO Section 2 - Product Categories */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('shop.sections.seoSections.collection.title')}
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.description').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-blue-600 dark:text-blue-400">{t('shop.sections.seoSections.collection.categories.bracelets.emoji')}</span> {t('shop.sections.seoSections.collection.categories.bracelets.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.bracelets.description').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-purple-600 dark:text-purple-400">{t('shop.sections.seoSections.collection.categories.necklaces.emoji')}</span> {t('shop.sections.seoSections.collection.categories.necklaces.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.necklaces.description').replace(/\*Coming Soon\*/g, '<em>Coming Soon</em>') }} />
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-pink-600 dark:text-pink-400">{t('shop.sections.seoSections.collection.categories.rings.emoji')}</span> {t('shop.sections.seoSections.collection.categories.rings.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.rings.description').replace(/\*Coming Soon\*/g, '<em>Coming Soon</em>') }} />
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-green-600 dark:text-green-400">{t('shop.sections.seoSections.collection.categories.gifts.emoji')}</span> {t('shop.sections.seoSections.collection.categories.gifts.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.gifts.description').replace(/\*Coming Soon\*/g, '<em>Coming Soon</em>') }} />
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-orange-600 dark:text-orange-400">{t('shop.sections.seoSections.collection.categories.homeDecor.emoji')}</span> {t('shop.sections.seoSections.collection.categories.homeDecor.title').replace('{homeDecorTitle}', t('shop.categories.homeDecor'))}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.homeDecor.description').replace(/\*Coming Soon\*/g, '<em>Coming Soon</em>') }} />
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    <span className="text-red-600 dark:text-red-400">{t('shop.sections.seoSections.collection.categories.custom.emoji')}</span> {t('shop.sections.seoSections.collection.categories.custom.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.collection.categories.custom.description').replace(/\*Coming Soon\*/g, '<em>Coming Soon</em>') }} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional SEO Section - Shopping Guide */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('shop.sections.seoSections.guide.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('shop.sections.seoSections.guide.whyChoose.title')}</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {t('shop.sections.seoSections.guide.whyChoose.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-rose-600 dark:text-rose-400 font-bold mr-2">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('shop.sections.seoSections.guide.occasions.title')}</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  {t('shop.sections.seoSections.guide.occasions.items').map((occasion: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <span className="text-rose-600 dark:text-rose-400 mr-2">{occasion.emoji}</span>
                      <span><strong>{occasion.title}</strong> <span dangerouslySetInnerHTML={{ __html: occasion.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <p className="text-rose-800 dark:text-rose-200 text-sm">
                <span dangerouslySetInnerHTML={{ __html: t('shop.sections.seoSections.guide.guarantee').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop; 
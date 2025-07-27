import { useEffect, useCallback } from 'react';

// 设备检测
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// 网络状况检测
const getNetworkInfo = () => {
  // @ts-ignore - experimental API
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return { effectiveType: '4g', saveData: false };
  
  return {
    effectiveType: connection.effectiveType || '4g',
    saveData: connection.saveData || false
  };
};

// FCP检测 - 确保首屏渲染完成
const waitForFCP = (): Promise<void> => {
  return new Promise((resolve) => {
    // 使用 requestIdleCallback 确保在浏览器空闲时执行
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // 等待下一个宏任务，确保DOM渲染完成
        setTimeout(resolve, 0);
      });
    } else {
      // 兜底方案：等待3秒确保FCP完成
      setTimeout(resolve, 3000);
    }
  });
};

export const useAdvancedPreload = () => {
  const isMobile = isMobileDevice();
  
  // 桌面端全页面预加载
  const preloadAllPages = useCallback(async () => {
    if (isMobile) return;
    
    const { effectiveType, saveData } = getNetworkInfo();
    
    // 如果用户开启了数据节省模式，不预加载
    if (saveData) {
      console.log('Data saver mode detected, skipping preload');
      return;
    }
    
    // 如果是慢网络，不预加载
    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      console.log('Slow network detected, skipping preload');
      return;
    }
    
    console.log('Starting desktop full preload strategy');
    
    // 等待FCP完成
    await waitForFCP();
    
    // 分批预加载，避免阻塞主线程
    const preloadBatches = [
      // 第一批：最常用页面
      () => Promise.all([
        import('../pages/BasicAndTips'),
        import('../pages/History'),
      ]),
      
      // 第二批：参考表页面
      () => Promise.all([
        import('../pages/MorseCodeSheet'),
        import('../pages/CommonWords'),
        import('../pages/CommonPhrases'),
      ]),
      
      // 第三批：解码器页面
      () => Promise.all([
        import('../pages/TxtToMorseEncoder'),
        import('../pages/DecodeText'),
        import('../pages/DecodeImage'),
      ]),
      
      // 第四批：其他页面
      () => Promise.all([
        import('../pages/CommonAbbr'),
        import('../pages/MorseCodeAlphabet'),
        import('../pages/MorseCodeNumbers'),
        import('../pages/DecodeAudio'),
        import('../pages/MorseCodeSound'),
        import('../pages/Shop'),
      ]),
    ];
    
    // 使用递归方式分批预加载，每批之间间隔500ms
    const loadBatch = async (index: number) => {
      if (index >= preloadBatches.length) return;
      
      try {
        await preloadBatches[index]();
        console.log(`Preload batch ${index + 1} completed`);
        
        // 等待500ms再加载下一批
        setTimeout(() => loadBatch(index + 1), 500);
      } catch (error) {
        console.warn(`Preload batch ${index + 1} failed:`, error);
        // 即使失败也继续下一批
        setTimeout(() => loadBatch(index + 1), 500);
      }
    };
    
    // 开始第一批预加载
    loadBatch(0);
  }, [isMobile]);
  
  // 移动端首页预加载
  const preloadHomepageOnly = useCallback(async () => {
    if (!isMobile) return;
    
    const { effectiveType, saveData } = getNetworkInfo();
    
    // 移动端更严格的网络检测
    if (saveData || effectiveType === '2g' || effectiveType === 'slow-2g') {
      console.log('Mobile: Skipping preload due to network conditions');
      return;
    }
    
    console.log('Starting mobile homepage preload strategy');
    
    // 等待FCP完成
    await waitForFCP();
    
    // 只预加载主要的导航页面
    try {
      // 延迟2秒，确保用户已经看到首屏内容
      setTimeout(async () => {
        await Promise.all([
          import('../pages/Learn'),   // 如果还没加载
          import('../pages/Sheet'),   // 如果还没加载
        ]);
        console.log('Mobile: Core pages preloaded');
      }, 2000);
    } catch (error) {
      console.warn('Mobile preload failed:', error);
    }
  }, [isMobile]);
  
  // 智能预加载函数
  const smartPreload = useCallback(() => {
    if (isMobile) {
      preloadHomepageOnly();
    } else {
      preloadAllPages();
    }
  }, [isMobile, preloadHomepageOnly, preloadAllPages]);
  
  return { smartPreload, preloadAllPages, preloadHomepageOnly };
};
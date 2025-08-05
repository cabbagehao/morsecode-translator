export default async (request, context) => {
  const url = new URL(request.url);
  const { pathname } = url;
  
  // 如果路径以/结尾且不是根路径，则重定向到不带斜杠的版本
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newPathname = pathname.slice(0, -1);
    const newUrl = new URL(newPathname + url.search + url.hash, url.origin);
    
    // 返回301永久重定向
    return new Response(null, {
      status: 301,
      headers: {
        'Location': newUrl.toString(),
        'Cache-Control': 'public, max-age=86400' // 缓存24小时
      }
    });
  }
  
  // 其他情况继续正常处理
  return context.next();
};
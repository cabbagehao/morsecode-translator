import { useCallback } from 'react';

// 预加载路由的Hook
export const usePreloadRoute = () => {
  const preloadRoute = useCallback((routePath: string) => {
    // 根据路径预加载对应组件
    switch (routePath) {
      case '/learn/history':
        import('../pages/History');
        break;
      case '/learn/basic-and-tips':
        import('../pages/BasicAndTips');
        break;
      case '/sheet/morse-code-sheet':
        import('../pages/MorseCodeSheet');
        break;
      case '/sheet/common-abbr':
        import('../pages/CommonAbbr');
        break;
      case '/sheet/common-words':
        import('../pages/CommonWords');
        break;
      case '/sheet/common-phrases':
        import('../pages/CommonPhrases');
        break;
      case '/sheet/morse-code-alphabet':
        import('../pages/MorseCodeAlphabet');
        break;
      case '/sheet/morse-code-numbers':
        import('../pages/MorseCodeNumbers');
        break;
      case '/decoders/txt-to-morse':
        import('../pages/TxtToMorseEncoder');
        break;
      case '/decoders/decode-text':
        import('../pages/DecodeText');
        break;
      case '/decoders/decode-image':
        import('../pages/DecodeImage');
        break;
      case '/decoders/decode-audio':
        import('../pages/DecodeAudio');
        break;
      case '/shop':
        import('../pages/Shop');
        break;
    }
  }, []);

  return { preloadRoute };
};
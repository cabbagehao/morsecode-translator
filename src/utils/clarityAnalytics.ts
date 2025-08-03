// Microsoft Clarity 增强分析工具

// 类型定义
interface ClarityEvent {
  inputType?: 'text' | 'morse';
  isFirstInteraction?: boolean;
  sessionTime?: number;
  textLength?: number;
  morseLength?: number;
  [key: string]: any;
}

// 检查Clarity是否可用
export const isClarityAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).clarity;
};

// 发送自定义事件到Clarity
export const trackClarityEvent = (eventName: string, eventData?: ClarityEvent): void => {
  if (isClarityAvailable()) {
    try {
      (window as any).clarity('event', eventName, eventData);
    } catch (error) {
      console.warn('Clarity event tracking failed:', error);
    }
  }
};

// 设置Clarity自定义标签
export const setClarityTag = (key: string, value: string): void => {
  if (isClarityAvailable()) {
    try {
      (window as any).clarity('set', key, value);
    } catch (error) {
      console.warn('Clarity tag setting failed:', error);
    }
  }
};

// 识别用户（当用户执行重要操作时）
export const identifyClarityUser = (userId: string, properties?: Record<string, any>): void => {
  if (isClarityAvailable()) {
    try {
      (window as any).clarity('identify', userId, properties);
    } catch (error) {
      console.warn('Clarity user identification failed:', error);
    }
  }
};

// 升级会话（标记为重要会话）
export const upgradeSession = (): void => {
  if (isClarityAvailable()) {
    try {
      (window as any).clarity('upgrade');
    } catch (error) {
      console.warn('Clarity session upgrade failed:', error);
    }
  }
};

// 专门的用户行为追踪函数
export const trackUserBehaviorToClarity = (action: string, details?: any): void => {
  trackClarityEvent(action, {
    inputType: details?.inputType || 'unknown',
    isFirstInteraction: details?.isFirstInteraction || false,
    sessionTime: details?.sessionTime || 0,
    textLength: details?.textLength || 0,
    morseLength: details?.morseLength || 0,
    firstInteractionWas: details?.firstInteractionWas || null
  });

  // 如果是首次交互，设置会话标签
  if (details?.isFirstInteraction) {
    setClarityTag('first_interaction_type', details.inputType);
    setClarityTag('session_start_time', new Date().toISOString());
    
    // 如果用户很快开始交互，升级会话
    if (details.sessionTime < 5000) { // 5秒内
      upgradeSession();
      setClarityTag('quick_interaction', 'true');
    }
  }

  // 标记活跃用户
  if (action === 'text_input' || action === 'morse_input') {
    const inputCount = parseInt(localStorage.getItem('input_count') || '0') + 1;
    localStorage.setItem('input_count', inputCount.toString());
    
    if (inputCount >= 5) {
      setClarityTag('active_user', 'true');
      setClarityTag('total_inputs', inputCount.toString());
    }
  }
};

// 页面加载时设置基础信息
export const initializeClaritySession = (pageType?: string): void => {
  if (!isClarityAvailable()) return;

  // 根据当前路径确定页面类型
  const currentPath = window.location.pathname;
  let detectedPageType = 'homepage';
  
  if (currentPath === '/' || currentPath === '/ko' || currentPath === '/es' || currentPath === '/ru') {
    detectedPageType = 'morse_translator';
  } else if (currentPath.startsWith('/learn')) {
    detectedPageType = 'learning_resources';
  } else if (currentPath.startsWith('/sheet')) {
    detectedPageType = 'reference_sheets';
  } else if (currentPath.startsWith('/decoders')) {
    detectedPageType = 'decoder_tools';
  } else if (currentPath.startsWith('/shop')) {
    detectedPageType = 'shop';
  } else if (currentPath.startsWith('/feedback')) {
    detectedPageType = 'feedback';
  }
  
  // 使用传入的页面类型或检测到的类型
  const finalPageType = pageType || detectedPageType;
  
  // 设置页面相关标签
  setClarityTag('page_type', finalPageType);
  setClarityTag('page_path', currentPath);
  setClarityTag('device_type', /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop');
  setClarityTag('language', navigator.language);
  
  // 检查是否是回访用户
  const hasVisitedBefore = localStorage.getItem('has_visited_before');
  if (hasVisitedBefore) {
    setClarityTag('user_type', 'returning');
  } else {
    setClarityTag('user_type', 'new');
    localStorage.setItem('has_visited_before', 'true');
  }
  
  // 设置访问次数
  const visitCount = parseInt(localStorage.getItem('visit_count') || '0') + 1;
  localStorage.setItem('visit_count', visitCount.toString());
  setClarityTag('visit_count', visitCount.toString());
};

// 在开发环境中提供调试工具
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).clarityDebug = {
    trackEvent: trackClarityEvent,
    setTag: setClarityTag,
    isAvailable: isClarityAvailable,
    upgrade: upgradeSession
  };
  
  console.log('🔧 Clarity调试工具已就绪: window.clarityDebug');
}

// 针对不同页面的专用追踪函数
export const trackPageSpecificEvent = (eventName: string, eventData?: any): void => {
  const currentPath = window.location.pathname;
  const enhancedData = {
    ...eventData,
    page_path: currentPath,
    timestamp: new Date().toISOString()
  };
  
  trackClarityEvent(eventName, enhancedData);
};

// 追踪学习页面行为
export const trackLearningPageEvent = (action: string, details?: any): void => {
  trackPageSpecificEvent('learning_page_interaction', {
    action,
    ...details
  });
};

// 追踪参考页面行为
export const trackReferencePageEvent = (action: string, details?: any): void => {
  trackPageSpecificEvent('reference_page_interaction', {
    action,
    ...details
  });
};

// 追踪解码器页面行为
export const trackDecoderPageEvent = (action: string, details?: any): void => {
  trackPageSpecificEvent('decoder_page_interaction', {
    action,
    ...details
  });
};

// 追踪翻译器页面行为（这个在TranslatorContext中已经处理）
export const trackTranslatorPageEvent = (action: string, details?: any): void => {
  trackPageSpecificEvent('translator_page_interaction', {
    action,
    ...details
  });
};
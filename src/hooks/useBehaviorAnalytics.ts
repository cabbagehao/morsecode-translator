import { useEffect, useState } from 'react';
import { 
  getBehaviorLogs, 
  getBehaviorSummary, 
  analyzeFirstInteractionPreference,
  type BehaviorLog 
} from '../utils/behaviorAnalytics';

export interface BehaviorStats {
  totalLogs: number;
  textFirstPercentage: number;
  morseFirstPercentage: number;
  totalSessions: number;
  averageSessionTime: number;
  recentLogs: BehaviorLog[];
}

// Hook for real-time behavior analytics
export const useBehaviorAnalytics = () => {
  const [stats, setStats] = useState<BehaviorStats>({
    totalLogs: 0,
    textFirstPercentage: 0,
    morseFirstPercentage: 0,
    totalSessions: 0,
    averageSessionTime: 0,
    recentLogs: []
  });

  const refreshStats = () => {
    const summary = getBehaviorSummary();
    const firstInteraction = analyzeFirstInteractionPreference();
    
    setStats({
      totalLogs: summary.totalLogs,
      textFirstPercentage: firstInteraction.textFirstPercentage,
      morseFirstPercentage: firstInteraction.totalSessions > 0 
        ? ((firstInteraction.morseFirst / firstInteraction.totalSessions) * 100) 
        : 0,
      totalSessions: firstInteraction.totalSessions,
      averageSessionTime: summary.sessions.averageSessionTime,
      recentLogs: summary.recentLogs
    });
  };

  useEffect(() => {
    // 初始加载
    refreshStats();
    
    // 监听localStorage变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_behavior_logs') {
        refreshStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 定期刷新（每5秒）
    const interval = setInterval(refreshStats, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    refreshStats,
    // 便捷的访问器
    get isTextPreferred() {
      return stats.textFirstPercentage > 50;
    },
    get isMorsePreferred() {
      return stats.textFirstPercentage < 50;
    },
    get hasEnoughData() {
      return stats.totalSessions >= 5;
    }
  };
};

// 简单的行为追踪hook，用于其他组件
export const useBehaviorTracker = () => {
  const trackPageView = (pageName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
  };

  const trackFeatureUsage = (featureName: string, details?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'feature_usage', {
        event_category: 'Features',
        event_label: featureName,
        ...details
      });
    }
  };

  return {
    trackPageView,
    trackFeatureUsage
  };
};
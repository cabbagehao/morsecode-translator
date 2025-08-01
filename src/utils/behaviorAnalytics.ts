// 用户行为分析工具

export interface BehaviorLog {
  timestamp: string;
  action: string;
  inputType?: 'text' | 'morse';
  isFirstInteraction?: boolean;
  sessionTime?: number;
  textLength?: number;
  morseLength?: number;
  firstInteractionWas?: 'text' | 'morse' | null;
}

// 获取用户行为日志
export const getBehaviorLogs = (): BehaviorLog[] => {
  if (typeof window === 'undefined') return [];
  
  const logs = localStorage.getItem('user_behavior_logs');
  return logs ? JSON.parse(logs) : [];
};

// 清理行为日志
export const clearBehaviorLogs = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_behavior_logs');
  }
};

// 分析首次交互偏好
export const analyzeFirstInteractionPreference = (): {
  textFirst: number;
  morseFirst: number;
  totalSessions: number;
  textFirstPercentage: number;
} => {
  const logs = getBehaviorLogs();
  const firstInteractions = logs.filter(log => 
    log.action === 'first_interaction' && log.isFirstInteraction
  );

  const textFirst = firstInteractions.filter(log => log.inputType === 'text').length;
  const morseFirst = firstInteractions.filter(log => log.inputType === 'morse').length;
  const totalSessions = firstInteractions.length;
  
  return {
    textFirst,
    morseFirst,
    totalSessions,
    textFirstPercentage: totalSessions > 0 ? (textFirst / totalSessions) * 100 : 0
  };
};

// 分析用户会话时长
export const analyzeSessionDuration = (): {
  averageSessionTime: number;
  sessions: number;
  sessionTimes: number[];
} => {
  const logs = getBehaviorLogs();
  const firstInteractions = logs.filter(log => 
    log.action === 'first_interaction' && log.sessionTime !== undefined
  );

  const sessionTimes = firstInteractions.map(log => log.sessionTime || 0);
  const averageSessionTime = sessionTimes.length > 0 
    ? sessionTimes.reduce((sum, time) => sum + time, 0) / sessionTimes.length 
    : 0;

  return {
    averageSessionTime,
    sessions: sessionTimes.length,
    sessionTimes
  };
};

// 获取用户行为统计摘要
export const getBehaviorSummary = () => {
  const firstInteractionData = analyzeFirstInteractionPreference();
  const sessionData = analyzeSessionDuration();
  const logs = getBehaviorLogs();

  return {
    totalLogs: logs.length,
    firstInteraction: firstInteractionData,
    sessions: sessionData,
    recentLogs: logs.slice(-10), // 最近10条记录
  };
};

// 导出行为数据为JSON
export const exportBehaviorData = (): string => {
  const summary = getBehaviorSummary();
  return JSON.stringify(summary, null, 2);
};

// 在控制台中显示行为分析结果
export const logBehaviorAnalysis = (): void => {
  const summary = getBehaviorSummary();
  
  console.group('🔍 用户行为分析');
  console.log('📊 总记录数:', summary.totalLogs);
  console.log('🎯 首次交互偏好:');
  console.log(`  • Text框优先: ${summary.firstInteraction.textFirst}次 (${summary.firstInteraction.textFirstPercentage.toFixed(1)}%)`);
  console.log(`  • Morse框优先: ${summary.firstInteraction.morseFirst}次`);
  console.log(`  • 总会话数: ${summary.firstInteraction.totalSessions}`);
  console.log('⏱️ 会话时长分析:');
  console.log(`  • 平均会话时长: ${(summary.sessions.averageSessionTime / 1000).toFixed(1)}秒`);
  console.log(`  • 总会话数: ${summary.sessions.sessions}`);
  console.log('📝 最近记录:', summary.recentLogs);
  console.groupEnd();
};

// 在开发环境中自动每30秒输出一次分析
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // 添加快捷方式到window对象方便调试
  (window as any).analyzeBehavior = logBehaviorAnalysis;
  (window as any).exportBehaviorData = exportBehaviorData;
  (window as any).clearBehaviorLogs = clearBehaviorLogs;
  
  console.log('🔧 开发工具已就绪:');
  console.log('  • analyzeBehavior() - 显示行为分析');
  console.log('  • exportBehaviorData() - 导出数据');
  console.log('  • clearBehaviorLogs() - 清理数据');
}
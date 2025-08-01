import React, { useState } from 'react';
import { useBehaviorAnalytics } from '../hooks/useBehaviorAnalytics';
import { clearBehaviorLogs, exportBehaviorData } from '../utils/behaviorAnalytics';

// 仅在开发环境中使用的调试面板
export const BehaviorDebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { stats, refreshStats } = useBehaviorAnalytics();

  // 仅在开发环境中渲染
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleExport = () => {
    const data = exportBehaviorData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `behavior-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('确定要清除所有行为数据吗？')) {
      clearBehaviorLogs();
      refreshStats();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      {/* 切换按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          background: '#333',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        📊 行为分析 {isVisible ? '▼' : '▶'}
      </button>

      {/* 调试面板 */}
      {isVisible && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '400px',
          maxHeight: '500px',
          overflow: 'auto'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>
            🔍 用户行为统计
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <strong>📊 基础数据:</strong>
            <div>总记录数: {stats.totalLogs}</div>
            <div>总会话数: {stats.totalSessions}</div>
            <div>平均会话时长: {(stats.averageSessionTime / 1000).toFixed(1)}s</div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <strong>🎯 首次交互偏好:</strong>
            <div>Text框优先: {stats.textFirstPercentage.toFixed(1)}%</div>
            <div>Morse框优先: {stats.morseFirstPercentage.toFixed(1)}%</div>
            <div style={{ 
              color: stats.textFirstPercentage > 50 ? '#4ade80' : '#f87171',
              fontWeight: 'bold'
            }}>
              用户更倾向于: {stats.textFirstPercentage > 50 ? 'Text框' : 'Morse框'}
            </div>
          </div>

          {stats.recentLogs.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <strong>📝 最近记录:</strong>
              <div style={{ 
                maxHeight: '120px', 
                overflow: 'auto',
                background: '#1f1f1f',
                padding: '8px',
                borderRadius: '4px',
                marginTop: '4px'
              }}>
                {stats.recentLogs.map((log, index) => (
                  <div key={index} style={{ 
                    fontSize: '10px', 
                    marginBottom: '2px',
                    color: log.inputType === 'text' ? '#60a5fa' : '#fbbf24'
                  }}>
                    {new Date(log.timestamp).toLocaleTimeString()} - 
                    {log.action} ({log.inputType})
                    {log.isFirstInteraction && ' 🎯'}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={refreshStats}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              🔄 刷新
            </button>
            
            <button
              onClick={handleExport}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              📤 导出
            </button>
            
            <button
              onClick={handleClear}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              🗑️ 清除
            </button>
          </div>

          {stats.hasEnoughData && (
            <div style={{ 
              marginTop: '12px',
              padding: '8px',
              background: '#065f46',
              borderRadius: '4px',
              fontSize: '11px'
            }}>
              ✅ 数据充足，可进行可靠分析
            </div>
          )}
        </div>
      )}
    </div>
  );
};
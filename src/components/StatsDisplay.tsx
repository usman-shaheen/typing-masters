
import React from 'react';
import { TypingStats } from '@/utils/typingUtils';

interface StatsDisplayProps {
  stats: TypingStats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="stats-display glass-card p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center">
        <span className="bg-primary/10 text-primary p-1 rounded-md mr-2">📊</span>
        Current Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="stat-item animate-slide-up" style={{ animationDelay: '0ms' }}>
          <div className="text-xs md:text-sm font-medium text-gray-500">Speed</div>
          <div className="text-xl md:text-2xl font-bold flex items-end">
            {stats.wpm}
            <span className="text-xs md:text-sm text-gray-500 ml-1 mb-0.5">WPM</span>
          </div>
        </div>
        
        <div className="stat-item animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="text-xs md:text-sm font-medium text-gray-500">Accuracy</div>
          <div className="text-xl md:text-2xl font-bold flex items-end">
            {stats.accuracy}
            <span className="text-xs md:text-sm text-gray-500 ml-1 mb-0.5">%</span>
          </div>
        </div>
        
        <div className="stat-item animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="text-xs md:text-sm font-medium text-gray-500">Correct</div>
          <div className="text-xl md:text-2xl font-bold text-green-600">
            {stats.correctChars}
          </div>
        </div>
        
        <div className="stat-item animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="text-xs md:text-sm font-medium text-gray-500">Errors</div>
          <div className="text-xl md:text-2xl font-bold text-red-600">
            {stats.incorrectChars}
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-medium text-gray-500">Progress</span>
          <span className="text-xs md:text-sm font-medium">
            {stats.correctChars} / {stats.totalChars}
          </span>
        </div>
        <div className="w-full h-2 md:h-2.5 bg-gray-100 rounded-full mt-1.5 md:mt-2 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-primary rounded-full progress-bar"
            style={{ 
              width: stats.totalChars > 0 
                ? `${(stats.correctChars / stats.totalChars) * 100}%` 
                : '0%' 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;

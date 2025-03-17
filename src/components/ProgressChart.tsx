
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TypingStats } from '@/utils/typingUtils';

interface ProgressChartProps {
  data: TypingStats[];
}

interface ChartData {
  name: string;
  wpm: number;
  accuracy: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const formatChartData = (): ChartData[] => {
    return data.map((stat, index) => ({
      name: `Test ${index + 1}`,
      wpm: stat.wpm,
      accuracy: stat.accuracy
    }));
  };

  return (
    <div className="progress-chart-container glass-card p-6 h-64">
      <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={formatChartData()}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none'
            }} 
          />
          <Bar 
            dataKey="wpm" 
            name="WPM" 
            fill="#60a5fa" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;

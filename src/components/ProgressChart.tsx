
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
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
    <div className="progress-chart-container glass-card p-6 h-80">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="bg-primary/10 text-primary p-1 rounded-md mr-2">📈</span>
        Your Progress
      </h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={formatChartData()}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.97)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: 'none'
              }} 
            />
            <Legend />
            <Line 
              type="monotone"
              dataKey="wpm" 
              name="WPM" 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
              animationDuration={1500}
            />
            <Line 
              type="monotone"
              dataKey="accuracy" 
              name="Accuracy %" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#059669', r: 4 }}
              activeDot={{ r: 6, fill: '#047857' }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-4/5 text-gray-400">
          <div className="text-center">
            <p>Complete typing lessons to see your progress</p>
            <p className="text-sm mt-2">Your results will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;

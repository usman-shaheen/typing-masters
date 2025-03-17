
import React from 'react';
import { TypingLesson } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';

interface LessonSelectorProps {
  lessons: TypingLesson[];
  selectedLesson: TypingLesson;
  onSelectLesson: (lesson: TypingLesson) => void;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({ 
  lessons, 
  selectedLesson, 
  onSelectLesson 
}) => {
  const levelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="lesson-selector glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Lessons</h3>
      <div className="grid grid-cols-1 gap-3">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson)}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:shadow-md",
              selectedLesson.id === lesson.id 
                ? "bg-primary bg-opacity-10 border-2 border-primary" 
                : "bg-white border border-gray-200 hover:border-primary"
            )}
          >
            <div className="lesson-info text-left">
              <div className="font-medium">{lesson.title}</div>
              <div className="text-sm text-gray-500 mt-1">{lesson.description}</div>
            </div>
            <div className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              levelColor(lesson.level)
            )}>
              {lesson.level}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonSelector;

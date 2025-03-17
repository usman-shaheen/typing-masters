
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
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="lesson-selector glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="bg-primary/10 text-primary p-1 rounded-md mr-2">📚</span>
        Lessons
      </h3>
      <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-md group",
              selectedLesson.id === lesson.id 
                ? "bg-primary/5 border-2 border-primary shadow-sm" 
                : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-primary/50"
            )}
          >
            <div className="lesson-info text-left">
              <div className={cn(
                "font-medium transition-colors",
                selectedLesson.id === lesson.id ? "text-primary" : "group-hover:text-primary"
              )}>
                {lesson.title}
              </div>
              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{lesson.description}</div>
            </div>
            <div className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors",
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

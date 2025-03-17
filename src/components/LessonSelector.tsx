
import React, { useState } from 'react';
import { TypingLesson } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lesson.author && lesson.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lesson.type && lesson.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search lessons..."
          className="pl-9 bg-primary/5 border-primary/15 focus-visible:ring-primary/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
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
                {lesson.author && (
                  <div className="text-xs text-gray-400 mt-1">by {lesson.author}</div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors",
                  levelColor(lesson.level)
                )}>
                  {lesson.level}
                </div>
                {lesson.type && (
                  <div className="text-xs text-gray-500 italic">
                    {lesson.type}
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No lessons found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonSelector;

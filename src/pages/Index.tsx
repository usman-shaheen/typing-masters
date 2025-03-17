
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TypingArea from '@/components/TypingArea';
import Keyboard from '@/components/Keyboard';
import ProgressChart from '@/components/ProgressChart';
import LessonSelector from '@/components/LessonSelector';
import StatsDisplay from '@/components/StatsDisplay';
import { typingLessons, TypingStats } from '@/utils/typingUtils';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState(typingLessons[0]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [highlightKeys, setHighlightKeys] = useState<string[]>([]);
  const [currentStats, setCurrentStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    time: 0
  });
  const [progressHistory, setProgressHistory] = useState<TypingStats[]>([]);

  // When component mounts, try to load progress history from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('typingProgress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        if (Array.isArray(parsedProgress)) {
          setProgressHistory(parsedProgress);
        }
      } catch (e) {
        console.error('Error loading saved progress:', e);
      }
    }
  }, []);

  // Handle typing completion
  const handleTypingComplete = (stats: TypingStats) => {
    toast.success('Lesson completed!', {
      description: `You typed at ${stats.wpm} WPM with ${stats.accuracy}% accuracy.`,
    });
    
    // Add the completed lesson stats to history
    const newHistory = [...progressHistory, stats];
    setProgressHistory(newHistory);
    
    // Save to localStorage
    localStorage.setItem('typingProgress', JSON.stringify(newHistory));
    
    // Highlight 'home row' keys (asdf jkl;)
    setHighlightKeys(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
  };

  // Handle typing progress updates
  const handleTypingProgress = (stats: TypingStats) => {
    setCurrentStats(stats);
    setHighlightKeys([]);
  };

  // Handle active keys for keyboard display
  const handleActiveKeysChange = (keys: string[]) => {
    setActiveKeys(keys);
  };

  // Handle lesson selection
  const handleSelectLesson = (lesson: TypingStats) => {
    setSelectedLesson(lesson);
    setActiveKeys([]);
    setHighlightKeys([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TypingArea 
              text={selectedLesson.text}
              onComplete={handleTypingComplete}
              onProgress={handleTypingProgress}
              onActiveKeysChange={handleActiveKeysChange}
            />
            
            <Keyboard 
              activeKeys={activeKeys} 
              highlightKeys={highlightKeys} 
            />
          </div>
          
          <div className="flex flex-col gap-6">
            <StatsDisplay stats={currentStats} />
            <ProgressChart data={progressHistory} />
            <LessonSelector 
              lessons={typingLessons}
              selectedLesson={selectedLesson}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

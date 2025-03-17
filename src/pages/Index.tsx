
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TypingArea from '@/components/TypingArea';
import Keyboard from '@/components/Keyboard';
import ProgressChart from '@/components/ProgressChart';
import LessonSelector from '@/components/LessonSelector';
import StatsDisplay from '@/components/StatsDisplay';
import TextSettings from '@/components/TextSettings';
import { typingLessons, TypingStats, TypingLesson, TypingSettings, defaultTypingSettings } from '@/utils/typingUtils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Settings, ChevronUp, ChevronDown } from "lucide-react";

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState<TypingLesson>(typingLessons[0]);
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
  const [settings, setSettings] = useState<TypingSettings>(defaultTypingSettings);
  const [showSettings, setShowSettings] = useState(false);

  // When component mounts, try to load progress history and settings from localStorage
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
    
    const savedSettings = localStorage.getItem('typingSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({...defaultTypingSettings, ...parsedSettings});
      } catch (e) {
        console.error('Error loading saved settings:', e);
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
  const handleSelectLesson = (lesson: TypingLesson) => {
    setSelectedLesson(lesson);
    setActiveKeys([]);
    setHighlightKeys([]);
  };
  
  // Handle settings updates
  const handleUpdateSettings = (updatedSettings: Partial<TypingSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    localStorage.setItem('typingSettings', JSON.stringify(newSettings));
    
    // Show toast notification
    toast.success('Settings updated', {
      description: 'Your typing preferences have been saved.',
    });
  };

  // Set message based on time setting
  const getTestTimeMessage = () => {
    switch(settings.testTime) {
      case '1min': return 'You have 1 minute to complete this test';
      case '2min': return 'You have 2 minutes to complete this test';
      case '5min': return 'You have 5 minutes to complete this test';
      case 'unlimited': return 'Take as much time as you need';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <Header />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Typing Practice</h2>
          <Toggle 
            pressed={showSettings} 
            onPressedChange={setShowSettings}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20"
            aria-label="Toggle settings"
          >
            <Settings size={16} />
            <span>Settings</span>
            {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Toggle>
        </div>
        
        {showSettings && (
          <div className="mb-6 animate-fade-in">
            <TextSettings 
              settings={settings} 
              onUpdateSettings={handleUpdateSettings} 
              lesson={selectedLesson}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TypingArea 
              text={selectedLesson.text}
              onComplete={handleTypingComplete}
              onProgress={handleTypingProgress}
              onActiveKeysChange={handleActiveKeysChange}
              timeLimit={settings.testTime === 'unlimited' ? null : 
                settings.testTime === '1min' ? 60 : 
                settings.testTime === '2min' ? 120 : 300}
              colorMode={settings.textColorHighlighting}
              doubleSpacing={settings.doubleSpacingBetweenSentences}
            />
            
            <div className="text-center text-sm text-gray-500 italic">
              {getTestTimeMessage()}
            </div>
            
            <Keyboard 
              activeKeys={activeKeys} 
              highlightKeys={highlightKeys} 
              layout={settings.keyboardLayout}
            />
          </div>
          
          <div className="flex flex-col gap-8">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="mt-3">
                <StatsDisplay stats={currentStats} />
              </TabsContent>
              <TabsContent value="progress" className="mt-3">
                <ProgressChart data={progressHistory} />
              </TabsContent>
            </Tabs>
            
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

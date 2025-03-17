
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TypingArea from '@/components/TypingArea';
import Keyboard from '@/components/Keyboard';
import ProgressChart from '@/components/ProgressChart';
import StatsDisplay from '@/components/StatsDisplay';
import TextSettings from '@/components/TextSettings';
import { typingLessons, TypingStats, TypingSettings, defaultTypingSettings } from '@/utils/typingUtils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Settings, ChevronUp, ChevronDown, Keyboard as KeyboardIcon } from "lucide-react";

const Index = () => {
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
  const [showKeyboard, setShowKeyboard] = useState(true);

  // Current text for typing practice
  const [currentText, setCurrentText] = useState(typingLessons[0].text);

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
    toast.success('Exercise completed!', {
      description: `You typed at ${stats.wpm} WPM with ${stats.accuracy}% accuracy.`,
    });
    
    // Add the completed exercise stats to history
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-white">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <Header />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Typing Practice</h2>
          <div className="flex space-x-2">
            <Toggle 
              pressed={showKeyboard} 
              onPressedChange={setShowKeyboard}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20"
              aria-label="Toggle keyboard"
            >
              <KeyboardIcon size={16} />
              <span>Keyboard</span>
            </Toggle>
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
        </div>
        
        {showSettings && (
          <div className="mb-6 animate-fade-in">
            <TextSettings 
              settings={settings} 
              onUpdateSettings={handleUpdateSettings} 
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TypingArea 
              text={currentText}
              onComplete={handleTypingComplete}
              onProgress={handleTypingProgress}
              onActiveKeysChange={handleActiveKeysChange}
              timeLimit={settings.testTime === 'unlimited' ? null : 
                settings.testTime === '1min' ? 60 : 
                settings.testTime === '2min' ? 120 : 300}
              colorMode={settings.textColorHighlighting}
              doubleSpacing={settings.doubleSpacingBetweenSentences}
            />
            
            <div className="text-center text-sm text-gray-500 italic mb-4">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 font-mono">Space</kbd> to start/pause the timer
            </div>
            
            {showKeyboard && (
              <Keyboard 
                activeKeys={activeKeys} 
                highlightKeys={highlightKeys} 
                layout={settings.keyboardLayout}
              />
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

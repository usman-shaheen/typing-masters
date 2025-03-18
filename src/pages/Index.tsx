import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import TypingArea from '@/components/TypingArea';
import Keyboard from '@/components/Keyboard';
import ProgressChart from '@/components/ProgressChart';
import StatsDisplay from '@/components/StatsDisplay';
import TextSettings from '@/components/TextSettings';
import ResultsPopup from '@/components/ResultsPopup';
import { typingLessons, TypingStats, TypingSettings, defaultTypingSettings, longPracticeText, timeMapping } from '@/utils/typingUtils';
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
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  
  const initialSettings: TypingSettings = {
    ...defaultTypingSettings,
    testTime: '1min'
  };
  
  const [settings, setSettings] = useState<TypingSettings>(initialSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const [currentText, setCurrentText] = useState(longPracticeText);
  const [textInfo, setTextInfo] = useState({
    title: "Comprehensive Typing Practice",
    author: "Typing Test App",
    type: "Practice Text"
  });

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
        const validTestTime = timeMapping.hasOwnProperty(parsedSettings.testTime) 
          ? parsedSettings.testTime 
          : '1min';
        
        setSettings({
          ...initialSettings,
          ...parsedSettings,
          testTime: validTestTime as TypingSettings['testTime']
        });
      } catch (e) {
        console.error('Error loading saved settings:', e);
      }
    }
  }, []);

  const handleTypingComplete = (stats: TypingStats) => {
    const newHistory = [...progressHistory, stats];
    setProgressHistory(newHistory);
    setCurrentStats(stats);
    
    localStorage.setItem('typingProgress', JSON.stringify(newHistory));
    
    const homeRowMap = {
      'qwerty': ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
      'qwerty-uk': ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
      'dvorak': ['a', 'o', 'e', 'u', 'h', 't', 'n', 's'],
      'colemak': ['a', 'r', 's', 't', 'n', 'e', 'i', 'o'],
      'colemak-uk': ['a', 'r', 's', 't', 'n', 'e', 'i', 'o'],
      'azerty': ['q', 's', 'd', 'f', 'j', 'k', 'l', 'm'],
      'qwertz': ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ö'],
      'qwertz-sf': ['a', 's', 'd', 'f', 'j', 'k', 'l', 'é'],
      'numpad': ['4', '5', '6'],
    };
    
    setHighlightKeys(homeRowMap[settings.keyboardLayout] || ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
    
    setShowResultsPopup(true);
  };

  const handleTypingProgress = (stats: TypingStats) => {
    setCurrentStats(stats);
    setHighlightKeys([]);
  };

  const handleActiveKeysChange = (keys: string[]) => {
    setActiveKeys(keys);
  };
  
  const handleUpdateSettings = (updatedSettings: Partial<TypingSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
    localStorage.setItem('typingSettings', JSON.stringify(newSettings));
    
    if (updatedSettings.textType) {
      updateTextBasedOnSettings(newSettings);
    }
    
    if (updatedSettings.testTime && getTimeLimit() !== timeMapping[updatedSettings.testTime as TypingSettings['testTime']]) {
      setRemainingTime(timeMapping[updatedSettings.testTime as TypingSettings['testTime']] || 60);
    }
    
    toast.success('Settings updated', {
      description: 'Your typing preferences have been saved.',
    });
  };
  
  const updateTextBasedOnSettings = (newSettings: TypingSettings) => {
    const filteredLessons = typingLessons.filter(lesson => {
      if (newSettings.textType === 'all') return true;
      return lesson.type?.toLowerCase() === newSettings.textType;
    });
    
    if (filteredLessons.length > 0) {
      let selectedLesson;
      if (newSettings.textSelection === 'random') {
        const randomIndex = Math.floor(Math.random() * filteredLessons.length);
        selectedLesson = filteredLessons[randomIndex];
      } else if (newSettings.textSelection === 'sequential') {
        selectedLesson = filteredLessons[0];
      } else if (newSettings.textSelection === 'difficulty') {
        const beginnerLessons = filteredLessons.filter(l => l.level === 'beginner');
        selectedLesson = beginnerLessons.length > 0 ? beginnerLessons[0] : filteredLessons[0];
      }
      
      if (selectedLesson) {
        setCurrentText(selectedLesson.text);
        setTextInfo({
          title: selectedLesson.title,
          author: selectedLesson.author || "Typing Test App",
          type: selectedLesson.type || selectedLesson.level || "Practice Text"
        });
        
        toast.success('Text updated', {
          description: `Now practicing: ${selectedLesson.title}`,
        });
      }
    }
  };

  const handleCustomTextSubmit = (text: string) => {
    setCurrentText(text);
    setTextInfo({
      title: "Custom Text",
      author: "User",
      type: "Custom"
    });
    
    toast.success('Custom text saved', {
      description: 'Your custom text has been set for typing practice.',
    });
  };

  const getTimeLimit = () => {
    return timeMapping[settings.testTime] || 60;
  };

  const mapColorMode = (settingValue: string): "normal" | "enhanced" | "minimal" => {
    if (settingValue === "none") {
      return "minimal";
    }
    return settingValue as "normal" | "enhanced";
  };

  const handleCloseResultsPopup = () => {
    setShowResultsPopup(false);
  };
  
  const handleResetEverything = () => {
    setCurrentStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      time: 0
    });
    
    if (typingAreaRef.current) {
      typingAreaRef.current.resetTyping();
    }
  };
  
  const typingAreaRef = useRef<any>(null);
  
  const [remainingTime, setRemainingTime] = useState<number>(timeMapping[settings.testTime] || 60);
  
  useEffect(() => {
    setRemainingTime(timeMapping[settings.testTime] || 60);
  }, [settings.testTime]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-white font-sans">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <Header />
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-info">
            <h2 className="text-2xl font-bold text-primary">{textInfo.title}</h2>
            <div className="flex text-sm text-gray-500 gap-6">
              <span>Author: {textInfo.author}</span>
              <span>Type: {textInfo.type}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Toggle 
              pressed={showKeyboard} 
              onPressedChange={setShowKeyboard}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-base h-12"
              aria-label="Toggle keyboard"
            >
              <KeyboardIcon size={18} />
              <span>Keyboard</span>
            </Toggle>
            <Toggle 
              pressed={showSettings} 
              onPressedChange={setShowSettings}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-base h-12"
              aria-label="Toggle settings"
            >
              <Settings size={18} />
              <span>Settings</span>
              {showSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Toggle>
          </div>
        </div>
        
        {showSettings && (
          <div className="mb-6 animate-in fade-in duration-300">
            <TextSettings 
              settings={settings} 
              onUpdateSettings={handleUpdateSettings} 
              onCustomTextSubmit={handleCustomTextSubmit}
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
              timeLimit={remainingTime}
              colorMode={mapColorMode(settings.textColorHighlighting)}
              doubleSpacing={settings.doubleSpacingBetweenSentences}
              ref={typingAreaRef}
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
                <TabsTrigger value="stats" className="text-base py-2.5">Statistics</TabsTrigger>
                <TabsTrigger value="progress" className="text-base py-2.5">Progress</TabsTrigger>
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
      
      <ResultsPopup 
        isOpen={showResultsPopup}
        onClose={handleCloseResultsPopup}
        stats={currentStats}
        onReset={handleResetEverything}
      />
      
      <footer className="w-full py-4 mt-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} - Design by Usman Shaheen</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { calculateWPM, calculateAccuracy, TypingStatus, TypingStats } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';
import { Clock, Play, Pause, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface TypingAreaProps {
  text: string;
  onComplete: (stats: TypingStats) => void;
  onProgress: (stats: TypingStats) => void;
  onActiveKeysChange: (keys: string[]) => void;
  timeLimit: number | null;
  colorMode: 'normal' | 'enhanced' | 'minimal';
  doubleSpacing: boolean;
}

const TypingArea = forwardRef<{ resetTyping: () => void }, TypingAreaProps>(({ 
  text, 
  onComplete, 
  onProgress,
  onActiveKeysChange,
  timeLimit = 60, // Default to 1 minute
  colorMode,
  doubleSpacing
}, ref) => {
  const [typedText, setTypedText] = useState<string>('');
  const [status, setStatus] = useState<TypingStatus>('idle');
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(timeLimit || 60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    time: 0
  });
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
  const [currentParagraphText, setCurrentParagraphText] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const averageCharsPerLine = isMobile ? 40 : 60;
    const linesPerParagraph = isMobile ? 3 : 4;
    const charsPerParagraph = averageCharsPerLine * linesPerParagraph;
    
    const words = text.split(/\s+/);
    const splitParagraphs = [];
    let currentParagraph = '';
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if ((currentParagraph + ' ' + word).length <= charsPerParagraph) {
        currentParagraph += (currentParagraph ? ' ' : '') + word;
      } else {
        if (currentParagraph) {
          splitParagraphs.push(currentParagraph.trim());
        }
        currentParagraph = word;
      }
    }
    
    if (currentParagraph) {
      splitParagraphs.push(currentParagraph.trim());
    }
    
    setParagraphs(splitParagraphs);
    if (splitParagraphs.length > 0) {
      setCurrentParagraphText(splitParagraphs[0]);
    }
  }, [text, isMobile]);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (status === 'idle') {
          startTyping();
        } else if (status === 'running') {
          togglePause();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, isPaused]);

  useEffect(() => {
    if (status !== 'running' || isPaused) return;

    let correctCount = 0;
    let incorrectCount = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (i >= currentParagraphText.length) {
        incorrectCount++;
      } else if (typedText[i] === currentParagraphText[i]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    const totalChars = correctCount + incorrectCount;
    const newStats = {
      wpm: calculateWPM(totalChars, correctCount, elapsedTime),
      accuracy: calculateAccuracy(correctCount, totalChars),
      correctChars: correctCount,
      incorrectChars: incorrectCount,
      totalChars,
      time: elapsedTime
    };

    setStats(newStats);
    onProgress(newStats);

    const nextChar = currentParagraphText[typedText.length] || '';
    onActiveKeysChange(nextChar ? [nextChar.toLowerCase()] : []);
  }, [typedText, elapsedTime, status, currentParagraphText, onProgress, onActiveKeysChange, isPaused]);

  useEffect(() => {
    if (status === 'running' && !isPaused && typedText.length >= currentParagraphText.length) {
      if (currentParagraphIndex < paragraphs.length - 1) {
        setCurrentParagraphIndex(prevIndex => prevIndex + 1);
        setTypedText('');
      } else {
        completeTyping();
      }
    }
  }, [typedText, currentParagraphText, status, isPaused, currentParagraphIndex, paragraphs.length]);

  useEffect(() => {
    if (currentParagraphIndex < paragraphs.length) {
      setCurrentParagraphText(paragraphs[currentParagraphIndex]);
    }
  }, [currentParagraphIndex, paragraphs]);

  useEffect(() => {
    if (status === 'running' && !isPaused && timeLimit && remainingTime <= 0) {
      completeTyping();
    }
  }, [remainingTime, timeLimit, status, isPaused]);

  useEffect(() => {
    if (status === 'running' && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        if (timeLimit) {
          setRemainingTime(prev => Math.max(0, prev - 1));
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, isPaused, timeLimit]);

  useEffect(() => {
    if (timeLimit && status === 'idle') {
      setRemainingTime(timeLimit);
    }
  }, [timeLimit, status]);

  useImperativeHandle(ref, () => ({
    resetTyping: () => resetTyping()
  }));

  const startTyping = () => {
    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
      setTypedText('');
      setElapsedTime(0);
      setRemainingTime(timeLimit || 60);
      setIsPaused(false);
      inputRef.current?.focus();
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    inputRef.current?.focus();
  };

  const completeTyping = () => {
    setStatus('finished');
    if (timerRef.current) clearInterval(timerRef.current);
    onComplete(stats);
  };

  const resetTyping = () => {
    setStatus('idle');
    setTypedText('');
    setElapsedTime(0);
    setRemainingTime(timeLimit || 60);
    setIsPaused(false);
    setCurrentParagraphIndex(0);
    if (timerRef.current) clearInterval(timerRef.current);
    
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      time: 0
    });
    
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'idle') {
      startTyping();
    }
    
    if (status === 'running' && !isPaused) {
      setTypedText(e.target.value);
    }
  };

  const renderText = () => {
    const displayText = doubleSpacing 
      ? currentParagraphText.replace(/\.\s+/g, '.  ') 
      : currentParagraphText;
    
    return displayText.split('').map((char, index) => {
      let className = '';
      
      if (index < typedText.length) {
        if (typedText[index] === char) {
          className = `correct ${colorMode === 'enhanced' ? 'enhanced' : ''}`;
        } else {
          className = `incorrect ${colorMode === 'enhanced' ? 'enhanced' : ''}`;
        }
      } else if (index === typedText.length) {
        className = `current ${colorMode === 'enhanced' ? 'pulse' : ''}`;
      } else if (colorMode === 'minimal') {
        className = 'minimal';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-container w-full max-w-4xl mx-auto">
      <div className="glass-card p-3 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2 xs:gap-0">
          <div className="timer-display flex items-center gap-2 text-base md:text-xl font-mono bg-primary/10 px-2 py-1 md:px-4 md:py-2 rounded-md">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="font-bold">
              {timeLimit ? formatTime(remainingTime) : formatTime(elapsedTime)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={status === 'running' ? togglePause : startTyping} 
              className="flex items-center gap-1 md:gap-2 bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base"
              disabled={status === 'finished'}
            >
              {status === 'idle' ? (
                <><Play className="h-3.5 w-3.5 md:h-4 md:w-4" /> Start</>
              ) : isPaused ? (
                <><Play className="h-3.5 w-3.5 md:h-4 md:w-4" /> Resume</>
              ) : (
                <><Pause className="h-3.5 w-3.5 md:h-4 md:w-4" /> Pause</>
              )}
            </button>
          </div>
        </div>
        
        <div className="mb-2 flex justify-between text-xs md:text-sm text-gray-500">
          <span>Paragraph {currentParagraphIndex + 1} of {paragraphs.length}</span>
          <span>{paragraphs.length - currentParagraphIndex - 1} paragraphs remaining</span>
        </div>
        
        <div 
          className={cn("text-display limited-height mb-3 md:mb-4", colorMode, isPaused && "opacity-60")}
        >
          {renderText()}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className={cn(
            "typing-input", 
            isPaused && "opacity-60 cursor-not-allowed",
            "text-sm md:text-base"
          )}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={isPaused}
          placeholder={status === 'idle' ? "Press spacebar to start typing..." : isPaused ? "Paused - press spacebar to resume" : ""}
        />
        
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mt-4 md:mt-6 gap-3 xs:gap-0">
          <div className="stats grid grid-cols-3 gap-3 md:gap-6 w-full xs:w-auto">
            <div className="stat">
              <div className="text-xs md:text-sm font-medium text-gray-500">WPM</div>
              <div className="text-lg md:text-2xl font-bold">{stats.wpm}</div>
            </div>
            <div className="stat">
              <div className="text-xs md:text-sm font-medium text-gray-500">Accuracy</div>
              <div className="text-lg md:text-2xl font-bold">{stats.accuracy}%</div>
            </div>
            <div className="stat">
              <div className="text-xs md:text-sm font-medium text-gray-500">Time</div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLimit ? formatTime(remainingTime) : formatTime(elapsedTime)}
              </div>
            </div>
          </div>
          
          <div className="controls">
            <button
              onClick={resetTyping}
              className={cn(
                "px-3 py-1.5 md:px-4 md:py-2 rounded-md text-white transition-all duration-300 text-sm md:text-base transform hover:scale-105",
                (status === 'finished' || isPaused) ? "bg-primary" : "bg-gray-400"
              )}
              disabled={status === 'idle'}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

TypingArea.displayName = 'TypingArea';

export default TypingArea;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


import React, { useState, useEffect, useRef } from 'react';
import { calculateWPM, calculateAccuracy, TypingStatus, TypingStats } from '@/utils/typingUtils';
import { cn } from '@/lib/utils';

interface TypingAreaProps {
  text: string;
  onComplete: (stats: TypingStats) => void;
  onProgress: (stats: TypingStats) => void;
  onActiveKeysChange: (keys: string[]) => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ 
  text, 
  onComplete, 
  onProgress,
  onActiveKeysChange
}) => {
  const [typedText, setTypedText] = useState<string>('');
  const [status, setStatus] = useState<TypingStatus>('idle');
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    time: 0
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle typing stats calculation
  useEffect(() => {
    if (status !== 'running') return;

    let correctCount = 0;
    let incorrectCount = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (i >= text.length) {
        incorrectCount++;
      } else if (typedText[i] === text[i]) {
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

    // Update active keys for the virtual keyboard
    const nextChar = text[typedText.length] || '';
    onActiveKeysChange(nextChar ? [nextChar.toLowerCase()] : []);

  }, [typedText, elapsedTime, status, text, onProgress, onActiveKeysChange]);

  // Check if typing is complete
  useEffect(() => {
    if (status === 'running' && typedText.length >= text.length) {
      completeTyping();
    }
  }, [typedText, text, status]);

  const startTyping = () => {
    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
      setTypedText('');
      
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
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
    if (timerRef.current) clearInterval(timerRef.current);
    
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      time: 0
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'idle') {
      startTyping();
    }
    
    if (status === 'running') {
      setTypedText(e.target.value);
    }
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      
      if (index < typedText.length) {
        className = typedText[index] === char ? 'correct' : 'incorrect';
      } else if (index === typedText.length) {
        className = 'current';
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
      <div className="glass-card p-6 mb-6">
        <div className="text-display mb-4">
          {renderText()}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          className="typing-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        <div className="flex justify-between items-center mt-6">
          <div className="stats flex gap-6">
            <div className="stat">
              <div className="text-sm font-medium text-gray-500">WPM</div>
              <div className="text-2xl font-bold">{stats.wpm}</div>
            </div>
            <div className="stat">
              <div className="text-sm font-medium text-gray-500">Accuracy</div>
              <div className="text-2xl font-bold">{stats.accuracy}%</div>
            </div>
            <div className="stat">
              <div className="text-sm font-medium text-gray-500">Time</div>
              <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
            </div>
          </div>
          
          <div className="controls">
            <button
              onClick={resetTyping}
              className={cn(
                "px-4 py-2 rounded-md text-white transition-all duration-300 transform hover:scale-105",
                status === 'finished' ? "bg-primary" : "bg-gray-400"
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
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default TypingArea;

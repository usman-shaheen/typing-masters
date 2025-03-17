
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  activeKeys: string[];
  highlightKeys: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ activeKeys, highlightKeys }) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // Keyboard layout configuration
  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
  ];

  const keyWidths: Record<string, string> = {
    'Backspace': 'w-16',
    'Tab': 'w-14',
    '\\': 'w-12',
    'Caps': 'w-16',
    'Enter': 'w-16',
    'Shift': 'w-20',
    'Ctrl': 'w-12',
    'Win': 'w-10',
    'Alt': 'w-10',
    'Space': 'w-64',
    'Menu': 'w-10',
  };

  // Simulate key press visual effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => [...prev, key]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => prev.filter(k => k !== key));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="keyboard-container w-full max-w-4xl mx-auto mt-8">
      <div className="keyboard border border-typing-keyboard-border rounded-xl p-6 bg-typing-keyboard-bg shadow-lg transition-transform duration-300">
        {keyboardLayout.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className="flex justify-center gap-1.5 mb-1.5"
          >
            {row.map((key) => {
              const keyLower = key.toLowerCase();
              const isActive = activeKeys.includes(keyLower);
              const isHighlight = highlightKeys.includes(keyLower);
              const isPressed = pressedKeys.includes(keyLower);
              
              return (
                <div
                  key={`key-${key}`}
                  className={cn(
                    'key h-12 font-medium',
                    keyWidths[key] || 'w-10',
                    isActive && 'active',
                    isHighlight && 'highlight',
                    isPressed && 'pressed',
                    isActive || isHighlight || isPressed ? 'animate-key-press' : '',
                    rowIndex === 2 && ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].includes(keyLower) 
                      ? 'border-b-2 border-b-primary/30' : ''
                  )}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;

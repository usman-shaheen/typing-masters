
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  activeKeys: string[];
  highlightKeys: string[];
  layout: 'qwerty' | 'dvorak' | 'colemak';
}

const Keyboard: React.FC<KeyboardProps> = ({ activeKeys, highlightKeys, layout = 'qwerty' }) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // Keyboard layout configurations
  const keyboardLayouts = {
    qwerty: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    dvorak: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '[', ']', 'Backspace'],
      ['Tab', '\'', ',', '.', 'p', 'y', 'f', 'g', 'c', 'r', 'l', '/', '=', '\\'],
      ['Caps', 'a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', '-', 'Enter'],
      ['Shift', ';', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    colemak: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'f', 'p', 'g', 'j', 'l', 'u', 'y', ';', '[', ']', '\\'],
      ['Caps', 'a', 'r', 's', 't', 'd', 'h', 'n', 'e', 'i', 'o', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'k', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ]
  };

  // Use the selected layout
  const keyboardLayout = keyboardLayouts[layout];

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

  // Get home row keys based on layout
  const getHomeRowKeys = () => {
    switch(layout) {
      case 'qwerty': return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
      case 'dvorak': return ['a', 'o', 'e', 'u', 'h', 't', 'n', 's'];
      case 'colemak': return ['a', 'r', 's', 't', 'n', 'e', 'i', 'o'];
      default: return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    }
  };

  const homeRowKeys = getHomeRowKeys();

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
              const isHomeRow = homeRowKeys.includes(keyLower);
              
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
                    isHomeRow ? 'border-b-2 border-b-primary/30' : ''
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

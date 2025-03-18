
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  activeKeys: string[];
  highlightKeys: string[];
  layout: 'qwerty' | 'qwerty-uk' | 'dvorak' | 'colemak' | 'colemak-uk' | 'azerty' | 'qwertz' | 'qwertz-sf' | 'numpad';
}

const Keyboard: React.FC<KeyboardProps> = ({ activeKeys, highlightKeys, layout = 'qwerty' }) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // Keyboard layout configurations
  const keyboardLayouts = {
    'qwerty': [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'qwerty-uk': [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Enter'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '#'],
      ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'dvorak': [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '[', ']', 'Backspace'],
      ['Tab', '\'', ',', '.', 'p', 'y', 'f', 'g', 'c', 'r', 'l', '/', '=', '\\'],
      ['Caps', 'a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', '-', 'Enter'],
      ['Shift', ';', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'colemak': [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'f', 'p', 'g', 'j', 'l', 'u', 'y', ';', '[', ']', '\\'],
      ['Caps', 'a', 'r', 's', 't', 'd', 'h', 'n', 'e', 'i', 'o', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'k', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'colemak-uk': [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'f', 'p', 'g', 'j', 'l', 'u', 'y', ';', '[', ']', 'Enter'],
      ['Caps', 'a', 'r', 's', 't', 'd', 'h', 'n', 'e', 'i', 'o', '\'', '#'],
      ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'k', 'm', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'azerty': [
      ['²', '&', 'é', '"', '\'', '(', '-', 'è', '_', 'ç', 'à', ')', '=', 'Backspace'],
      ['Tab', 'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^', '$', 'Enter'],
      ['Caps', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù', '*'],
      ['Shift', '<', 'w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'qwertz': [
      ['^', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ß', '´', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '+', 'Enter'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', '#'],
      ['Shift', '<', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'qwertz-sf': [
      ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', '^', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'è', '¨', 'Enter'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'à', '$'],
      ['Shift', '<', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
    ],
    'numpad': [
      ['Num', '/', '*', '-'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '+'],
      ['1', '2', '3', 'Enter'],
      ['0', '0', '.', 'Enter']
    ]
  };

  // Use the selected layout
  const keyboardLayout = keyboardLayouts[layout] || keyboardLayouts['qwerty'];

  const keyWidths: Record<string, string> = {
    'Backspace': 'w-16',
    'Tab': 'w-14',
    '\\': 'w-12',
    'Caps': 'w-16',
    'Enter': layout === 'numpad' ? 'w-12 h-24' : 'w-16',
    'Shift': 'w-20',
    'Ctrl': 'w-12',
    'Win': 'w-10',
    'Alt': 'w-10',
    'Space': 'w-64',
    'Menu': 'w-10',
    '+': layout === 'numpad' ? 'w-12 h-24' : 'w-10',
    '0': layout === 'numpad' ? 'w-24' : 'w-10',
    'Num': 'w-12',
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
      case 'qwerty':
      case 'qwerty-uk':
        return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
      case 'dvorak':
        return ['a', 'o', 'e', 'u', 'h', 't', 'n', 's'];
      case 'colemak':
      case 'colemak-uk':
        return ['a', 'r', 's', 't', 'n', 'e', 'i', 'o'];
      case 'azerty':
        return ['q', 's', 'd', 'f', 'j', 'k', 'l', 'm'];
      case 'qwertz':
      case 'qwertz-sf':
        return ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ö'];
      case 'numpad':
        return ['4', '5', '6'];
      default:
        return ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    }
  };

  const homeRowKeys = getHomeRowKeys();

  return (
    <div className="keyboard-container w-full max-w-4xl mx-auto mt-4 mb-6">
      <div className={cn(
        "keyboard border border-typing-keyboard-border rounded-xl p-6 bg-typing-keyboard-bg shadow-lg transition-transform duration-300",
        layout === 'numpad' ? 'max-w-xs mx-auto' : ''
      )}>
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
                    'key h-12 flex items-center justify-center rounded-md font-medium border border-gray-300 shadow-sm transition-all duration-100',
                    keyWidths[key] || 'w-10',
                    isActive && 'bg-green-100 border-green-400 text-green-800',
                    isHighlight && 'bg-blue-100 border-blue-400 text-blue-800',
                    isPressed && 'bg-amber-100 border-amber-400 text-amber-800 shadow-inner transform scale-95',
                    !isActive && !isHighlight && !isPressed && 'bg-white text-gray-700 hover:bg-gray-50',
                    isActive || isHighlight || isPressed ? 'animate-key-press' : '',
                    isHomeRow ? 'border-b-2 border-b-primary/60' : ''
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


export type TypingStatus = 'idle' | 'running' | 'finished';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  time: number;
}

export interface TypingLesson {
  id: string;
  title: string;
  description: string;
  text: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  type?: string;
}

export interface TypingSettings {
  textSelection: 'random' | 'sequential' | 'difficulty';
  textType: 'all' | 'lyrics' | 'quotes' | 'code' | 'prose';
  testTime: '1min' | '2min' | '5min' | 'unlimited';
  textColorHighlighting: 'normal' | 'enhanced' | 'minimal';
  testResetHotkey: 'all' | 'escape' | 'ctrl+r';
  phaseShiftCorrection: boolean;
  doubleSpacingBetweenSentences: boolean;
  keyboardLayout: 'qwerty' | 'dvorak' | 'colemak';
}

export const defaultTypingSettings: TypingSettings = {
  textSelection: 'random',
  textType: 'all',
  testTime: '1min',
  textColorHighlighting: 'normal',
  testResetHotkey: 'all',
  phaseShiftCorrection: false,
  doubleSpacingBetweenSentences: false,
  keyboardLayout: 'qwerty'
};

export const calculateWPM = (
  totalTypedChars: number,
  correctChars: number,
  elapsedTimeInSeconds: number
): number => {
  // The standard formula: (characters typed / 5) / (time in minutes)
  // We use net WPM which accounts for errors: (all typed characters - errors) / 5 / time(min)
  const minutes = elapsedTimeInSeconds / 60;
  if (minutes === 0) return 0;
  
  // Using the standard word length of 5 characters
  return Math.round((correctChars / 5) / minutes);
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const typingLessons: TypingLesson[] = [
  {
    id: 'creep',
    title: 'Creep',
    description: 'Popular song by Radiohead',
    text: 'When you were here before, couldn\'t look you in the eye. You\'re just like an angel, your skin makes me cry. You float like a feather in a beautiful world. I wish I was special, you\'re so very special.',
    level: 'intermediate',
    author: 'Radiohead',
    type: 'Lyrics'
  },
  {
    id: 'home-row',
    title: 'Home Row Keys',
    description: 'Master the home row keys (ASDF JKL;)',
    text: 'asdf jkl; asdf jkl; asdf jkl; asdf j;lk fdsa j;lk fdsa asdf jkl; fdsa j;lk',
    level: 'beginner'
  },
  {
    id: 'common-words',
    title: 'Common Words',
    description: 'Practice typing the most common English words',
    text: 'the quick brown fox jumps over the lazy dog. a fast black cat runs past the white house. she sells sea shells by the sea shore.',
    level: 'beginner'
  },
  {
    id: 'pangrams',
    title: 'Pangrams',
    description: 'Sentences that use every letter of the alphabet',
    text: 'The five boxing wizards jump quickly. How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs.',
    level: 'intermediate'
  },
  {
    id: 'code-syntax',
    title: 'Code Syntax',
    description: 'Practice typing programming symbols and syntax',
    text: 'function calculateSum(a, b) { return a + b; } const result = calculateSum(5, 10); console.log(`The sum is: ${result}`);',
    level: 'advanced',
    type: 'Code'
  },
  {
    id: 'numbers-symbols',
    title: 'Numbers & Symbols',
    description: 'Master the number row and common symbols',
    text: '1234567890 !@#$%^&*() 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) 1234 !@#$ 5678 %^&* 90 ()',
    level: 'intermediate'
  }
];

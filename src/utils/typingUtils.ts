
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
}

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
    level: 'advanced'
  },
  {
    id: 'numbers-symbols',
    title: 'Numbers & Symbols',
    description: 'Master the number row and common symbols',
    text: '1234567890 !@#$%^&*() 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) 1234 !@#$ 5678 %^&* 90 ()',
    level: 'intermediate'
  }
];

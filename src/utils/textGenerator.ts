import { type Difficulty, VOCABULARY, PASSAGES } from './textPools'

/**
 * Generates a random sequence of words for Timed Mode.
 * This feels much more like "MonkeyType" or Apple's training tools.
 */
export function generateTimedText(difficulty: Difficulty, wordCount: number = 25): string {
  const words = VOCABULARY[difficulty];
  const result: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result.push(words[randomIndex]);
  }

  return result.join(' ');
}

/**
 * Picks a curated long-form passage for Passage Mode.
 */
export function generatePassageText(difficulty: Difficulty): string {
  const pool = PASSAGES[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * The Master Function used by App.tsx
 */
export function getAppText(mode: 'timed' | 'passage', difficulty: Difficulty): string {
  if (mode === 'passage') {
    return generatePassageText(difficulty);
  }
  return generateTimedText(difficulty);
}
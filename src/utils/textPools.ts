export type Difficulty = 'easy' | 'medium' | 'hard'

export const textPools: Record<Difficulty, string[]> = {
  easy: [
    'cat dog sun sky tree book',
    'red blue green yellow',
    'hello world typing test',
  ],
  medium: [
    'the quick brown fox jumps over the lazy dog',
    'typing speed is a useful skill to practice',
    'react and vite make development fast',
  ],
  hard: [
    'complexity arises when abstraction leaks unexpectedly',
    'synchronous code often appears simpler than asynchronous flows',
    'performance optimization requires careful measurement',
  ],
}

export type Mode = 'timed' | 'passage';
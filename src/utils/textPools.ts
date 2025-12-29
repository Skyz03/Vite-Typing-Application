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

export type Mode = 'timed' | 'passage'

export const PASSAGES = {
  easy: [
    'The sun began to set behind the distant mountains, casting a warm golden glow across the quiet valley below.',
    'Programming is the art of telling another human what one wants the computer to do for them.',
  ],
  medium: [
    'The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks and social structures.',
    'In the world of software engineering, the ability to read and understand existing code is often more valuable than the ability to write new code.',
  ],
  hard: [
    'Implementation of a red-black tree requires a sophisticated understanding of self-balancing binary search trees and rotation algorithms.',
    'The phenomenon of quantum entanglement suggests that particles can remain connected such that the state of one instantaneously influences the other.',
  ],
}

export function getLongPassage(difficulty: 'easy' | 'medium' | 'hard') {
  const pool = PASSAGES[difficulty]
  return pool[Math.floor(Math.random() * pool.length)]
}

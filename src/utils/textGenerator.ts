import { type Difficulty, textPools } from './textPools'

export function getRandomText(difficulty: Difficulty): string {
  const pool = textPools[difficulty]
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

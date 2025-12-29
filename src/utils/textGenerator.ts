import { type Difficulty, textPools } from './textPools'
import { PASSAGES } from './textPools'

export function getRandomText(difficulty: Difficulty): string {
  const pool = textPools[difficulty]
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

export const getLongPassage = (diff: Difficulty) => {
  const pool = PASSAGES[diff]
  return pool[Math.floor(Math.random() * pool.length)]
}

import { useState } from 'react'
import { calculateAccuracy, calculateWPM } from '../utils/typingMetrics'

export function useTyping(targetText: string, isLocked: boolean) {
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)

  function handleType(value: string) {
    if (isLocked) return

    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }
    setTyped(value)
  }

  const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0

  return {
    typed,
    handleType,
    cursor: typed.length,
    accuracy: calculateAccuracy(typed, targetText),
    wpm: calculateWPM(typed.length, elapsedSeconds),
  }
}

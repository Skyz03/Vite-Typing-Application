import { useCallback, useEffect, useState } from 'react'
import { calculateAccuracy, calculateWPM } from '../utils/typingMetrics'

type Options = {
  isLocked: boolean
}

export function useKeyboardTyping(targetText: string, { isLocked }: Options) {
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  // Track every single wrong keypress
  const [totalErrors, setTotalErrors] = useState(0)

  const reset = useCallback(() => {
    setTyped('')
    setStartTime(null)
    setIsFinished(false)
    setTotalErrors(0)
  }, [])

  useEffect(() => reset(), [targetText, reset])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isLocked || isFinished || e.ctrlKey || e.metaKey) return
      if (e.key.length > 1 && e.key !== 'Backspace') return

      setStartTime((t) => t ?? Date.now())

      if (e.key === 'Backspace') {
        setTyped((prev) => prev.slice(0, -1))
        return
      }

      setTyped((prev) => {
        if (prev.length >= targetText.length) return prev

        // --- LOGIC FOR CHARACTER STAT ---
        // If the key pressed doesn't match the target char, increment errors
        if (e.key !== targetText[prev.length]) {
          setTotalErrors(prev => prev + 1)
        }

        const next = prev + e.key
        if (next.length === targetText.length) setIsFinished(true)
        return next
      })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLocked, isFinished, targetText])

  const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0

  return {
    typed,
    isFinished,
    reset,
    totalErrors, // Export this
    totalTyped: typed.length, // Export this
    accuracy: calculateAccuracy(typed, targetText),
    wpm: calculateWPM(typed.length, elapsed),
  }
}
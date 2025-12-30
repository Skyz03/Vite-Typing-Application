// hooks/useTimer.ts
import { useState, useEffect, useCallback, useRef } from 'react'

export function useTimer(initialTime: number, mode: 'timed' | 'passage') {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Sync time if initialTime changes (e.g., when switching modes)
  useEffect(() => {
    setTime(initialTime)
  }, [initialTime])

  const start = useCallback(() => setIsRunning(true), [])
  const stop = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(initialTime)
  }, [initialTime])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (mode === 'timed') {
            // COUNT DOWN: Stop at 0
            if (prev <= 1) {
              setIsRunning(false)
              return 0
            }
            return prev - 1
          } else {
            // COUNT UP: Keep going until text is finished
            return prev + 1
          }
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, mode])

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    // In Timed mode, it's finished when time hits 0
    // In Passage mode, it's finished when the typing hook says so
    isFinished: mode === 'timed' && time === 0,
  }
}

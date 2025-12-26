import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer(duration: number) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const start = useCallback(() => {
    if (isRunning) return
    setIsRunning(true)
  }, [isRunning])

  const reset = useCallback(() => {
    clear()
    setIsRunning(false)
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clear()
          setIsRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return clear
  }, [isRunning])

  return {
    timeLeft,
    isRunning,
    start,
    reset,
    isFinished: timeLeft === 0,
  }
}

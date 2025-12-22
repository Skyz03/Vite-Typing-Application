import { useEffect, useRef, useState } from 'react'

export function useTimer(duration: number) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  function start() {
    if (isRunning) return
    setIsRunning(true)
  }

  function reset() {
    setIsRunning(false)
    setTimeLeft(duration)
  }

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  return {
    timeLeft,
    isRunning,
    start,
    reset,
    isFinished: timeLeft === 0,
  }
}

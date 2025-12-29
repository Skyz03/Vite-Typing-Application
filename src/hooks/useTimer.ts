import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer(duration: number) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Helper to clear interval
  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning || (duration > 0 && timeLeft <= 0)) return;
    setIsRunning(true);
  }, [isRunning, timeLeft, duration]);

  const stop = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setIsRunning(false);
    setTimeLeft(duration);
  }, [clear, duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          // If duration is 0 (Passage Mode), we count down into negatives 
          // or handle logic to count up. Standard approach:
          if (duration > 0 && t <= 1) {
            clear();
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clear();
    }
    return clear;
  }, [isRunning, clear, duration]);

  return {
    timeLeft,
    // ✅ Calculate timeElapsed: Total duration minus what is left
    timeElapsed: duration - timeLeft, 
    isRunning,
    start,
    stop,
    reset,
    isFinished: duration > 0 && timeLeft === 0,
  };
}
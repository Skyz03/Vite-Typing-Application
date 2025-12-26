import { useCallback, useEffect, useState } from 'react'
import { calculateAccuracy, calculateWPM } from '../utils/typingMetrics'

type Options = {
    isLocked: boolean
}

export function useKeyboardTyping(targetText: string, { isLocked }: Options) {
    const [typed, setTyped] = useState('')
    const [startTime, setStartTime] = useState<number | null>(null)
    const [isFinished, setIsFinished] = useState(false)

    const reset = useCallback(() => {
        setTyped('')
        setStartTime(null)
        setIsFinished(false)
    }, [])

    useEffect(() => reset(), [targetText, reset])

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (isLocked || isFinished) return

            if (e.key.length > 1 && e.key !== 'Backspace') return

            setStartTime((t) => t ?? Date.now())

            setTyped((prev) => {
                if (e.key === 'Backspace') {
                    return prev.slice(0, -1)
                }

                if (prev.length >= targetText.length) return prev

                const next = prev + e.key
                if (next.length === targetText.length) {
                    setIsFinished(true)
                }
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
        accuracy: calculateAccuracy(typed, targetText),
        wpm: calculateWPM(typed.length, elapsed),
    }
}

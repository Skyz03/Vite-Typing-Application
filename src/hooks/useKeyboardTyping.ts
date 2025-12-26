import { useEffect, useState } from 'react'
import { calculateAccuracy, calculateWPM } from '../utils/typingMetrics'

type Options = {
    isLocked: boolean
}

export function useKeyboardTyping(targetText: string, options: Options) {
    const { isLocked } = options

    const [typed, setTyped] = useState('')
    const [startTime, setStartTime] = useState<number | null>(null)

    // 🔹 RESET when text changes
    useEffect(() => {
        setTyped('')
        setStartTime(null)
    }, [targetText])

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (isLocked) return

            // Ignore modifier keys (Shift, Ctrl, Alt, etc.)
            if (e.key.length > 1 && e.key !== 'Backspace') return

            if (!startTime) {
                setStartTime(Date.now())
            }

            if (e.key === 'Backspace') {
                setTyped((prev) => prev.slice(0, -1))
                return
            }

            if (typed.length >= targetText.length) return

            setTyped((prev) => prev + e.key)
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [typed, targetText, startTime, isLocked])

    const elapsedSeconds = startTime
        ? (Date.now() - startTime) / 1000
        : 0

    return {
        typed,
        cursor: typed.length,
        accuracy: calculateAccuracy(typed, targetText),
        wpm: calculateWPM(typed.length, elapsedSeconds),
    }
}

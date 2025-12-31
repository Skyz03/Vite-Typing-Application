// import { renderHook, act } from '@testing-library/react'
// import { describe, it, expect, vi } from 'vitest'
// import { useTimer } from './useTimer'

// describe('useTimer', () => {
//   it('counts down and stops at zero', () => {
//     vi.useFakeTimers()

//     const { result } = renderHook(() => useTimer(2, 'easy'))

//     act(() => result.current.start())
//     act(() => vi.advanceTimersByTime(2000))

//     expect(result.current.timeLeft).toBe(0)
//     expect(result.current.isFinished).toBe(true)

//     vi.useRealTimers()
//   })

//   it('resets correctly', () => {
//     const { result } = renderHook(() => useTimer(10))

//     act(() => result.current.start())
//     act(() => result.current.reset())

//     expect(result.current.timeLeft).toBe(10)
//   })
// })

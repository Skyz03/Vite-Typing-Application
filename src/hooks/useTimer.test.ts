import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useTimer } from './useTimer'

describe('useTimer', () => {
  it('counts down correctly', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useTimer(3))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.timeLeft).toBe(2)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isFinished).toBe(true)

    vi.useRealTimers()
  })
})

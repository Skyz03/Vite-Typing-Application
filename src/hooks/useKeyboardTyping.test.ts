import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useKeyboardTyping } from './useKeyboardTyping'

describe('useKeyboardTyping', () => {
  it('records typed characters', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() =>
      useKeyboardTyping('abc', { isLocked: false })
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    })

    expect(result.current.typed).toBe('ab')

    vi.useRealTimers()
  })

  it('handles backspace', () => {
    const { result } = renderHook(() =>
      useKeyboardTyping('abc', { isLocked: false })
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }))
    })

    expect(result.current.typed).toBe('')
  })
})

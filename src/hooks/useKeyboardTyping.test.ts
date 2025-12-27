import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useKeyboardTyping } from './useKeyboardTyping'

describe('useKeyboardTyping', () => {
  it('types and stops at end', () => {
    const { result } = renderHook(() =>
      useKeyboardTyping('ab', { isLocked: false })
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    })

    expect(result.current.typed).toBe('ab')
    expect(result.current.isFinished).toBe(true)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { getRandomText } from './textGenerator'
import { textPools } from './textPools'

describe('getRandomText', () => {
  it('returns a string from the selected difficulty pool', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const text = getRandomText('easy')
    expect(text).toBe(textPools.easy[0])

    vi.restoreAllMocks()
  })
})

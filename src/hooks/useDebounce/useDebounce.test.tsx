import { renderHook, act } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  it('debounces values', async () => {
    let value = 'Hello'

    const { result, rerender } = renderHook(() => useDebounce(value, 500))

    expect(result.current).toBe('Hello')

    act(() => {
      value = 'World'
      rerender(() => useDebounce(value, 500))
    })

    expect(result.current).toBe('Hello')

    act(() => jest.advanceTimersByTime(500))

    expect(result.current).toBe('World')
  })
})

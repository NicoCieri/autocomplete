import { renderHook, waitFor } from '@testing-library/react'
import useSuggestions from './useSuggestions'

describe('useSuggestions', () => {
  const mockResponse = {
    items: [
      {
        full_name: 'Facebook/React',
        description: 'React repository',
        id: 1,
        html_url: 'item.html_url',
        owner: {
          avatar_url: 'item.owner.avatar_url',
          login: 'item.owner.login',
        },
      },
    ],
  }

  let fetchMock: jest.Mock = jest.fn()
  let originalFetch: typeof global.fetch

  beforeEach(() => {
    originalFetch = global.fetch
    fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    }) as jest.Mock

    global.fetch = fetchMock as never
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('returns empty suggestions when query is empty', async () => {
    const { result } = renderHook(() => useSuggestions('', 5))

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(false)

    await waitFor(() => expect(result.current.suggestions).toEqual([]))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('fetches and parses suggestions correctly', async () => {
    const { result } = renderHook(() => useSuggestions('React', 5))

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.suggestions).toEqual(mockResponse.items))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('handles fetch error correctly', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Fetch error'))

    const { result } = renderHook(() => useSuggestions('React', 5))

    expect(result.current.suggestions).toEqual([])
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.suggestions).toEqual([]))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete'
import useSuggestions from '@/hooks/useSuggestions'
import useDebounce from '@/hooks/useDebounce'

jest.mock('@/hooks/useSuggestions')
jest.mock('@/hooks/useDebounce')

describe('Autocomplete', () => {
  const mockSuggestions = [
    {
      full_name: 'item.full_name',
      description: 'item.description',
      id: 1,
      html_url: 'item.html_url',
      owner: {
        avatar_url: 'item.owner.avatar_url',
        login: 'item.owner.login',
      },
    },
  ]

  beforeEach(() => {
    ;(useSuggestions as jest.Mock).mockReturnValue({
      suggestions: mockSuggestions,
      isLoading: false,
    })
    ;(useDebounce as jest.Mock).mockReturnValue('test query')
  })

  it('renders input correctly', () => {
    render(<Autocomplete />)

    const inputElement = screen.getByPlaceholderText(/Search/i)
    expect(inputElement).toBeInTheDocument()
  })

  it('updates input value when typing', () => {
    render(<Autocomplete />)

    const inputElement = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(inputElement, { target: { value: 'test query' } })

    expect(inputElement).toHaveValue('test query')
  })

  it('renders suggestions list when text input is debounced', async () => {
    render(<Autocomplete />)

    const inputElement = screen.getByPlaceholderText(/Search/i)
    userEvent.type(inputElement, 'test query')

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem').length).toBe(mockSuggestions.length)
    })
  })

  it('opens new tab when a suggestion item is clicked', async () => {
    render(<Autocomplete />)

    const inputElement = screen.getByPlaceholderText(/Search/i)
    userEvent.type(inputElement, 'test query')

    const windowSpy = jest.spyOn(window, 'open').mockImplementation()

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem')
      fireEvent.click(listItems[0])
    })

    expect(windowSpy).toHaveBeenCalledWith(mockSuggestions[0].html_url, '_blank')
    windowSpy.mockRestore()
  })
})

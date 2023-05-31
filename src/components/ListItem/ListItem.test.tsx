import { render, screen, fireEvent } from '@testing-library/react'
import ListItem from './ListItem'

jest.mock('../HighlightSubstring', () => {
  return jest.fn(({ text }) => <span>{text}</span>)
})

describe('ListItem', () => {
  const mockSuggestion = {
    full_name: 'mock-user/mock-repo',
    description: 'This is a mock repository.',
    id: 1,
    html_url: 'https://github.com/mock-user/mock-repo',
    owner: {
      avatar_url: 'https://avatars.com/123456?v=4',
      login: 'mock-user',
    },
  }

  const handleClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders suggestion information', () => {
    render(<ListItem suggestion={mockSuggestion} query='mock' onClick={handleClick} />)

    const titleElement = screen.getByText('mock-user/mock-repo')
    expect(titleElement).toBeInTheDocument()

    const descriptionElement = screen.getByText('This is a mock repository.')
    expect(descriptionElement).toBeInTheDocument()
  })

  test('renders avatar image', () => {
    render(<ListItem suggestion={mockSuggestion} query='mock' onClick={handleClick} />)

    const avatarElement = screen.getByAltText('mock-user')
    expect(avatarElement).toBeInTheDocument()
    expect(avatarElement).toHaveAttribute('src', 'https://avatars.com/123456?v=4')
  })

  test('fires onClick event when clicked', () => {
    render(<ListItem suggestion={mockSuggestion} query='mock' onClick={handleClick} />)

    const listItem = screen.getByRole('listitem')
    fireEvent.click(listItem)

    expect(handleClick).toHaveBeenCalled()
  })
})

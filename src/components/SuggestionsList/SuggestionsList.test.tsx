import userEvent from '@testing-library/user-event'
import SuggestionsList from './SuggestionsList'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

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

describe('SuggestionsList', () => {
  it('should render the suggestions list when showSuggestions is true and there are suggestions', () => {
    render(
      <SuggestionsList
        showSuggestions={true}
        suggestions={mockSuggestions}
        query='test query'
        handleItemsClick={() => () => null}
      />
    )

    const suggestionsList = screen.getByRole('list')
    expect(suggestionsList).toBeDefined()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBe(mockSuggestions.length)
  })

  it('should not render the suggestions list when showSuggestions is false', () => {
    render(
      <SuggestionsList
        showSuggestions={false}
        suggestions={mockSuggestions}
        query='test query'
        handleItemsClick={() => () => null}
      />
    )

    const suggestionsList = screen.queryByRole('list')
    expect(suggestionsList).toBe(null)
  })

  it('should not render the suggestions list when there are no suggestions', () => {
    render(
      <SuggestionsList showSuggestions={true} suggestions={[]} query='test query' handleItemsClick={() => () => null} />
    )

    const suggestionsList = screen.queryByRole('list')
    expect(suggestionsList).toBe(null)
  })

  it('should call handleItemsClick when a suggestion item is clicked', () => {
    const handleItemsClickMock = jest.fn()
    render(
      <SuggestionsList
        showSuggestions={true}
        suggestions={mockSuggestions}
        query='test query'
        handleItemsClick={handleItemsClickMock}
      />
    )

    const listItems = screen.getAllByRole('listitem')
    userEvent.click(listItems[0])
    expect(handleItemsClickMock).toHaveBeenCalledWith(mockSuggestions[0])
  })
})

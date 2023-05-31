import { render, screen } from '@testing-library/react'
import HighlightSubstring from './HighlightSubstring'

describe('HighlightSubstring', () => {
  test('renders with highlighted substring', () => {
    render(<HighlightSubstring text='Hello, World!' substring='World' />)

    const highlightedText = screen.getByText('World')
    expect(highlightedText).toBeInTheDocument()
    expect(highlightedText).toHaveStyle('background-color: yellow')
  })

  test('renders without highlighted substring', () => {
    render(<HighlightSubstring text='Hello, World!' substring='Foo' />)

    const text = screen.getByText('Hello, World!')
    expect(text).toBeInTheDocument()
    const nonHighlightedText = screen.queryByText('Foo')
    expect(nonHighlightedText).not.toBeInTheDocument()
  })

  test('renders with case insensitive substring highlighting', () => {
    render(<HighlightSubstring text='Hello, World!' substring='world' />)

    const highlightedText = screen.getByText('World')
    expect(highlightedText).toBeInTheDocument()
    expect(highlightedText).toHaveStyle('background-color: yellow')
  })

  test('renders without any text', () => {
    render(<HighlightSubstring text='' substring='world' />)

    const highlightedText = screen.queryByText('World')
    expect(highlightedText).not.toBeInTheDocument()
  })
})

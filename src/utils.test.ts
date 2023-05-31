import { RepositoryItem } from '@/types/repositories'
import { mockRepositoryItem } from '@/mocks/repositoryItem'
import {
  sanitizeInput,
  cutText,
  replaceSpaces,
  getItemsWithText,
  filterItemsWithText,
  mapItemToSuggestion,
} from './utils'

describe('Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove all non-alphanumeric characters except spaces, periods, and at symbol', () => {
      const testInput = 'H@llo!$%'
      const expectedOutput = 'H@llo'
      expect(sanitizeInput(testInput)).toBe(expectedOutput)
    })

    it('should not modify allowed characters', () => {
      const testInput = 'abc123 @.'
      expect(sanitizeInput(testInput)).toBe(testInput)
    })

    it('should handle an empty string', () => {
      expect(sanitizeInput('')).toBe('')
    })

    it('should handle string with only non-permitted characters', () => {
      const testInput = '$%&#[]'
      expect(sanitizeInput(testInput)).toBe('')
    })
  })

  describe('cutText', () => {
    it('should return the text limited by the default limit', () => {
      const text = 'a'.repeat(250)
      expect(cutText(text)).toBe('a'.repeat(200))
    })

    it('should return the text limited by a custom limit', () => {
      const text = 'a'.repeat(300)
      expect(cutText(text, 100)).toBe('a'.repeat(100))
    })

    it('should return an empty string when given a null', () => {
      expect(cutText(null)).toBe('')
    })
  })

  describe('replaceSpaces', () => {
    it('should replace multiple spaces with a single space', () => {
      expect(replaceSpaces('a  b    c')).toBe('a b c')
    })

    it('should trim leading and trailing spaces', () => {
      expect(replaceSpaces(' a b c ')).toBe('a b c')
    })
  })

  describe('getItemsWithText', () => {
    it('should return items that contain the text', () => {
      const items: RepositoryItem[] = [
        { ...mockRepositoryItem, full_name: 'foo', description: 'bar' },
        { ...mockRepositoryItem, full_name: 'baz', description: 'qux' },
        { ...mockRepositoryItem, full_name: 'quux', description: 'corge' },
      ]
      expect(getItemsWithText(items, 'foo')).toEqual([
        { ...mockRepositoryItem, full_name: 'foo', description: 'bar' },
      ])
      expect(getItemsWithText(items, 'qux')).toEqual([
        { ...mockRepositoryItem, full_name: 'baz', description: 'qux' },
      ])
    })

    it('should be case insensitive', () => {
      const items = [{ ...mockRepositoryItem, full_name: 'Foo', description: 'Bar' }]
      expect(getItemsWithText(items, 'foo')).toEqual([
        { ...mockRepositoryItem, full_name: 'Foo', description: 'Bar' },
      ])
    })
  })

  describe('filterItemsWithText', () => {
    it('should return a function that filters items with the text', () => {
      const filter = filterItemsWithText('foo')
      const items = [
        { ...mockRepositoryItem, full_name: 'foo', description: 'bar' },
        { ...mockRepositoryItem, full_name: 'baz', description: 'qux' },
      ]
      expect(items.filter(filter)).toEqual([
        { ...mockRepositoryItem, full_name: 'foo', description: 'bar' },
      ])
    })
  })

  describe('mapItemToSuggestion', () => {
    it('should map an item to a suggestion', () => {
      const item = {
        ...mockRepositoryItem,
        full_name: 'foo',
        description: 'bar',
        id: 1,
        html_url: 'https://foo.com',
        owner: {
          ...mockRepositoryItem.owner,
          avatar_url: 'https://avatar.foo.com',
          login: 'foobar',
        },
      }
      const suggestion = {
        full_name: 'foo',
        description: 'bar',
        id: 1,
        html_url: 'https://foo.com',
        owner: {
          avatar_url: 'https://avatar.foo.com',
          login: 'foobar',
        },
      }
      expect(mapItemToSuggestion(item)).toEqual(suggestion)
    })
  })
})

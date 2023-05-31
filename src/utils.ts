import { RepositoryItem } from '@/types/repositories'
import { Suggestion } from '@/types/suggestions'

const TEXT_LIMIT = 200

export const sanitizeInput = (input: string) => input.replace(/[^a-zA-Z0-9 @.]/g, '')

export const cutText = (text: string | null, limit = TEXT_LIMIT) =>
  text ? text.substring(0, limit) : ''

export const replaceSpaces = (text: string) => text.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')

export const getItemsWithText = (items: RepositoryItem[], text: string) =>
  items.filter(
    (item) =>
      item.full_name.toLowerCase().includes(text) ||
      (item.description || '').toLowerCase().includes(text)
  )

export const filterItemsWithText = (text: string) => (item: RepositoryItem) =>
  item.full_name.toLowerCase().includes(text) ||
  (item.description || '').toLowerCase().includes(text)

export const mapItemToSuggestion = (item: RepositoryItem): Suggestion => ({
  full_name: item.full_name,
  description: cutText(item.description),
  id: item.id,
  html_url: item.html_url,
  owner: {
    avatar_url: item.owner.avatar_url,
    login: item.owner.login,
  },
})

import { useState, useEffect } from 'react'
import { Suggestion } from '@/types/suggestions'
import { filterItemsWithText, mapItemToSuggestion } from '@/utils'
import { RepositoriesResponse } from '@/types/repositories'

const useSuggestions = (
  query: string,
  limit = 5
): { suggestions: Suggestion[]; isLoading: boolean } => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchSuggestions() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${lowerCaseQuery}&sort=stars&order=desc`
        )
        const data: RepositoriesResponse = await response.json()
        const filteredSuggestions = data.items
          .filter(filterItemsWithText(lowerCaseQuery))
          .map(mapItemToSuggestion)
          .slice(0, limit)

        setSuggestions(filteredSuggestions)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    const lowerCaseQuery = query.toLowerCase()

    if (lowerCaseQuery.length) fetchSuggestions()
    else setSuggestions([])
  }, [query, limit])

  return { suggestions, isLoading }
}

export default useSuggestions

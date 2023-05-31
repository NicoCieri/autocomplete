import { Suggestion } from '@/types/suggestions'
import ListItem from '@/components/ListItem'
import styles from './SuggestionsList.module.css'

interface SuggestionsListProps {
  showSuggestions: boolean
  suggestions: Suggestion[]
  query: string
  handleItemsClick: (suggestion: Suggestion) => () => void
}

const SuggestionsList = ({ showSuggestions, suggestions, query, handleItemsClick }: SuggestionsListProps) => {
  return (
    <>
      {showSuggestions && !!suggestions.length && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <ListItem
              key={suggestion.id}
              suggestion={suggestion}
              query={query}
              onClick={handleItemsClick(suggestion)}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default SuggestionsList

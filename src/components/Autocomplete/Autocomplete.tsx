import { useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useSuggestions from '@/hooks/useSuggestions'
import SuggestionsList from '@/components/SuggestionsList'
import Spinner from '@/components/Spinner'
import { Suggestion } from '@/types/suggestions'
import { replaceSpaces, sanitizeInput } from '@/utils'
import styles from './Autocomplete.module.css'

const Autocomplete = () => {
  const [text, setText] = useState('')
  const debouncedQuery = useDebounce(replaceSpaces(text), 500)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const { suggestions, isLoading: isSuggestionsLoading } = useSuggestions(debouncedQuery)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = sanitizeInput(e.target.value)
    setText(sanitizedInput)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: Suggestion) => () => {
    setShowSuggestions(false)
    window.open(suggestion.html_url, '_blank')
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type='text'
          value={text}
          onChange={handleInputChange}
          className={styles.input}
          placeholder='Search for Github repositories'
          autoFocus
        />

        {isSuggestionsLoading && <Spinner />}
      </div>

      <SuggestionsList
        suggestions={suggestions}
        query={debouncedQuery}
        showSuggestions={showSuggestions && !!debouncedQuery}
        handleItemsClick={handleSuggestionClick}
      />
    </div>
  )
}

export default Autocomplete

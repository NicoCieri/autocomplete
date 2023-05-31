import { Suggestion } from '@/types/suggestions'
import HighlightSubstring from '../HighlightSubstring'
import styles from './ListItem.module.css'

interface ListItemProps {
  suggestion: Suggestion
  query: string
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void
}

const ListItem = ({ suggestion, query, onClick }: ListItemProps) => {
  return (
    <li className={styles.listItem} onClick={onClick}>
      <img src={suggestion.owner.avatar_url} alt={suggestion.owner.login} className={styles.avatar} />
      <div className={styles.text}>
        <span className={styles.title}>
          <HighlightSubstring substring={query} text={suggestion.full_name} />
        </span>
        <span className={styles.description}>
          <HighlightSubstring substring={query} text={suggestion.description} />
        </span>
      </div>
    </li>
  )
}

export default ListItem

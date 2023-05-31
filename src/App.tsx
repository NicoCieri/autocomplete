import Autocomplete from '@/components/Autocomplete'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Github Repositories</h1>
      </header>
      <Autocomplete />
    </div>
  )
}

export default App

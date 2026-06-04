import styles from './Difficulty.module.scss'
import { useTheme } from '@/shared/context/ThemeContext'

const Difficulty = (props) => {
  const theme = useTheme()
  const {
    isActive,
    isActive2,
    isActive3,
    handleClick,
    handleClick2,
    handleClick3,
  } = props

  return (
    <div className={styles.list}>
    <p className={styles.title}>Сложность задачи:</p>
    <div className={styles.buttons}>
      <button className={`${isActive ? styles.button1_chosen : styles.button1}`} data-theme={theme} type="button" onClick={handleClick}
      > Легкая
      </button>
      <button className={`${isActive2 ? styles.button2_chosen : styles.button2}`} data-theme={theme} type="button" onClick={handleClick2}
      > Средняя
      </button>
      <button className={`${isActive3 ? styles.button3_chosen : styles.button3}`} data-theme={theme} type="button" onClick={handleClick3}
      > Сложная
      </button>

    </div>
    </div>
  )
}

export default Difficulty

import {memo, useContext, useMemo} from 'react'
import { TasksContext } from '@/entities/todo'
import { useTheme } from '@/shared/context/ThemeContext'

const TodoInfo = (props) => {
  const { styles } = props

  const theme = useTheme()

  const {
    tasks,
    deleteAllTasks,
  } = useContext(TasksContext)

  const total = tasks.length
  const hasTasks = total > 0
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Сделано {done} из {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          data-theme={theme}
          onClick={deleteAllTasks}
        >
          Удалить всё
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)
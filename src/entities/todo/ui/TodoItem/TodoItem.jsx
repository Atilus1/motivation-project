import { memo, useContext, useEffect, useState, useCallback } from 'react'
import { TasksContext } from '@/entities/todo'
import { useTheme } from '@/shared/context/ThemeContext'
import RouterLink from '@/shared/ui/RouterLink'
import styles from './TodoItem.module.scss'

const TodoItem = (props) => {
  let {
    className = '',
    id,
    title,
    isDone,
    difficulty,
    setDifficulty,
  } = props

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    updateTaskTitle,
    editingTaskId,
    setEditingTaskId,
    disappearingTaskId,
    appearingTaskId,
    balance,
    setBalance,
  } = useContext(TasksContext)

  const theme = useTheme()

  const isEditing = editingTaskId === id
  const [draftTitle, setDraftTitle] = useState(title)

  useEffect(() => {
    if (isEditing) {
      setDraftTitle(title)
    }
  }, [isEditing, title])


  const Completing = useCallback(() => {
    if (difficulty == "Легкая ⭐") {
      setBalance(balance + 1)
    }
    if (difficulty == "Средняя ⭐⭐" ) {
      setBalance(balance + 2)
    }
    if (difficulty == "Сложная ⭐⭐⭐") {
      setBalance(balance + 3)
    }
    deleteTask(id)
  }, [difficulty, balance]);

  const startEditing = () => {
    setDraftTitle(title)
    setEditingTaskId(id)
  }

  const stopEditing = () => {
    setEditingTaskId((current) => (current === id ? null : current))
  }

  const cancelEditing = () => {
    setDraftTitle(title)
    stopEditing()
  }

  const saveEditing = () => {
    const normalizedTitle = draftTitle.trim()

    if (!normalizedTitle) {
      return
    }

    if (normalizedTitle !== title) {
      updateTaskTitle(id, normalizedTitle)
    }

    stopEditing()
  }

  return (
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${isEditing ? styles.todoItemEditing : ''}
        ${disappearingTaskId === id ? styles.isDisappearing : ''}
        ${appearingTaskId === id ? styles.isAppearing : ''}
      `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      {isEditing ? (
        <div className={styles.editBlock}>
          <div className={styles.editHeader}>
            <input
              className={styles.checkbox}
              id={id}
              type="checkbox"
              checked={isDone}
              onChange={({ target }) => {
                toggleTaskComplete(id, target.checked)
              }}
            />
            <textarea
              className={styles.titleField}
              value={draftTitle}
              rows={5}
              aria-label="Редактирование названия задачи"
              onChange={({ target }) => setDraftTitle(target.value)}
              onKeyDown={({ key, ctrlKey, metaKey }) => {
                if (key === 'Enter' && (ctrlKey || metaKey)) {
                  saveEditing()
                }

                if (key === 'Escape') {
                  cancelEditing()
                }
              }}
            />
          </div>
          <div className={styles.editFooter}>
            <button
              className={styles.actionButton}
              type="button"
              data-theme={theme}
              onClick={saveEditing}
              disabled={!draftTitle.trim()}
            >
              Сохранить
            </button>
            <button
              className={styles.actionButton}
              type="button"
              data-theme={theme}
              onClick={cancelEditing}
            >
              Отмена
            </button>
            <button
              className={styles.deleteButton}
              type="button"
              data-theme={theme}
              aria-label="Удалить"
              title="Удалить"
              onClick={() => deleteTask(id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.viewMain}>
            <input
              className={styles.checkbox}
              id={id}
              type="checkbox"
              checked={isDone}
              onChange={({ target }) => {
                toggleTaskComplete(id, target.checked)
              }}
            />
            <label
              className={`${styles.label} visually-hidden`}
              htmlFor={id}
            >
              {title}
            </label>
            <RouterLink
              className={styles.titleLink}
              to={`tasks/${id}`}
              aria-label="Страница задачи"
            >
              {title}
            </RouterLink>
          </div>

          <div className={styles.difftitle} >Сложность - {difficulty}</div>

          <div className={styles.viewActions}>
          <button
              className={styles.actionButton}
              type="button"
              data-theme={theme}
              aria-label="Выполнить"
              title="Выполнить"
              onClick={Completing}
            >
              Выполнить
            </button>
            <button
              className={styles.actionButton}
              type="button"
              data-theme={theme}
              aria-label="Изменить"
              title="Изменить"
              onClick={startEditing}
            >
              Изменить
            </button>
            <button
              className={styles.deleteButton}
              type="button"
              data-theme={theme}
              aria-label="Удалить"
              title="Удалить"
              onClick={() => deleteTask(id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)

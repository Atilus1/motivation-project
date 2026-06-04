import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'
import {useContext, useState} from 'react'
import { TasksContext } from '@/entities/todo'
import Difficulty from '../../shared/ui/Difficulty'
import RouterLink from '../../shared/ui/RouterLink/RouterLink'

const AddTaskForm = (props) => {
  const { styles } = props

  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    isActive,
    isActive2,
    isActive3,
    handleClick,
    handleClick2,
    handleClick3,
    difficulty,
  } = useContext(TasksContext)

  const [error, setError] = useState('')

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event) => {
    event.preventDefault()

    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle, difficulty)
      console.log(difficulty)
    }
  }

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'The task cannot be empty' : '')
  }

  return (
    <div className="form2">
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label="Новая задача"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button
        type="submit"
        isDisabled={isNewTaskTitleEmpty}
      >
        Добавить
      </Button>
    </form>
      <Difficulty
      isActive={isActive}
      isActive2={isActive2}
      isActive3={isActive3}
      handleClick={handleClick}
      handleClick2={handleClick2}
      handleClick3={handleClick3}
      />
      <p>Баллы = {localStorage.getItem('balance')}⭐</p>
      <Button
        type="button"
      >
        <RouterLink
              className={styles.titleLink}
              to={`/shop`}
            >
              Магазин
            </RouterLink>
      </Button>
      <Button
        type="button"
      >
        <RouterLink
              className={styles.titleLink}
              to={`/storage`}
            >
              Хранилище
            </RouterLink>
      </Button>
      
    </div>
  )
}

export default AddTaskForm

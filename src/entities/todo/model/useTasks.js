import { useCallback, useEffect, useMemo, useRef, useState, useReducer } from 'react'
import tasksAPI from '@/shared/api/tasks'

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state
    }
    case 'ADD': {
      return [...state, action.task]
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task
      })
    }
    case 'UPDATE_TITLE': {
      const { id, title } = action

      return state.map((task) => {
        return task.id === id ? { ...task, title } : task
      })
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [])

  let globalBalance = localStorage.getItem('balance') || 0
  let [balance, setBalance] = useState(+globalBalance)
  localStorage.setItem('balance', balance)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingTaskId, setDisappearingTaskId] = useState(null)
  const [appearingTaskId, setAppearingTaskId] = useState(null)

  let [isActive, setIsActive] = useState(false);
  let [isActive2, setIsActive2] = useState(false);
  let [isActive3, setIsActive3] = useState(false);
  let [difficulty, setDifficulty] = useState("★");

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Вы уверены что хотите удалить все задачи?')

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks)
        .then(() => dispatch({ type: 'DELETE_ALL' }))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId)
      .then(() => {
        setDisappearingTaskId(taskId)
        setTimeout(() => {
          dispatch({ type: 'DELETE', id: taskId })
          setDisappearingTaskId(null)
        }, 400)
      })
  }, [])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone)
      .then(() => {
        dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
      })
  }, [])

  const updateTaskTitle = useCallback((taskId, title) => {
    tasksAPI.updateTitle(taskId, title)
      .then(() => {
        dispatch({ type: 'UPDATE_TITLE', id: taskId, title })
      })
  }, [])

  const addTask = useCallback((title, difficulty) => {
    const newTask = {
      title,
      isDone: false,
      difficulty,
    }

    tasksAPI.add(newTask)
      .then((addedTask) => {
        dispatch({ type: 'ADD', task: addedTask })
        setNewTaskTitle('')
        setSearchQuery('')
        newTaskInputRef.current.focus()
        setAppearingTaskId(addedTask.id)
        setTimeout(() => {
          setAppearingTaskId(null)
        }, 400)
      })
  }, [])

  useEffect(() => {
    newTaskInputRef.current.focus()

    tasksAPI.getAll().then((serverTasks) => {
      dispatch({ type: 'SET_ALL', tasks: serverTasks })
    })
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchQuery, tasks])

/*   const filteredItems = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? items.filter(({ name }) => name.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchQuery, items]) */

   /*  Добавить сложность логика */

  const handleClick = useCallback(() => {
    if (isActive != true && isActive2 != true && isActive3 != true) {
    setIsActive(isActive = true); 
    setDifficulty("Легкая ⭐")
    console.log(difficulty)
    } else { 
      setIsActive(isActive = false);
      console.log(difficulty)
    }
  }, [isActive, isActive2, isActive3]);
  const handleClick2 = useCallback(() => {
    if (isActive2 != true && isActive != true && isActive3 != true) {
    setIsActive2(isActive2 = true);
    setDifficulty("Средняя ⭐⭐")
    console.log(difficulty) 
    } else { 
      setIsActive2(isActive2 = false);
      console.log(difficulty)
    }
  }, [isActive, isActive2, isActive3]);
  const handleClick3 = useCallback(() => {
    if (isActive3 != true && isActive != true && isActive2 != true) {
    setIsActive3(isActive3 = true); 
    setDifficulty("Сложная ⭐⭐⭐")
    console.log(difficulty)
    } else { 
      setIsActive3(isActive3 = false);
      console.log(difficulty)
    }
  }, [isActive, isActive2, isActive3]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    updateTaskTitle,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
    isActive,
    isActive2,
    isActive3,
    handleClick,
    handleClick2,
    handleClick3,
    difficulty,
    balance,
    setBalance,
  }
}

export default useTasks

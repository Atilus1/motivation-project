import {createContext, useMemo, useState} from 'react'
import useTasks from './useTasks'
import useIncompleteTaskScroll from './useIncompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const [editingTaskId, setEditingTaskId] = useState(null)
  

  const {
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
  } = useTasks()

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = useIncompleteTaskScroll(tasks)

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    updateTaskTitle,
    editingTaskId,
    setEditingTaskId,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    isActive,
    isActive2,
    isActive3,
    handleClick,
    handleClick2,
    handleClick3,
    difficulty,
    balance,
    setBalance,
  }), [
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    updateTaskTitle,
    editingTaskId,
    setEditingTaskId,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    isActive,
    isActive2,
    isActive3,
    handleClick,
    handleClick2,
    handleClick3,
    difficulty,
    balance,
    setBalance,
  ])

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}

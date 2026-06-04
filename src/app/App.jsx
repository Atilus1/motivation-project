import { useEffect, useState } from 'react'
import Router from './routing/Router'
import TasksPage from '@/pages/TasksPage'
import TaskPage from '@/pages/TaskPage'
import Shop from '../pages/Shop'
import Storage from '../pages/Storage'
import { ThemeContext } from '@/shared/context/ThemeContext'
import styles from './App.module.scss'
import './styles'

const THEME_KEY = 'theme'

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '/shop': Shop,
    '/storage': Storage,
    '*': () => <div>404 Page not found</div>,
  }

  return (
    <ThemeContext.Provider value={theme}>
      <button
        type="button"
        className={styles.themeToggle}
        data-theme={theme}
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}
        title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}
      >
        {theme === 'light' ? '🌙' : '☀'}
      </button>
      <Router routes={routes} />
    </ThemeContext.Provider>
  )
}

export default App

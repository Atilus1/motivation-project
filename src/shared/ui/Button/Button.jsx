import styles from './Button.module.scss'
import { useTheme } from '@/shared/context/ThemeContext'

const Button = (props) => {
  const theme = useTheme()
  const {
    className = '',
    type = 'button',
    children,
    isDisabled,
    onClick,
    ...rest
  } = props

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      data-theme={theme}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

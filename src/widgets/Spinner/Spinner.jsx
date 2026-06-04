import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.circle}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </div>
  )
}
export default Spinner

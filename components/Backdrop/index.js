import styles from './styles.module.scss'

export function Backdrop({ open = false, className, ...props }) {

  return open && (
    <div className={`${styles.backdrop} ${className}`}>
      <div
        className={styles.loader}
        {...props}
      />
    </div>
  )
}

export default Backdrop
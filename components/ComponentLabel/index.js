import styles from './styles.module.scss'

export function ComponentLabel({ label, children, className, labelWidth = '30%' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <span style={{ width: labelWidth }} className={styles.label}>
        {label}
      </span>
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default ComponentLabel
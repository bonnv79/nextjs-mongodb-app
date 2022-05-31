import styles from './styles.module.scss'

export function HeaderAction({ className = '', title = '', children = '', ...props }) {
  return (
    <div className={`${styles.actionContent} ${className}`} {...props}>
      <span className={styles.title}>
        {title}
      </span>
      <div className={styles.action}>
        {children}
      </div>
    </div>
  )
}

export default HeaderAction
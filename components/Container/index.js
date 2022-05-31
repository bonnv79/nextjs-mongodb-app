import styles from './styles.module.scss'

export function Container({ className, ...props }) {
  return (
    <div
      className={`${styles.container} ${className}`}
      {...props}
    />
  )
}

export default Container
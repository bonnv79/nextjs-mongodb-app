import styles from './styles.module.scss'

export function Input({ className, ...props }) {
  return (
    <input
      className={`${styles.input} ${className}`}
      {...props}
    />
  )
}

export default Input
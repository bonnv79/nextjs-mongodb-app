import styles from './styles.module.scss'

export function Button({ className, ...props }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...props}
    />
  )
}

export default Button
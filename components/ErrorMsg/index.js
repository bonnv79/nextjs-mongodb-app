import styles from './styles.module.scss'

export function ErrorMsg({ className, children, ...props }) {
  return (
    <center>
      <div
        className={`${styles.errorMsg} ${className}`}
        {...props}
      >
        {children}
      </div>
    </center>
  )
}

export default ErrorMsg
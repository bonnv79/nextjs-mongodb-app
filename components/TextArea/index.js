import styles from './styles.module.scss'

// rows, cols
export function TextArea({ className, ...props }) {
  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      {...props}
    />
  )
}

export default TextArea;
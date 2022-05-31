import { ERROR_MSG } from 'constants/msg'
import styles from './styles.module.scss'

export function DataNotFound({ className, ...props }) {
  return (
    <center>
      <div
        className={`${styles.dataNotFound} ${className}`}
        {...props}
      >
        {ERROR_MSG.DATA_NOT_FOUND}
      </div>
    </center>
  )
}

export default DataNotFound
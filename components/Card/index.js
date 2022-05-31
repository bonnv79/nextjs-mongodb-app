import Link from 'next/link';
import styles from './styles.module.scss'

export function Card({ href, title, children = 'Click to view page details' }) {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <h2>{title}</h2>
        <p>{children}</p>
      </a>
    </Link>
  )
}

export default Card

import styles from './style.module.css'
export default function Loading() {
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__spinner}></div>
    </div>
  )
}
import styles from './style.module.css'
export default function Title({Title}: {Title: string}){
    return(
        <div className={styles.title__container}>
          <h1 className={styles.title__text}>{Title}</h1>
        </div>
    )
}
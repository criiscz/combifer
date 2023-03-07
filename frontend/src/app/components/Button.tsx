import styles from './component.module.css'
export default function Button({title, onClick}:{title:string, onClick:Function}){
    return(
        <div className={styles.button}>
          <button onClick={onClick()}>{title}</button>
        </div>
    )
}
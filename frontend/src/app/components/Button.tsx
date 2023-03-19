import styles from './component.module.css'
import {Icon, IconifyIcon} from "@iconify/react";
export default function Button({title, onClick, icon}:{title:string, onClick:Function, icon?:string | IconifyIcon}){
    return(
        <div className={styles.button}>
          { icon && <Icon icon={icon} width={20} height={20}/> }
          <button onClick={() => onClick()}>{}{title}</button>
        </div>
    )
}
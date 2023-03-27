import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {useEffect} from "react";

export default function Toast({open, onclose, text}: ToastProps) {

  useEffect(() => {
    setTimeout(() => {
      onclose()
    }, 5000)
  }, [onclose, open])

  return (
    <div className={
      open ? styles.toast__container : styles.toast__container__close}>
      <div className={styles.toast__content}>
        <div className={styles.toast__icon}>
          <Icon icon={'mdi:check-circle'} color={'var(--green-light)'} width={30} height={30}/>
        </div>
        <div className={styles.toast__text}>
          {text}
        </div>
        <div className={styles.toast__close}>
          <button onClick={onclose}>X</button>
        </div>
      </div>
    </div>
  )
}

interface ToastProps {
  open: boolean,
  onclose: () => void,
  text: string
}
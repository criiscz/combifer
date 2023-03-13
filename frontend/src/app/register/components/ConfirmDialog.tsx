'use client'
import styles from './confirm.module.css'
import {concatClassNames as cn} from "@/helpers/helpers";
import {Icon} from '@iconify/react';
import {Inter} from 'next/font/google'
import {Component} from "react";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})
export default class ConfirmDialog extends Component<ConfirmDialogProps> {
  render() {
    let {name, role, onClick} = this.props;

    return (
      <div className={cn(inter.className, styles.dialog)}>
        {/*// <div className={styles.dialog}>*/}
        <div className={styles.dialogHeader}>
          <Icon icon="emojione:white-heavy-check-mark" width={100} height={100}/>
          <h2>Usuario Registrado!</h2>
        </div>
        <div className={styles.dialogBody}>
          <p><b>Nombre:</b> &nbsp; {name}</p>
          <p><b>Rol:</b> &nbsp; {role}</p>
        </div>
        <button className={styles.dialogButton} onClick={onClick}>Continuar</button>
      </div>
    )
  }
}

interface ConfirmDialogProps {
  name: string,
  role: string,

  onClick: () => void,
}
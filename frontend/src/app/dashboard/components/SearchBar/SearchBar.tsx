'use client'
import styles from './style.module.css';
import {Icon} from "@iconify/react";

export default function SearchBar(props:SearchBarProps) {

  const changeText = (e: any) => {
    props.onSubmit(e.target.value)
  }

  return (
    <div className={styles.searchbar_container}>
      <input type="text" placeholder="Buscar producto" className={styles.searchbar_input}
             onInput={changeText}/>
      <Icon icon={'carbon:search'}/>
    </div>
  )
}

interface SearchBarProps {
  onSubmit: (e: any) => void
}
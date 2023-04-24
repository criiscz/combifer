'use client'
import styles from './style.module.css';
import {Icon} from "@iconify/react";

export default function SearchBar(props:SearchBarProps) {

  const changeText = (e: any) => {
    props.onSubmit(e.target.value)
  }

  return (
    <div className={props.className || styles.searchbar_container}>
      <input type="text" placeholder={props.placeholder || "Buscar producto"} className={styles.searchbar_input}
             onInput={changeText} id={props.id}/>
      <Icon icon={'carbon:search'}/>
    </div>
  )
}

interface SearchBarProps {
  onSubmit: (e: any) => void,
  placeholder?: string,
  className?: string
  id?: string
}
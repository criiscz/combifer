'use client'
import styles from './navbar.module.css'
import Link from "next/link";
import React from "react";
import {Icon} from "@iconify/react";

export default function NavBar({name, role, id}: NavBarProps) {

  // ------------------  States ------------------ //
  const [time, setTime] = React.useState(new Date().toLocaleTimeString('es-ES', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }))
  const [date] = React.useState(new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }))

  // ------------------  Effects ------------------ //
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }))
    }, 1000)
    return () => clearInterval(interval)
  });

  // ------------------  Render ------------------ //

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__header}>
        <div className={styles.navbar__header_data}>
          <h1 className={styles.navbar__data__name}>{name}</h1>
          <h2 className={styles.navbar__data__role}>{role}</h2>
        </div>
        <div className={styles.navbar__info}>
          <div className={styles.navbar__sysinfo}>
            <div className={styles.navbar__icon_w_text}>
              <Icon icon="bi:calendar3"/>
              <h3 className={styles.navbar__data__date}>{date}</h3>
            </div>
            <div className={styles.navbar__icon_w_text}>
              <Icon icon="bi:clock"/>
              <h3 className={styles.navbar__data__time}>{time}</h3>
            </div>
          </div>
          <div className={styles.navbar__logout}>
            <Icon icon="bi:door-open-fill"/>
            <Link href={'#'}> Cerrar Sesión </Link>
          </div>
        </div>
      </div>
      <div className={styles.navbar__links}>
        <ul className={styles.navbar__link_ul}>
          <li className={styles.navbar__link_1}>
            <Icon icon="bi:house"/>
            <Link href={'/dashboard/inventory'} >
              Inventario
            </Link>
          </li>
          <li className={styles.navbar__link_1}>
            <Icon icon="ic:outline-sell"/>
            <Link href={'#'} >
              Ventas
            </Link>
          </li>
          <li className={styles.navbar__link_1}>
            <Icon icon="mdi:report-bell-curve"/>
            <Link href={'#'} >
              Reportes
            </Link>
          </li>
          <li className={styles.navbar__link_1}>
            <Icon icon="bi:gear"/>
            <Link href={'#'} >
              Configuración
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  )
}

interface NavBarProps {
  name?: string;
  role?: string;
  id?: string;


}
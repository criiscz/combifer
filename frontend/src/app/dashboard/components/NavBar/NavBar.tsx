'use client'
import styles from './navbar.module.css'
import Link from "next/link";
import React, {useCallback} from "react";
import {Icon} from "@iconify/react";
import MenuOption from "@/app/dashboard/components/NavBar/MenuOption/MenuOption";

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
  const [active, setActive] = React.useState<boolean[]>([false, false, false, false])

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

  // ------------------  Functions ------------------ //
  const handleActive = ((index: number) => {
    const newActive = [false, false, false, false]
    newActive[index] = true
    setActive(newActive)
  })

  // Maybe this is not the best way to do this, but it works! :D
  React.useEffect(() => {
    const href = window.location.href
    if (href.includes('inventory')) setActive([true, false, false, false])
    else if (href.includes('sells')) setActive([false, true, false, false])
    else if (href.includes('reports')) setActive([false, false, true, false])
    else if (href.includes('settings')) setActive([false, false, false, true])
  }, [])

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

        </div>
      </div>
      <div className={styles.navbar__links}>
        <ul className={styles.navbar__link_ul}>
          <MenuOption index={0} icon={"bi:house"} text={'Inventario'} link={'/dashboard/inventory'}
                      active={active[0]} onClick={handleActive}/>
          <MenuOption index={1} icon={"ic:outline-sell"} text={'Ventas'} link={'/dashboard/sells'}
                      active={active[1]} onClick={handleActive}/>
          <MenuOption index={2} icon={"mdi:report-bell-curve"} text={'Reportes'}
                      link={'/dashboard/reports'}
                      active={active[2]} onClick={handleActive}/>
          <MenuOption index={3} icon={'bi:gear'} text={'Configuración'} link={'/dashboard/settings'}
                      active={active[3]} onClick={handleActive}/>
        </ul>
      </div>
      <div>
        <div className={styles.navbar__logout}>
          <Icon icon="bi:door-open-fill"/>
          <Link href={'/logout'}> Cerrar Sesión </Link>
        </div>
      </div>
    </nav>

  )
}

interface NavBarProps {
  name?: string;
  role?: string;
  id?: string;


}
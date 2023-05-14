'use client'
import styles from './navbar.module.css'
import Link from "next/link";
import React, {useCallback} from "react";
import {Icon} from "@iconify/react";
import MenuOption from "@/app/dashboard/components/NavBar/MenuOption/MenuOption";

export default function NavBar({name, role, id}: NavBarProps) {
  const tabNameDictionary = {
    inventory: "inventory",
    sells: "sells",
    users: "users",
    orders: "orders",
    reports: "reports",
    settings: "settings",
  };

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
  }, [])
  // });
  // const [active, setActive] = React.useState<boolean[]>([false, false, false, false])
  //
  //
  // // ------------------  Functions ------------------ //
  // const handleActive = ((index: number) => {
  //   const newActive = [false, false, false, false, false, false]
  //   newActive[index] = true
  //   setActive(newActive)
  // })
  //
  // // Maybe this is not the best way to do this, but it works! :D
  // React.useEffect(() => {
  //   const href = window.location.href
  //   if (href.includes('inventory'))     setActive([true, false, false, false, false, false])
  //   else if (href.includes('sells'))    setActive([false, true, false, false, false, false])
  //   else if (href.includes('users'))    setActive([false, false, true, false, false, false])
  //   else if (href.includes('orders'))   setActive([false, false, false, true, false, false])
  //   else if (href.includes('reports'))  setActive([false, false, false, false, true, false])
  //   else if (href.includes('settings')) setActive([false, false, false, false, false, true])
  // }, [])

  // React.useEffect(() => {
  //   const pathMap = {
  //     '/inventory': 0,
  //     '/sells': 1,
  //     '/users': 2,
  //     '/orders': 3,
  //     '/reports': 4,
  //     '/settings': 5
  //   }
  //   const path = window.location.pathname
  //   const index = Object.keys(pathMap).findIndex(key => path.includes(key))
  //   setActive(Array(6).fill(false).fill(true, index, index + 1))
  // }, [])

  const [active, setActive] = React.useState<ActiveState>({
    inventory: false,
    sells: false,
    users: false,
    orders: false,
    reports: false,
    settings: false,
  });

  const setActiveTab = useCallback((tabName: keyof ActiveState) => {
    // @ts-ignore
    setActive((prevState) => ({
      ...Object.fromEntries(Object.entries(prevState).map(([key]) => [key, false])),
      [tabName]: true,
    }));
  }, []);

  React.useEffect(() => {
    const href = window.location.href;

    const tabName = Object.keys(tabNameDictionary).find((key) =>
      href.includes(key)
    );
    if (tabName) setActiveTab(tabName as keyof ActiveState);
  }, [setActiveTab]);


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
                      active={active['inventory']} onClick={() => setActiveTab('inventory')}/>
          <MenuOption index={1} icon={"ic:outline-sell"} text={'Ventas'} link={'/dashboard/sells'}
                      active={active['sells']} onClick={() => setActiveTab('sells')}/>

          <MenuOption index={2} icon={'bi:people'} text={'Usuarios'} link={'/dashboard/users'}
                      active={active["users"]} onClick={() => setActiveTab("users")}/>
          <MenuOption index={3} icon={'bi:cart'} text={'Ordenes'} link={'/dashboard/orders'}
                      active={active["orders"]} onClick={() => setActiveTab("orders")}/>
          <MenuOption index={4} icon={"mdi:report-bell-curve"} text={'Reportes'}
                      link={'/dashboard/reports'}
                      active={active["reports"]} onClick={() => setActiveTab("reports")}/>
          <MenuOption index={5} icon={'bi:gear'} text={'Configuración'} link={'/dashboard/settings'}
                      active={active["settings"]} onClick={() => setActiveTab("settings")}/>
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

interface ActiveState {
  inventory: boolean;
  sells: boolean;
  users: boolean;
  orders: boolean;
  reports: boolean;
  settings: boolean;
}
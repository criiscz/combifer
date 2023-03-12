import NavBar from "@/app/dashboard/components/NavBar/NavBar";
import styles from './style.module.css'

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <body className={styles.container}>
      <aside className={styles.asideNavBar}>
        <NavBar name={'Juan Peréz'} role={'Administrador'}/>
      </aside>
      <main className={styles.body}>
        {children}
      </main>
    </body>
  )
}
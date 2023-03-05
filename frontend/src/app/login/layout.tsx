import LogoLogin from "@/app/login/LogoLogin";
import styles from './login.module.css'

export default function DashboardLayout({
                                          children,
                                        }: {
  children: React.ReactNode,
}) {
  return (
    <body>
      <section className={styles.loginContainer}>
        <LogoLogin/>
        {children}
      </section>
    </body>
  );
}
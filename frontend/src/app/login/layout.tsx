import LogoLogin from "@/app/login/components/LogoLogin";
import styles from './login.module.css'

export default function LoginLayout({
                                          children,
                                        }: {
  children: React.ReactNode,
}) {
  return (
    <body>
      <section className={styles.loginContainer}>
        <LogoLogin style={'vertical'}/>
        {children}
      </section>
    </body>
  );
}
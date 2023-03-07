import styles from "@/app/login/login.module.css";
import LoginForm from "@/app/login/components/LoginForm";
import Link from "next/link";
import RecoverPasswordForm from "@/app/login/recover-password/components/RecoverPasswordForm";

export default function RecoverPasswordPage(){
    return(
      <section className={styles.form_login}>
        <h1>Recuperar Contraseña</h1>
        <RecoverPasswordForm/>
        <Link href={'/login'}>Iniciar Sesión</Link>
      </section>
    )
}
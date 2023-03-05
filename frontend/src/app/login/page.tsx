import styles from './login.module.css';
import Link from "next/link";
import LoginForm from "@/app/login/components/LoginForm";

export default function Login(){

  const username = "";
  const password = "";

  return (
    <section className={styles.form_login}>
      <h1>Inicio de sesión</h1>
      <LoginForm />
      <Link href={'/login/recover-password'}>Recuperar Contraseña</Link>
    </section>
  )
};


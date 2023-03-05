'use client'
import styles from './login.module.css'
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const login = async (username?:string, password?:string) => {
    router.push('/dashboard')
  }

  const [credentials, setCredentials] = useState<LoginCredentials>();
  const handleChange = ({target: {name, value}}: any) => setCredentials({
    ...credentials,
    [name]: value
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.localStorage.setItem('token', 'token')
    await login(credentials?.username, credentials?.password)
    // await login(credentials?.username, credentials?.password);
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form_form}>
      <label className={styles.form_label} htmlFor="username">Username</label>
      <input name={'username'} onChange={handleChange} className={styles.form_input} type="text"
             id="username" placeholder='Escribe un nombre de usuario'/>
      <label className={styles.form_label} htmlFor="password">Contraseña</label>
      <input name={'password'} onChange={handleChange} className={styles.form_input} type="password"
             id="password" placeholder='Escribe una contraseña'/>
      <button type={'submit'} className={styles.form_button}>Entrar</button>
    </form>
  )


}

interface LoginCredentials {
  username?: string;
  password?: string;
}
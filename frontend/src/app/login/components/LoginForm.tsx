'use client'
import styles from '../login.module.css'
import {FormEvent, useEffect, useMemo, useState} from "react";
import {useRouter} from 'next/navigation';
import {login, sessionInfo} from "@/api/Login";
import Cookies from "universal-cookie"


export default function LoginForm() {

  // ----------------------------- Hooks ----------------------------- //
  const router = useRouter();
  const [error, setError] = useState(false);
  const cookies = useMemo(() => new Cookies(), []);
  const [credentials, setCredentials] = useState<LoginCredentials>();
  // ----------------------------- Effects ----------------------------- //
  useEffect(() => {
    if (cookies.get('userToken')) router.push('/dashboard')
  }, [cookies, router])
  // ----------------------------- Functions ----------------------------- //
  const handleChange = ({target: {name, value}}: any) => setCredentials({
    ...credentials,
    [name]: value
  });
  function showErrorLoginMessage() {
    setError(true);
    setTimeout(() => {
      setError(false)
    }, 3000)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(credentials?.username, credentials?.password).then((res: { status: number; json: () => any; }) => {
      if (res.status === 200) return res.json()
      showErrorLoginMessage();
    }).then((data: { accessToken: any; expiresIn: number; }) => {
        cookies.set('userToken', data.accessToken, {
          path: '/',
          expires: new Date(Date.now() + data.expiresIn*1000)
        });
        router.push('/dashboard')
      }
    ).catch(() => showErrorLoginMessage())
  }
  // ----------------------------- Render ----------------------------- //
  return (
    <form onSubmit={handleSubmit} className={styles.form_form}>
      <label className={styles.form_label} htmlFor="username">Username</label>
      <input name={'username'} onChange={handleChange}
             className={styles.form_input} type="text"
             id="username" placeholder='Escribe un nombre de usuario' required/>
      <label className={styles.form_label} htmlFor="password">Contraseña</label>
      <input name={'password'} onChange={handleChange}
             className={!error ? styles.form_input : styles.form_input_error} type="password"
             id="password" placeholder='Escribe una contraseña' required/>
      <p className={!error ? styles.form_error : styles.form_error_active}>Contraseña Incorrecta,
        Verifique sus credenciales.</p>
      <button type={'submit'} className={styles.form_button}>Entrar</button>
    </form>
  )


}

interface LoginCredentials {
  username?: string;
  password?: string;
}
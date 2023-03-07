'use client'
import styles from '../login.module.css'
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState(true);
  const login = async (username?: string, password?: string) => {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password
        }
      )
    })
  }

  const [credentials, setCredentials] = useState<LoginCredentials>();
  const handleChange = ({target: {name, value}}: any) => setCredentials({
    ...credentials,
    [name]: value
  });
  // TODO: Improve this code to handle errors and use the real login api.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.localStorage.setItem('token', 'token')
    await login(credentials?.username, credentials?.password).then(
      () => {
        router.push('/dashboard')
      }
    ).catch(
      () => {
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 3000)
      })
    // await login(credentials?.username, credentials?.password);
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form_form}>
      <label className={styles.form_label} htmlFor="username">Username</label>
      <input name={'username'} onChange={handleChange}
             className={styles.form_input} type="text"
             id="username" placeholder='Escribe un nombre de usuario'/>
      <label className={styles.form_label} htmlFor="password">Contraseña</label>
      <input name={'password'} onChange={handleChange}
             className={!error ? styles.form_input : styles.form_input_error} type="password"
             id="password" placeholder='Escribe una contraseña'/>
      <p className={!error ? styles.form_error : styles.form_error_active}>Contraseña Incorrecta, Verifique sus credenciales.</p>
      <button type={'submit'} className={styles.form_button}>Entrar</button>
    </form>
  )


}

interface LoginCredentials {
  username?: string;
  password?: string;
}
'use client'
import styles from './recover-password.module.css'
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';

export default function RecoverPasswordForm() {
  const router = useRouter();

  const [error, setError] = useState(false);

  const [credentials, setCredentials] = useState<LoginCredentials>();
  const handleChange = ({target: {name, value}}: any) => setCredentials({
    ...credentials,
    [name]: value
  });
  // TODO: Improve this code to handle errors and use the real recover password endpoint
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }
  return (
    <form onSubmit={handleSubmit} className={styles.form_form}>
      <p className={styles.display}>Para recuperar sus datos de acceso,<br/> por favor
        ingrese su correo electrónico<br/> a continuación. </p>

      <label className={styles.form_label} htmlFor="email">Correo Electrónico</label>
      <input name={'email'} onChange={handleChange}
             className={!error ? styles.form_input : styles.form_input_error} type="email"
             id="email" placeholder='Escriba su correo electrónico'/>
      <p className={!error ? styles.form_error : styles.form_error_active}>Contraseña Incorrecta, Verifique sus credenciales.</p>
      <button type={'submit'} className={styles.form_button}>Entrar</button>
    </form>
  )


}

interface LoginCredentials {
  username?: string;
  password?: string;
}
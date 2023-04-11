'use client'
import styles from './registerForm.module.css'
import React, {FormEvent, useState} from "react";
import ModalContext from "@/context/ModalContext";
import {register} from "@/api/Login";
import {useRouter} from "next/navigation";

export default function RegisterForm() {
  // ---------------- State ----------------
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [registerFields, setRegisterFields] = useState<RegisterFields>();
  const [error, setError] = useState<boolean>(false);
  // ---------------------------------------
  // useContext
  const {setOpen} = React.useContext(ModalContext)

  const documentTypes = [
    {
      id: 'CC',
      name: 'Cedula de Ciudadania',
    },
    {
      id: 'PP',
      name: 'Pasaporte',
    },
    {
      id: 'CE',
      name: 'Cedula de Extranjeria',
    },
    {
      id: 'TI',
      name: 'Tarjeta de Identidad',
    },
    {
      id: 'NIT',
      name: 'NIT',
    }]

  const router = useRouter();

  const handleChange = ({target: {name, value}}: any) => setRegisterFields({
    ...registerFields,
    [name]: value
  });
  // TODO: Improve this code to handle errors and use the real login api.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = checkFields()
    setTimeout(async () => {
      if (error) return
      setOpen(true)
      await register({
        name: registerFields!.name,
        lastName: registerFields!.surname,
        documentType: registerFields!.typeDocument,
        email: registerFields!.email,
        password: registerFields!.password,
        document: registerFields!.document,
        phone: registerFields!.phone,
        userName: registerFields!.username,
      }).then((res: { status: number; json: () => any; }) => {
        if (res.status === 200) return res.json()
        else setErrorMessage('Ha ocurrido un error, por favor intente de nuevo')
      }).then(() => {
        router.push('/login')
      }).catch(() => {
        setErrorMessage('Ha ocurrido un error, por favor intente de nuevo')
      })
    }, 5000)
  }


  const checkFields = () => {
    setError(false);
    if (registerFields?.password !== registerFields?.confirmPassword) {
      setError(true);
      setPasswordError(true);
      setErrorMessage('Las contraseñas no coinciden')
      setTimeout(async () => {
        setPasswordError(false)
      }, 5000)
    }
    return error
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_row}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" required onChange={handleChange}
                 placeholder={'Escribe tu nombre'}/>
        </div>
        <div>
          <label htmlFor="surname">Apellido</label>
          <input type="text" name="surname" id="surname" required onChange={handleChange}
                 placeholder={'Escribe tu apellido'}/>
        </div>
        <div>
          <label htmlFor="phone">Telefono</label>
          <input type="text" name="phone" id="phone" required onChange={handleChange}
                 placeholder={'Escribe tu teléfono'}/>
        </div>
      </div>
      <div className={styles.form_row}>
        <div>
          <label htmlFor="typeDocument">Tipo de documento</label>
          <select name="typeDocument" id="typeDocument" onChange={handleChange}>
            {documentTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="document">Documento</label>
          <input type="text" name="document" id="document" required onChange={handleChange}
                 placeholder={'Escribe el número de documento'}/>
        </div>
        <div>
          <label htmlFor="email">Correo</label>
          <input type="email" name="email" id="email" required onChange={handleChange}
                 placeholder={'Escribe tu correo electrónico'}/>
        </div>
      </div>
      <div className={styles.form_row}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" name="username" id="username" required onChange={handleChange}
                 placeholder={'Escribe un nombre de usuario'}/>
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" required onChange={handleChange}
                 placeholder={'Escribe una contraseña'}/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input type="password" name="confirmPassword" id="confirmPassword" required
                 onChange={handleChange} placeholder={'Vuelve a escribir la contraseña'}/>
        </div>
      </div>
      <div className={styles.form_error_container}>
        {passwordError && <p className={styles.form_error}>{errorMessage}</p>}
      </div>
      <div className={styles.form_button}>
        <button type="submit">Registrarse</button>
      </div>
    </form>
  )
}

interface RegisterFields {
  name?: string;
  surname?: string;
  phone?: string;
  typeDocument?: string;
  document?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}
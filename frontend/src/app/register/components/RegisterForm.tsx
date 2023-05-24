'use client'
import styles from './registerForm.module.css'
import React, {FormEvent, useContext, useEffect, useState} from "react";
import ModalContext from "@/context/ModalContext";
import {register} from "@/api/Login";
import {useRouter} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {changeUserRole, getAllUsers} from "@/api/Users";
import {getAllRoles} from "@/api/Roles";
import {getToken} from "@/helpers/helpers";
import ToastContext from "@/context/ToastContext";
import UserContext from "@/context/UserContext";
import ProductContext from "@/context/ProductContext";

export default function RegisterForm({typeForm = 'register', user}: RegisterProps) {
  // ---------------- State ----------------
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [registerFields, setRegisterFields] = useState<RegisterFields>(
    {
      name: '',
      surname: '',
      typeDocument: 'CC',
      document: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: 1
    }
  );
  const [error, setError] = useState<boolean>(false);
  // ---------------------------------------
  // useContext
  const {setOpen} = React.useContext(ModalContext)
  const {setText, setToast} = useContext(ToastContext)
  const {setUser, setRole, userId} = useContext(UserContext)
  const {setRefresh} = useContext(ProductContext)

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

  useEffect(() => {
    if (user) {
      setRegisterFields({
        name: user.name || '',
        surname: user.lastName || '',
        typeDocument: user.documentType || 'CC',
        document: user.id || '',
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
        password: '********',
        confirmPassword: '********',
        role: user?.role || 1
      })
    }
  }, [user])

  const {data: roles} = useQuery(
    'roles',
    () => getAllRoles()
  )

  const {mutate: changeRole} = useMutation(
    (data: { role: number, user: number }) => changeUserRole(data.role, data.user))

  const handleChange = ({target: {name, value}}: any) => setRegisterFields({
    ...registerFields,
    [name]: value
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = typeForm === 'new-user' || typeForm === 'edit-user' ? false : checkFields()
    setTimeout(async () => {
      if (error) return
      if (typeForm !== 'edit-user')
        await register({
          name: registerFields!.name,
          lastName: registerFields!.surname,
          documentType: registerFields!.typeDocument,
          email: registerFields!.email,
          password: registerFields!.password,
          document: registerFields!.document,
          phone: registerFields!.phone,
          userName: registerFields!.username
        }).then((res) => {
          console.log(res)
          if (res.status === 200) return res.json()
          else if (res.status === 400) return manageError(res.status, res.text())
          else manageError(res.status, res.json())
        }).then((res) => {
          console.log(res)
          if (typeForm === 'new-user') {
            // changeRole({role: registerFields!.role || 3, user: res.document})
            setOpen(false)
            setText('Usuario creado correctamente')
            setToast(true)
            router.refresh()
            setRefresh(true)
          } else {
            setUser(registerFields!.name + ' ' + registerFields!.surname)
            setRole('Administrator')
            setOpen(true)
          }
        }).catch((err) => {
          console.log("error")
          console.log(err)
        })
      else {
        // changeRole({role: registerFields!.role || 3, user: userId})
      }
    }, 500)
  }

  // This can be improved.
  const manageError = (code: number, message: string | Promise<any>) => {
    if (typeof message === 'string') {
      setErrorMessage(message)
      setError(true)
      setPasswordError(true)
      setTimeout(async () => {
        setPasswordError(false)
      }, 5000)
    } else {
      message.then((res) => {
          if (!res.message && res.includes('documentType')) {
            setErrorMessage('El tipo de documento no es valido')
            setError(true)
            setPasswordError(true)
            setTimeout(async () => {
              setPasswordError(false)
            }, 5000)
          }
          if (res.message.includes('id_document')) {
            setErrorMessage('El documento ya se encuentra registrado')
            setError(true)
            setPasswordError(true)
            setTimeout(async () => {
              setPasswordError(false)
            }, 5000)
          } else if (res.message.includes('email')) {
            setErrorMessage('El correo ya se encuentra registrado')
            setError(true)
            setPasswordError(true)
            setTimeout(async () => {
              setPasswordError(false)
            }, 5000)
          } else if (res.message.includes('user')) {
            setErrorMessage('El usuario ya se encuentra registrado')
            setError(true)
            setPasswordError(true)
            setTimeout(async () => {
              setPasswordError(false)
            }, 5000)
          }
        }
      )
    }
    throw new Error('Error')
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
                 placeholder={'Escribe tu nombre'} disabled={typeForm === 'edit-user'} value={registerFields.name}/>
        </div>
        <div>
          <label htmlFor="surname">Apellido</label>
          <input type="text" name="surname" id="surname" required onChange={handleChange}
                 placeholder={'Escribe tu apellido'} disabled={typeForm === 'edit-user'} value={registerFields.surname}/>
        </div>
        <div>
          <label htmlFor="phone">Telefono</label>
          <input type="text" name="phone" id="phone" required onChange={handleChange}
                 placeholder={'Escribe tu teléfono'} disabled={typeForm === 'edit-user'} value={registerFields.phone}/>
        </div>
      </div>
      <div className={styles.form_row}>
        <div>
          <label htmlFor="typeDocument">Tipo de documento</label>
          <select name="typeDocument" id="typeDocument" onChange={handleChange} disabled={typeForm === 'edit-user'} value={registerFields.typeDocument}>
            {documentTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="document">Documento</label>
          <input type="text" name="document" id="document" required onChange={handleChange}
                 placeholder={'Escribe el número de documento'} disabled={typeForm === 'edit-user'} value={registerFields.document}/>
        </div>
        <div>
          <label htmlFor="email">Correo</label>
          <input type="email" name="email" id="email" required onChange={handleChange}
                 placeholder={'Escribe tu correo electrónico'} disabled={typeForm === 'edit-user'} value={registerFields.email}/>
        </div>
      </div>
      <div className={styles.form_row}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" name="username" id="username" required onChange={handleChange}
                 placeholder={'Escribe un nombre de usuario'} disabled={typeForm === 'edit-user'} value={registerFields.username}/>
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" required onChange={handleChange}
                 placeholder={'Escribe una contraseña'} disabled={typeForm === 'edit-user'} value={registerFields.password}/>
        </div>
        {typeForm === 'register' ?
          <div>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input type="password" name="confirmPassword" id="confirmPassword" required
                   onChange={handleChange} placeholder={'Vuelve a escribir la contraseña'}/>
          </div> :
          <div>
            <label htmlFor="role">Rol</label>
            <select name="role" id="role" onChange={handleChange} value={registerFields.role}>
              {
                roles?.data.map((role: { id: number; name: string; }) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))
              }
            </select>
          </div>
        }
      </div>
      <div className={styles.form_error_container}>
        {passwordError && <p className={styles.form_error}>{errorMessage}</p>}
      </div>
      <div className={styles.form_button}>
        <button type="submit">{
          typeForm === 'register' ? 'Registrarse' : typeForm === 'new-user' ? 'Crear usuario' : 'Editar usuario'
        }</button>
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
  role?: number;
}

interface RegisterProps {
  typeForm?: 'register' | 'new-user' | 'edit-user';
  user?: any
}
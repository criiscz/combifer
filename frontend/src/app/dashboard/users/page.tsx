"use client"
import Image from "next/image";
import styles from './style.module.css'
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";
import cookie from "universal-cookie";
import {getAllUsers} from "@/api/Users";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import Table from "@/app/dashboard/components/Table/Table";
import UserDetails from "./components/UserDetails/UserDetails";
import {useLoginStatus} from "../../../../hooks/hooks";

export default function SettingsPage() {
  const router = useRouter()
  const cookies = new cookie()


  const {data} = useQuery(
    'user',
    () => getAllUsers(cookies.get('userToken'))
  )

  const {isAdmin} = useLoginStatus()

  const [usersFiltered, setUsersFiltered] = useState(data?.data || [])
  const [userSelected, setUserSelected] = useState<any>(undefined)

  useEffect(() => {
    setUsersFiltered(data?.data || [])
  }, [data])
  const searchUser = (value: string) => {
    if (value.length) {
      if (value.toLowerCase().includes('id:')) {
        const id = parseInt(value.split('id:')[1])
        if (id) {
          const user = data?.data.find((user: any) => user.agent.idDocument === id)
          if (user) {
            setUsersFiltered([user])
          } else {
            setUsersFiltered([])
          }
        }
      } else {
        const users = data?.data.filter((user: any) => {
          return (
            user.agent.name.toLowerCase().includes(value.toLowerCase()) ||
            user.agent.lastName.toLowerCase().includes(value.toLowerCase()) ||
            user.agent.idDocument.toString().toLowerCase().includes(value.toLowerCase())
          )
        })
        if (users) {
          setUsersFiltered(users)
        } else {
          setUsersFiltered([])
        }
      }
    } else {
      setUsersFiltered(data?.data || [])
    }
  }

  const selectUser = (user: any) => {
    console.log(user)
    setUserSelected(user)
  }

  return isAdmin && (
    <div className={styles.container}>
      <section className={styles.header}>
        <SearchBar onSubmit={searchUser} placeholder={'Buscar Usuarios'}/>
        <Button title={'Agregar Usuario'} onClick={() => {
          router.push('/dashboard/users/new-user')
        }}/>
      </section>
      <section className={styles.body}>
        <div className={styles.body__userList}>
          <Table header={['ID', 'Nombre', 'Apellido', 'Rol']}
                 itemsToDisplay={4}
                 items={usersFiltered.map((user: any) => {
                   return {
                     id: user.agent.idDocument,
                     name: user.agent.name,
                     lastName: user.agent.lastName,
                     role: user.user.id,
                     email: user.agent.email,
                     username: user.user.username,
                     documentType: user.agent.documentType,
                     permissions: [1,2,3,5]
                   }
                 })}
                 setItemSelected={selectUser}
          />
        </div>
        <div className={styles.body__userDetails}>
          <UserDetails userSelected={userSelected}/>
        </div>
      </section>
    </div>
  )
}
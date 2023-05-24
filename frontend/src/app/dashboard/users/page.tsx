"use client"
import Image from "next/image";
import styles from './style.module.css'
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";
import cookie from "universal-cookie";
import {getAllUsers} from "@/api/Users";
import {useQuery} from "react-query";
import {useContext, useEffect, useState} from "react";
import Table from "@/app/dashboard/components/Table/Table";
import UserDetails from "./components/UserDetails/UserDetails";
import {useLoginStatus} from "@/hooks/useLoginStatus";
import ModalContext from "@/context/ModalContext";
import ProductContext from "@/context/ProductContext";

export default function SettingsPage() {
  const router = useRouter()
  const cookies = new cookie()
  const { refresh, setRefresh } = useContext(ProductContext)


  const {data, refetch} = useQuery(
    'user',
    () => getAllUsers(cookies.get('userToken'))
  )

  const {isAdmin} = useLoginStatus()
  const {open, setOpen, setId} = useContext(ModalContext)

  const [usersFiltered, setUsersFiltered] = useState(data?.data || [])
  const [userSelected, setUserSelected] = useState<any>(undefined)

  useEffect(() => {
    refetch().then(() => {
      setUsersFiltered(data?.data || [])
    })
    setRefresh(false)
  } , [data?.data, refetch, refresh, setRefresh])

  // useEffect(() => {
  //   setUsersFiltered(data?.data || [])
  //   if (setId) {
  //     setId('create-user')
  //   }
  // }, [data, setId])
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
          if (setId) {
            setId('create-user')
            setOpen(true)
          }
        }}/>
      </section>
      <section className={styles.body}>
        <div className={styles.body__userList}>
          <Table header={['ID', 'Nombre', 'Apellido']} // TODO: Add Role
                 itemsToDisplay={3} // 4 -> Add Role
                 items={usersFiltered.map((user: any) => {
                   return {
                     id: user.agent.idDocument,
                     name: user.agent.name,
                     lastName: user.agent.lastName,
                     role: user.user.id,
                     email: user.agent.email,
                     username: user.user.username,
                     documentType: user.agent.documentType,
                     permissions: [1,2,3,5],
                     phone: user.agent.phone,

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
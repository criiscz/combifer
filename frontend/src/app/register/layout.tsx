'use client'
import styles from './register.module.css'
import LogoLogin from "@/app/login/components/LogoLogin";
import Modal from "@/app/components/Modal/Modal";
import ConfirmDialog from './components/ConfirmDialog';
import {useRouter} from 'next/navigation'
import React, {useEffect} from "react";
import RegisterContext from "@/app/helpers/store";


export default function RegisterLayout({
                                         children,
                                       }: {
  children: React.ReactNode,
}) {

  const router = useRouter()

  // ----- state -----
  const [open, setOpen] = React.useState<boolean>(false)
  const enterDashboard = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <body>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <ConfirmDialog name={"Juan Perez"} role={"Administrador"} onClick={enterDashboard}/>
        </Modal>
      <RegisterContext.Provider value={{open, setOpen}}>
        <section className={styles.registerContainer}>
          <div>
            <LogoLogin width={50} height={50}/>
          </div>
          {children}
        </section>
      </RegisterContext.Provider>
    </body>
  );
}
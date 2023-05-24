'use client'
import styles from './register.module.css'
import LogoLogin from "@/app/login/components/LogoLogin";
import Modal from "@/app/components/Modal/Modal";
import ConfirmDialog from './components/ConfirmDialog';
import {useRouter} from 'next/navigation'
import React, {useContext, useEffect, useMemo} from "react";
import ModalContext from '@/context/ModalContext';
import Cookies from "universal-cookie";
import UserContext from "@/context/UserContext";


export default function RegisterLayout({
                                         children,
                                       }: {
  children: React.ReactNode,
}) {

  const router = useRouter()
  const cookies = useMemo(() => new Cookies(), []);

  // ----- state -----
  const [open, setOpen] = React.useState<boolean>(false)
  const {user, role} = useContext(UserContext)
  const enterDashboard = () => {
    setOpen(false)
    router.push('/login')
  }

  useEffect(() => {
    if (cookies.get('userToken')) router.push('/dashboard')
  }, [router, cookies])

  return (
    <body>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ConfirmDialog name={user} role={role} onClick={enterDashboard}/>
      </Modal>
      <ModalContext.Provider value={{open, setOpen}}>
        <section className={styles.registerContainer}>
          <div>
            <LogoLogin width={50} height={50}/>
          </div>
          {children}
        </section>
      </ModalContext.Provider>
    </body>
  );
}
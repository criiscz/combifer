'use client'
import Login from "@/app/login/page";
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import LogoLogin from "@/app/login/LogoLogin";
import styles from './page.module.css'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    verifyLogin()
  }, [])

  const verifyLogin = () => {
    if (localStorage.getItem('token') !== null) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={styles.logo}>
      <LogoLogin />
    </div>
  )
}

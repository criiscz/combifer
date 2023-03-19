'use client'
import Login from "@/app/login/page";
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import LogoLogin from "@/app/login/components/LogoLogin";
import styles from './page.module.css'
import Cookies from "universal-cookie";

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get('token') !== null) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className={styles.logo}>
      <LogoLogin />
    </div>
  )
}

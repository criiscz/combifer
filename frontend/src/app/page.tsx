'use client'
import {useRouter} from 'next/navigation'
import {useEffect, useMemo} from "react";
import LogoLogin from "@/app/login/components/LogoLogin";
import styles from './page.module.css'
import Cookie from "universal-cookie";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Home() {
  const router = useRouter();
  const cookies = useMemo(() => new Cookie(), [])

  useEffect(() => {
    if (cookies.get('userToken')) router.push('/dashboard')
    else router.push('/login')
  }, [cookies, router])

  return (

    <div className={styles.logo} style={inter.style}>
      <LogoLogin />
    </div>
  )
}

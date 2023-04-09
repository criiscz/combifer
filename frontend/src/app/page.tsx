'use client'
import {useRouter} from 'next/navigation'
import {useEffect} from "react";
import LogoLogin from "@/app/login/components/LogoLogin";
import styles from './page.module.css'
import Cookies from "universal-cookie";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('userToken')) router.push('/dashboard')
    else router.push('/login')
  }, [router])

  return (

    <div className={styles.logo} style={inter.style}>
      <LogoLogin />
    </div>
  )
}

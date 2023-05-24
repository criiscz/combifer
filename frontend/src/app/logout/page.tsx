'use client'
import {useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";

export default function LogoutPage() {

  const router = useRouter()
  const cookies = useMemo(() => new Cookies(), [])
  useEffect(() => {
    console.log('logout')
    cookies.remove('userToken')
    cookies.remove('user')
    cookies.remove('username')
    cookies.remove('role')
    router.push('/')
  }, [cookies, router])

  return (
    <div>
      Saliendo...
    </div>
  )
}
'use client'
import {useEffect, useMemo} from "react";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";

export default function LogoutPage() {

  const router = useRouter()
  const cookies = useMemo(() => new Cookies(), []);
  useEffect(() => {
    cookies.remove('userToken')
    router.push('/')
  }, [cookies, router])

  return (
    <div>
      Saliendo...
    </div>
  )
}
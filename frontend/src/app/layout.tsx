'use client'
import './globals.css'
import React, {useEffect, useMemo, useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";
import UserContext from '@/context/UserContext';

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  const [role, setRole] = useState('')
  const [userDetails, setUserDetails] = useState()
  const [userId, setUserId] = useState(0)
  const [user, setUser] = React.useState('')


  // ------------------ Hooks -------------------
  const cookies = useMemo(() => new Cookies(), []);
  const router = useRouter();
  // ------------------ Effects -----------------
  useEffect(() => {
    if (window.location.pathname === '/register') return
    if (!cookies.get('userToken')) router.push('/login')
  }, [router, cookies])

  const userContext = useMemo(() => ({
    user,
    setUser,
    role,
    setRole,
    setUserId,
    userId,
    userDetails,
    setUserDetails,
  }), [role, user, userDetails, userId])
  // ------------------ Render ------------------
  return (
    <html lang="en">
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={userContext}>
        <body>{children}</body>
      </UserContext.Provider>
    </QueryClientProvider>
    </html>
  )
}

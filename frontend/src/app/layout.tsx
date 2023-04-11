'use client'
import './globals.css'
import React, {useEffect, useMemo} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  // ------------------ Hooks -------------------
  const cookies = useMemo(() => new Cookies(), []);
  const router = useRouter();
  // ------------------ Effects -----------------
  useEffect(() => {
    if (window.location.pathname === '/register') return
    if (!cookies.get('userToken')) router.push('/login')
  }, [router, cookies])
  // ------------------ Render ------------------
  return (
    <html lang="en">
    <QueryClientProvider client={queryClient}>
        <body>{children}</body>
    </QueryClientProvider>
    </html>
  )
}

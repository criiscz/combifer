'use client'
import './globals.css'
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
    <QueryClientProvider client={queryClient}>
        <body>{children}</body>
    </QueryClientProvider>
    </html>
  )
}

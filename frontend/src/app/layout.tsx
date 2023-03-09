'use client'
import './globals.css'
import React from "react";
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>{children}</body>
    </html>
  )
}

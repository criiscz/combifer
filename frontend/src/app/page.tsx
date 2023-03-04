'use client'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from './page.module.css'
import {ChakraProvider} from '@chakra-ui/react'
import Login from './pages/login/components/loginPage/login'


const inter = Inter({subsets: ['latin']})

export default function Home() {

  return (
    <ChakraProvider>
      <Login></Login>
    </ChakraProvider>
)
}

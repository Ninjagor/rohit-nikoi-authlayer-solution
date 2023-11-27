import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })
const source_code_pro = Source_Code_Pro({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Nikoi Authlayer prblmset (rohit)',
  description: 'Rohits solution to the authlayer problem set',
}

import MainNav from './_components/Navbars/MainNav'
import Providers from './_components/Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  )
}

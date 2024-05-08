import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components'
import ReduxProvider from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ReduxProvider>
          <div className="flex bg-green-50 pt-20 min-h-screen">
            <div className="flex max-w-[1440px] mx-auto my-0">{children}</div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}

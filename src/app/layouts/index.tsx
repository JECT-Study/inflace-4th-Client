// 'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { AppSidebar } from '@/widgets/sidebar'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'inflace',
  description: '인플루언서 되기 + 찾기',
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <div className='flex flex-1'>
          <SidebarProvider>
            <AppSidebar />
            <main className='relative flex min-h-screen flex-1 flex-col'>
              <SidebarTrigger />
              <Header />
              <div className='mt-header-height flex-1'>{children}</div>
            </main>
          </SidebarProvider>
        </div>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles'
import { NavigateToLoginButton } from '@/features/navigate-to-login'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'inflace',
  description: '인플루언서 되기 + 찾기',
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='kor'>
      <body className={inter.className}>
        <main className='relative flex min-h-screen flex-1 flex-col'>
          {/* 헤더 */}
          <header className='sticky top-0 z-10 flex h-16.5 shrink-0 items-center border-b bg-background px-4'>
            <div className='ml-4 h-4 w-[1px] bg-border' />
            <div className='ml-4 text-sm font-medium text-muted-foreground'>
              inflace
            </div>
            <NavigateToLoginButton />
          </header>
          {/* 컨텐츠 */}
          <div className='flex-1 p-6'>{children}</div>
        </main>
      </body>
    </html>
  )
}

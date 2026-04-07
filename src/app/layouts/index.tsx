import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../styles'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/shadcn/sidebar'
import { Header, Footer, AppSidebar } from '@/widgets/layout'
import { AuthInitializer } from '@/features/auth'
import { LoginModal } from '@/widgets/auth'
import { OnboardingModal } from '@/widgets/onboarding'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'inflace',
  description: '인플루언서 되기 + 찾기',
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <QueryProvider>
          <AuthInitializer />
          <LoginModal />
          <OnboardingModal />
          <div className='flex flex-1'>
            <SidebarProvider>
              <AppSidebar />
              <main className='relative flex min-h-screen flex-1 flex-col'>
                <SidebarTrigger />
                <Header />
                <div className='flex-1'>{children}</div>
              </main>
            </SidebarProvider>
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}

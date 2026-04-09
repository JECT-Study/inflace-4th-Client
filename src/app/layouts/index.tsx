import type { Metadata } from 'next'
import { Noto_Sans_KR, IBM_Plex_Sans_KR } from 'next/font/google'

import '../styles'
import { MSWProvider } from '@/app/providers/MSWProvider'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/shadcn/sidebar'
import { Header, Footer, AppSidebar } from '@/widgets/layout'
import { AuthInitializer } from '@/features/auth'
import { LoginModal } from '@/widgets/auth'
import { OnboardingModal } from '@/widgets/onboarding'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
})

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm',
})

export const metadata: Metadata = {
  title: 'inflace',
  description: '인플루언서 되기 + 찾기',
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='ko'
      className={`${notoSansKr.variable} ${ibmPlexSansKr.variable}`}>
      <body className='flex min-h-screen flex-col'>
        <MSWProvider>
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
        </MSWProvider>
      </body>
    </html>
  )
}

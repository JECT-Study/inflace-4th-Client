import type { Metadata } from 'next'
import { MyPageLayout } from '@/pages/me'

const title = '마이페이지 | 인플레이스'
const description =
  '무료로 시작해 필요할 때 업그레이드하세요. Free부터 Growth까지, 내 성장 전략에 맞는 단계별 플랜을 선택할 수 있습니다.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: '/og-me.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-me.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MyPageLayout>{children}</MyPageLayout>
}

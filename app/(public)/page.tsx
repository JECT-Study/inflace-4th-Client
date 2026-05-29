import type { Metadata } from 'next'
import { HomePage } from '@/pages/home'

export const metadata: Metadata = {
  title: '인플레이스',
  description: '쉽고 빠르게 인플루언서를 찾고 분석하기 | 인플레이스',
  openGraph: {
    title: '인플레이스',
    description: '쉽고 빠르게 인플루언서를 찾고 분석하기 | 인플레이스',
    images: [{ url: '/og-main.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '인플레이스',
    description: '쉽고 빠르게 인플루언서를 찾고 분석하기 | 인플레이스',
    images: ['/og-main.png'],
  },
}

export default function Page() {
  return <HomePage />
}

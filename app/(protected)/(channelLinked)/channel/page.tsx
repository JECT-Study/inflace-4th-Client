import type { Metadata } from 'next'
import { ChannelPage } from '@/pages/channel'

const title = '내 채널 분석 대시보드 | 인플레이스'
const description =
  '구독자 추이, 참여율, 시청자 분포를 한눈에 분석하고 카테고리 평균 대비 내 채널의 위치를 데이터로 확인하세요.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: '/og-channel-analyze.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-channel-analyze.png'],
  },
}

export default function Page() {
  return <ChannelPage />
}

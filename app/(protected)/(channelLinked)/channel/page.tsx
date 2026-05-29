import type { Metadata } from 'next'
import { ChannelPage } from '@/pages/channel'

const title = '내 채널 영상 분석 대시보드 | 인플레이스'
const description =
  '유튜브 영상별 조회수, 참여율, VPH, Outlier 지수를 분석해 성과 높은 콘텐츠 패턴을 발견하세요.'

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

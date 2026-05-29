import type { Metadata } from 'next'
import { VideoDetailPage } from '@/pages/videoDetail'

export const metadata: Metadata = {
  title: '영상 분석 | 인플레이스',
  openGraph: { title: '영상 분석 | 인플레이스' },
  twitter: { title: '영상 분석 | 인플레이스' },
}

export default function Page() {
  return <VideoDetailPage />
}

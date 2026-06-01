import type { Metadata } from 'next'
import { VideosPage } from '@/pages/videos'

export const metadata: Metadata = {
  title: '영상 분석 대시보드 | 인플레이스',
  openGraph: { title: '영상 분석 대시보드 | 인플레이스' },
  twitter: { title: '영상 분석 대시보드 | 인플레이스' },
}

export default function Page() {
  return <VideosPage />
}

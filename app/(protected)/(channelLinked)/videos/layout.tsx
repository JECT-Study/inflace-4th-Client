import type { Metadata } from 'next'

const description =
  '내 유튜브 영상별 조회수, 참여율, VPH, Outlier 지수를 분석해 성과 높은 콘텐츠 패턴을 발견하세요.'

export const metadata: Metadata = {
  description,
  openGraph: {
    description,
    images: [{ url: '/og-channel-score.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    description,
    images: ['/og-channel-score.png'],
  },
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

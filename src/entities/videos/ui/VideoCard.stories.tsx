import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { mockVideos } from '@/features/videos/mock/mockVideos'
import { VideoCard } from './VideoCard'

const meta = {
  title: 'Entities/Videos/VideoCard',
  component: VideoCard,
  tags: ['autodocs'],
  argTypes: {
    videoId: { control: false },
    thumbnailUrl: { control: 'text', description: '썸네일 이미지 URL' },
    title: { control: 'text', description: '영상 제목' },
    publishedAt: { control: 'text', description: '게시일 (ISO 날짜)' },
    viewCount: { control: 'number', description: '조회수' },
    likeCount: { control: 'number', description: '좋아요 수' },
    commentCount: { control: 'number', description: '댓글 수' },
    vph: { control: 'number', description: 'Views Per Hour' },
    outLierScore: { control: 'number', description: '이상치 점수 (%)' },
  },
} satisfies Meta<typeof VideoCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleVideo = mockVideos.videos[0]

export const Default: Story = {
  args: { ...sampleVideo },
}

export const LongTitle: Story = {
  args: {
    ...sampleVideo,
    title:
      '2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교 2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교',
  },
}

export const HighVph: Story = {
  args: {
    ...sampleVideo,
    vph: 9999,
    outLierScore: 9.9,
  },
}

export const Overview: Story = {
  args: { ...sampleVideo },
  render: () => (
    <div className='grid grid-cols-3 gap-16 p-16'>
      {mockVideos.videos.slice(0, 6).map((video) => (
        <VideoCard key={video.videoId} {...video} />
      ))}
    </div>
  ),
}

import type { BrandCollaborationDto } from '../model/types'

const channelPool: Pick<
  BrandCollaborationDto,
  'channelId' | 'channelName' | 'channelThumbnailUrl'
>[] = [
  {
    channelId: 'UCCG6BEYjfQMGzypJw2EJCDQ',
    channelName: '815머니톡',
    channelThumbnailUrl:
      'https://yt3.ggpht.com/ytc/AIdro_nE7wjv1m8pTETHjXPVDQ2FrUsU6GtTnBSo3qRb8qaTQcc=s88-c-k-c0x00ffffff-no-rj',
  },
  {
    channelId: 'UCAIDepxXCz6cKfxzTYlxaUg',
    channelName: '알짜1분',
    channelThumbnailUrl:
      'https://yt3.ggpht.com/kf_W-VBTUZ0K2KgXpghjiKSurUZlZ8Uw8j3wyXHcA7gX9EC-jmKAXMPP20EXjjySLmeHoY3-JQ=s88-c-k-c0x00ffffff-no-rj',
  },
  {
    channelId: 'UCXmockChannel3',
    channelName: '뷰티풀데이즈',
    channelThumbnailUrl:
      'https://yt3.ggpht.com/ytc/AIdro_nE7wjv1m8pTETHjXPVDQ2FrUsU6GtTnBSo3qRb8qaTQcc=s88-c-k-c0x00ffffff-no-rj',
  },
]

const videoTemplates: Pick<
  BrandCollaborationDto,
  'videoId' | 'videoThumbnailUrl'
>[] = [
  {
    videoId: 'd4veXkvF8fg',
    videoThumbnailUrl: 'https://i.ytimg.com/vi/d4veXkvF8fg/hqdefault.jpg',
  },
  {
    videoId: 'CuXtvqTkjgk',
    videoThumbnailUrl: 'https://i.ytimg.com/vi/CuXtvqTkjgk/hqdefault.jpg',
  },
]

const titleTemplates = [
  '수출 40% 폭증, 미국이 쓸어 담았다… 돈 몰리는 ‘이 주식’ / 낙폭과대주들 언제 터질까?',
  '어딘가 모르게 나이 들어 보인다면? 남자의 무너진 탄력 되살리는 법 #화염파이터',
  '2026 최신 AI 폰 총정리 | 갤럭시 S26 vs 아이폰 17 비교',
  '브랜드 협업 콘텐츠 분석 데모 영상',
  '인플루언서 마케팅 트렌드 리포트',
]

export const mockBrandCollaborations: BrandCollaborationDto[] = Array.from(
  { length: 18 },
  (_, index) => {
    const template = videoTemplates[index % videoTemplates.length]
    const channel = channelPool[index % channelPool.length]
    return {
      ...template,
      videoTitle: `${titleTemplates[index % titleTemplates.length]} (${index + 1})`,
      publishedAt: new Date(2026, 3, 24 - index).toISOString(),
      viewCount: 100000 + index * 12345,
      likeCount: 1000 + index * 87,
      commentCount: 30 + index * 5,
      ...channel,
    }
  }
)

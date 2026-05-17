import { http, HttpResponse } from 'msw'

interface MockBrandCollaboration {
  videoId: string
  videoTitle: string
  videoThumbnailUrl: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  channelId: string
  channelName: string
  channelThumbnailUrl: string
}

const channelPool = [
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

const videoTemplates: Pick<MockBrandCollaboration, 'videoId' | 'videoThumbnailUrl'>[] = [
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

const ALL_MOCK_VIDEOS: MockBrandCollaboration[] = Array.from(
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

const PAGE_SIZE = 9

const mockTrendsKeywords = [
  '부스터 프로',
  '피부관리',
  '메디큐브',
  '광채피부',
  '홈케어',
  '모공관리',
  '리프팅',
  '내돈내산',
  '루틴',
  '전후비교',
  '피부장벽',
  '콜라겐',
  '뷰티디바이스',
]

export const brandCollaborationsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations`,
    ({ request }) => {
      const url = new URL(request.url)
      const cursor = url.searchParams.get('cursor')
      const pageSize =
        Number(url.searchParams.get('pageSize')) || PAGE_SIZE
      const sortCriteria = url.searchParams.get('sortCriteria') ?? 'LATEST'
      const sortOrder = url.searchParams.get('sortOrder') ?? 'DESC'

      /* cursor는 단순히 다음 페이지 인덱스를 문자열로 표현 — 첫 요청은 null */
      const pageIndex = cursor ? Number(cursor) : 0
      const start = pageIndex * pageSize
      const end = start + pageSize
      const slice = ALL_MOCK_VIDEOS.slice(start, end)
      const hasNext = end < ALL_MOCK_VIDEOS.length
      const nextCursor = hasNext ? String(pageIndex + 1) : null

      return HttpResponse.json({
        success: true,
        responseDto: {
          content: slice,
          pageInfo: {
            size: pageSize,
            numberOfElements: slice.length,
            nextCursor,
            hasNext,
          },
          sort: {
            sorted: true,
            sortCriteria,
            sortOrder,
          },
        },
        error: null,
      })
    }
  ),
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations/trends`,
    async ({ request }) => {
      const body = (await request.json()) as { youtubeVideoIds: string[] }
      /* 선택 영상 개수 기반으로 channelCount 결정 — 같은 영상 선택 채널이 있을 수 있어 최대 channelPool 길이로 클램프 */
      const channelCount = Math.min(
        body.youtubeVideoIds.length,
        channelPool.length
      )

      return HttpResponse.json({
        isSuccess: true,
        responseDto: {
          contentKeywords: {
            keywords: mockTrendsKeywords,
            keywordSummary:
              '3개 영상 모두 홈 피부관리 루틴 맥락에서 메디큐브 디바이스를 소개합니다. 특히 "내돈내산"처럼 자발적 구매처럼 보이는 연출이 반복되며, 사용 전·후 피부 비교 장면을 중심으로 제품 효과를 시각적으로 강조하는 구조가 공통적입니다.',
          },
          channelCharacteristics: {
            channelCount,
            avgSubscribers: 620000,
            minSubscribers: 50000,
            maxSubscribers: 3000000,
            uploadIntervalDays: 3.9,
            categoryDistribution: [
              { category: '뷰티/스킨케어', percentage: 71.0 },
              { category: '라이프 스타일', percentage: 18.0 },
              { category: '건강/웰니스', percentage: 11.0 },
            ],
          },
          strategyInsight: {
            pplIntent:
              '메디큐브는 병원 피부과의 홈케어 대체재라는 포지셔닝을 가집니다. 선정된 채널들은 구독자가 이미 피부 고민을 가진 20~30대 여성으로 구성되어 있어, 별도의 타겟팅 없이 높은 구매 의향층에 직접 도달할 수 있는 채널입니다. 특히 재협업 7개 채널은 초기 캠페인에서 전환율이 높았던 채널로, 지속 노출로 브랜드 신뢰도를 쌓는 전략으로 해석됩니다.',
            competitivePoints:
              '"병원 안 가도 되는 홈케어" 메시지가 핵심입니다. 전·후 비교 장면, 수치 기반 효과(콜라겐 200% 등), 크리에이터의 실제 피부 변화 서사를 통해 제품 신뢰를 구축합니다. 광고처럼 보이지 않는 "내돈내산" 연출 전략도 공통적으로 사용됩니다.',
          },
        },
        error: null,
      })
    }
  ),
]

import type { NavGroup } from './types'

export const NAV_ITEMS: NavGroup[] = [
  {
    id: 1,
    group: '내 채널 분석',
    items: [
      {
        title: '채널 분석',
        icon: 'dashboard',
        url: '/channel',
      },
      {
        title: '영상 성과 분석',
        icon: 'video',
        url: '/videos',
        requiredPlan: 'GROWTH',
      },
    ],
  },
  {
    id: 2,
    group: '인플루언서 탐색',
    items: [
      {
        title: '인플루언서 검색',
        icon: 'search',
        url: '/influencer',
      },
      {
        title: '경쟁 채널 분석',
        icon: 'chart',
        url: '',
        requiredPlan: 'GROWTH',
      },
    ],
  },
  {
    id: 3,
    group: '비즈니스 전략',
    items: [
      {
        title: '콘텐츠 전략',
        icon: 'resing',
        url: '',
        requiredPlan: 'GROWTH',
      },
      {
        title: '트렌드 매거진',
        icon: 'article',
        url: '',
        requiredPlan: 'GROWTH',
      },
    ],
  },
  {
    id: 4,
    group: '협업',
    items: [
      {
        title: '협업 매칭',
        icon: 'message',
        url: '',
        requiredPlan: 'GROWTH',
      },
    ],
  },
  {
    id: 5,
    group: '지원',
    items: [{ title: '고객센터', icon: 'question', url: '' }],
  },
]

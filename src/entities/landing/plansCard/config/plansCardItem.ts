import { PlansCardItem } from './types'

export const PLANS_CARD_ITEM: PlansCardItem[] = [
  {
    planName: 'Free',
    price: '기본 분석 무료',
    period: null,
    features: [
      { label: '채널 요약 대시보드', active: false },
      { label: '인플루언서 통합 검색', active: false },
      { label: '매거진 월 2편', active: false },
    ],
    buttonLabel: '무료로 시작',
  },
  {
    planName: 'Starter',
    price: '₩29,000',
    period: ' / 월',
    features: [
      { label: '채널 요약 대시보드', active: false },
      { label: '인플루언서 통합 검색', active: false },
      { label: '매거진 월 2편', active: false },
      { label: '커뮤니케이션 도구', active: true },
    ],
    buttonLabel: '한 달 무료 체험',
  },
  {
    planName: 'Growth',
    price: '₩89,000',
    period: ' / 월',
    features: [
      { label: '채널 요약 대시보드', active: false },
      { label: '인플루언서 통합 검색', active: false },
      { label: '매거진 월 2편', active: false },
      { label: '커뮤니케이션 도구', active: true },
      { label: '가짜 구독자 탐지', active: true },
      { label: '경쟁 채널 분석', active: true },
    ],
    buttonLabel: '한 달 무료 체험',
  },
]

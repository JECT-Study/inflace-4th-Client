// 임팩트 지표 뱃지 점수 계산
export function getImpactTier(score: number): number {
  if (score >= 85) return 0
  if (score >= 60) return 1
  if (score >= 40) return 2
  return 3
}

export interface ImpactItem {
  badge: string
  fanbase: string
  content: string
  activity: string
  ad: string
}

export const IMPACT_ITEM: ImpactItem[] = [
  {
    badge: '최고 (85점+)',
    fanbase: '핵심 팬층',
    content: '바이럴 메이커',
    activity: '활발히 활동 중',
    ad: '협찬 경험 풍부',
  },
  {
    badge: '강함 (60~84)',
    fanbase: '팬층 강함',
    content: '콘텐츠 강함',
    activity: '정기 업로드',
    ad: '광고 적합',
  },

  {
    badge: '보통 (40~59)',
    fanbase: '팬층 보통',
    content: '콘텐츠 보통',
    activity: '활동 보통',
    ad: '광고 보통',
  },

  {
    badge: '주의 (~39)',
    fanbase: '팬층 낮음',
    content: '콘텐츠 저조',
    activity: '활동 저조',
    ad: '광고 주의',
  },
]

// 임팩트 지표 뱃지 점수 계산
export function getImpactTier(score: number): number {
  if (score >= 85) return 0
  if (score >= 60) return 1
  if (score >= 40) return 2
  return 3
}

export interface ImpactItem {
  badge: string
  score: string
}

export const IMPACT_ITEM: ImpactItem[] = [
  {
    badge: '매우 강함',
    score: '80~100점',
  },
  {
    badge: '강함',
    score: '60~80점',
  },
  {
    badge: '보통',
    score: '40~60점',
  },

  {
    badge: '약함',
    score: '20~40점',
  },
  {
    badge: '매우 약함',
    score: '0~20점',
  },
]

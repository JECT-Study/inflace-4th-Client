export const WITHDRAWAL_REASONS = [
  'YOUTUBE_LINK_INCONVENIENT',
  'INSUFFICIENT_ANALYSIS_FEATURES',
  'EXPENSIVE_PLAN',
  'DASHBOARD_DIFFICULT',
  'SWITCHING_TO_OTHER_TOOL',
  'TEMPORARY_USE',
  'OTHER',
] as const

export type WithdrawalReason = (typeof WITHDRAWAL_REASONS)[number]

/* dropdown 표시용 한국어 라벨 — OTHER는 자유 입력 모드 진입 옵션 */
export const WITHDRAWAL_REASON_LABELS: Record<WithdrawalReason, string> = {
  YOUTUBE_LINK_INCONVENIENT: '유튜브 채널 연동이 불편해요',
  INSUFFICIENT_ANALYSIS_FEATURES: '필요한 분석 기능이 부족해요',
  EXPENSIVE_PLAN: '구독 플랜 가격이 부담돼요',
  DASHBOARD_DIFFICULT: '대시보드 사용이 어려워요',
  SWITCHING_TO_OTHER_TOOL: '다른 마케팅/채널 분석 툴로 이동해요',
  TEMPORARY_USE: '일시적으로 사용',
  OTHER: '기타',
}

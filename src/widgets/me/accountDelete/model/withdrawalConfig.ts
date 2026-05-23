export interface DeletionItem {
  title: string
  description: string
}

/* 탈퇴 시 삭제되는 데이터 목록 — 모달 1에 표시 */
export const DELETION_ITEMS: DeletionItem[] = [
  {
    title: '채널 분석 데이터',
    description: '연동된 유튜브 채널의 모든 시계열 분석 이력',
  },
  {
    title: '인플루언서 검색 이력',
    description: '저장된 검색 결과 및 즐겨찾기 목록',
  },
  {
    title: '협업 제안 이력',
    description: '발송·수신된 모든 협업 제안 및 메시지',
  },
  {
    title: '구독 결제 정보',
    description: '등록된 카드 정보 및 결제 내역 (세금계산서 제외)',
  },
  {
    title: '계정 및 개인정보',
    description: '이름, 이메일, 연락처 등 모든 개인 식별 정보',
  },
]

/* 탈퇴 사유 — 모달 2 dropdown 옵션 7개 */
export const WITHDRAWAL_REASONS = [
  '서비스를 자주 사용하지 않아서',
  '원하는 기능이 부족해서',
  '다른 서비스를 이용하기 위해서',
  '사용 방법이 어려워서',
  '비용이 부담돼서',
  '개인정보 보호가 걱정돼서',
  '기타',
] as const

export type WithdrawalReason = (typeof WITHDRAWAL_REASONS)[number]

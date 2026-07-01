/* Google 로그인 사전 안내 팝업 상태 */
export interface GoogleAuthNoticeModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

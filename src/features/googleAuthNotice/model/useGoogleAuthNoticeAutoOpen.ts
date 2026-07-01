'use client'

import { useEffect } from 'react'

import { useGoogleAuthNoticeModal } from './useGoogleAuthNoticeModal'

const SESSION_STORAGE_KEY = 'google-auth-notice-confirmed'

/* '/' 페이지 최초 진입 시 Google 로그인 사전 안내 팝업을 1회 노출한다.
 * 사용자가 팝업을 확인하면 sessionStorage에 기록되어, 같은 세션 내 재방문 시에는 다시 뜨지 않는다.
 * 로그인된 사용자는 /main으로 즉시 리다이렉트되므로 노출 대상에서 제외한다.
 */
export function useGoogleAuthNoticeAutoOpen({
  isReady,
}: {
  isReady: boolean
}) {
  const open = useGoogleAuthNoticeModal((s) => s.open)

  useEffect(() => {
    if (!isReady) return

    const alreadyConfirmed = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!alreadyConfirmed) {
      open()
    }
  }, [isReady, open])
}

export function confirmGoogleAuthNotice() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
}

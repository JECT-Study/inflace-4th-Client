'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useAuthStore } from '@/shared/api'

import { useLoginModal } from './useLoginModal'
import type { PopupOAuthConfig } from './types'

const POPUP_WIDTH = 500
const POPUP_HEIGHT = 600

//구글로 로그인, 유튜브로 로그인 버튼을 눌렀을 때 실행되는 함수
export function usePopupOAuth({ apiPath, popupName }: PopupOAuthConfig) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const popupRef = useRef<Window | null>(null)
  const closeModal = useLoginModal((s) => s.close)

  // app/api/auth/callback으로부터 전달받은 메세지 활용
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      const { type, accessToken, user, error: authError } = event.data

      if (type === 'AUTH_SUCCESS') {
        useAuthStore.getState().setAuth(accessToken, user)
        closeModal()
        setIsLoading(false)
      } else if (type === 'AUTH_ERROR') {
        setError(authError || '로그인에 실패했습니다.')
        setIsLoading(false)
      }
    },
    [closeModal]
  )

  //전달받은 메세지를 표시
  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  //유튜브/구글로 로그인 버튼을 클릭 시 유튜브/구글 로그인 팝업화면을 띄움
  const handleClick = () => {
    setError(null)
    setIsLoading(true)

    const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2
    const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2

    const popup = window.open(
      apiPath,
      popupName,
      `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top}`
    )

    if (!popup) {
      setError('팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.')
      setIsLoading(false)
      return
    }

    popupRef.current = popup

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer)
        setIsLoading(false)
      }
    }, 500)
  }

  return { isLoading, error, handleClick }
}

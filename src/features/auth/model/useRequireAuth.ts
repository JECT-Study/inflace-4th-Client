'use client'

import { useEffect } from 'react'

import { useAuth } from './useAuth'
import { useLoginModal } from './useLoginModal'

//refresh token은 있지만 access token은 아직 없는 엣지 케이스(초기화 중 등)를 대응
export function useRequireAuth() {
  const { isAuthenticated, isInitializing } = useAuth()
  const openModal = useLoginModal((s) => s.open)

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      openModal()
    }
  }, [isInitializing, isAuthenticated, openModal])

  return { isAuthenticated, isInitializing }
}

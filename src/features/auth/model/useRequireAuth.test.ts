import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import { useAuthStore } from '@/shared/api'
import { useLoginModal } from './useLoginModal'
import { useRequireAuth } from './useRequireAuth'

describe('useRequireAuth', () => {
  beforeEach(() => {
    useAuthStore.getState().reset()
    useLoginModal.getState().close()
  })

  it('인증됨 + 초기화 완료 시 모달을 오픈하지 않는다', () => {
    useAuthStore.setState({
      accessToken: 'token',
      user: null,
      isInitializing: false,
    })

    renderHook(() => useRequireAuth())

    expect(useLoginModal.getState().isOpen).toBe(false)
  })

  it('미인증 + 초기화 완료 시 로그인 모달을 오픈한다', async () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: false,
    })

    renderHook(() => useRequireAuth())

    await waitFor(() => {
      expect(useLoginModal.getState().isOpen).toBe(true)
    })
  })

  it('초기화 중일 때 모달을 오픈하지 않는다', () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: true,
    })

    renderHook(() => useRequireAuth())

    expect(useLoginModal.getState().isOpen).toBe(false)
  })

  it('isInitializing이 true → false로 전환 시 미인증이면 모달을 오픈한다', async () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: true,
    })

    renderHook(() => useRequireAuth())
    expect(useLoginModal.getState().isOpen).toBe(false)

    act(() => {
      useAuthStore.getState().setInitializing(false)
    })

    await waitFor(() => {
      expect(useLoginModal.getState().isOpen).toBe(true)
    })
  })
})

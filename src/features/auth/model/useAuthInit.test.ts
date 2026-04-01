import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import { useAuthStore } from '@/shared/api'
import { useAuthInit } from './useAuthInit'

const mockUser = { id: '1', name: 'Test User', email: 'test@test.com', profileImage: '' }

describe('useAuthInit', () => {
  beforeEach(() => {
    useAuthStore.getState().reset()
    useAuthStore.getState().setInitializing(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('마운트 시 /auth/refresh로 POST 요청을 보낸다', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ accessToken: 'token', user: mockUser }), { status: 200 })
    )

    renderHook(() => useAuthInit())

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/auth/refresh', { method: 'POST' })
    })
  })

  it('성공 응답 시 authStore에 accessToken과 user가 저장된다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ accessToken: 'restored-token', user: mockUser }), {
        status: 200,
      })
    )

    renderHook(() => useAuthInit())

    await waitFor(() => {
      expect(useAuthStore.getState().accessToken).toBe('restored-token')
      expect(useAuthStore.getState().user).toEqual(mockUser)
    })
  })

  it('fetch 실패 시 비로그인 상태를 유지한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    renderHook(() => useAuthInit())

    await waitFor(() => {
      expect(useAuthStore.getState().isInitializing).toBe(false)
    })

    expect(useAuthStore.getState().accessToken).toBeNull()
  })

  it('응답이 ok가 아닐 때 비로그인 상태를 유지한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 401 })
    )

    renderHook(() => useAuthInit())

    await waitFor(() => {
      expect(useAuthStore.getState().isInitializing).toBe(false)
    })

    expect(useAuthStore.getState().accessToken).toBeNull()
  })

  it('요청 완료 후 isInitializing이 true에서 false로 전환된다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ accessToken: 'token', user: mockUser }), { status: 200 })
    )

    expect(useAuthStore.getState().isInitializing).toBe(true)

    renderHook(() => useAuthInit())

    await waitFor(() => {
      expect(useAuthStore.getState().isInitializing).toBe(false)
    })
  })
})

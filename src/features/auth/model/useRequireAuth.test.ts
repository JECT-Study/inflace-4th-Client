import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import { useAuthStore } from '@/shared/api'
import { mockAccessToken, mockUser } from '@/shared/api/mock/mockAuth'
import { useRequireAuth } from './useRequireAuth'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

describe('useRequireAuth', () => {
  beforeEach(() => {
    useAuthStore.getState().reset()
    vi.clearAllMocks()
  })

  it('인증됨 + 초기화 완료 시 라우팅하지 않는다', () => {
    useAuthStore.setState({
      accessToken: mockAccessToken,
      user: mockUser,
      isInitializing: false,
    })

    renderHook(() => useRequireAuth())

    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('미인증 + 초기화 완료 시 /?from=protected로 이동한다', async () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: false,
    })

    renderHook(() => useRequireAuth())

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/?from=protected')
    })
  })

  it('초기화 중일 때 라우팅하지 않는다', () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: true,
    })

    renderHook(() => useRequireAuth())

    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('isInitializing이 true → false로 전환 시 미인증이면 /?from=protected로 이동한다', async () => {
    useAuthStore.setState({
      accessToken: null,
      user: null,
      isInitializing: true,
    })

    renderHook(() => useRequireAuth())
    expect(mockReplace).not.toHaveBeenCalled()

    act(() => {
      useAuthStore.getState().setInitializing(false)
    })

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/?from=protected')
    })
  })
})

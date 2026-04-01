import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import axios from 'axios'

/*
 * 모듈 레벨 isRefreshing, failedQueue 변수가 테스트 간 공유되므로
 * vi.resetModules() + 동적 import로 각 테스트를 격리한다.
 */
describe('axiosInstance', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Request interceptor', () => {
    it('AT가 있을 때 Authorization: Bearer 헤더를 주입한다', async () => {
      const { useAuthStore } = await import('./authStore')
      useAuthStore.getState().setAuth('test-access-token', null)

      const { axiosInstance } = await import('./axiosInstance')
      const handlers = (axiosInstance.interceptors.request as any).handlers
      const { fulfilled } = handlers.find((h: any) => h !== null)

      const config = { headers: new axios.AxiosHeaders() }
      const result = await fulfilled(config)

      expect(result.headers.Authorization).toBe('Bearer test-access-token')
    })

    it('AT가 없을 때 Authorization 헤더를 포함하지 않는다', async () => {
      const { useAuthStore } = await import('./authStore')
      useAuthStore.getState().reset()

      const { axiosInstance } = await import('./axiosInstance')
      const handlers = (axiosInstance.interceptors.request as any).handlers
      const { fulfilled } = handlers.find((h: any) => h !== null)

      const config = { headers: new axios.AxiosHeaders() }
      const result = await fulfilled(config)

      expect(result.headers.Authorization).toBeUndefined()
    })
  })

  describe('Response interceptor', () => {
    it('401 이외의 에러는 그대로 reject한다', async () => {
      const { axiosInstance } = await import('./axiosInstance')
      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const error = { response: { status: 500 }, config: { headers: {} } }
      await expect(rejected(error)).rejects.toEqual(error)
    })

    it('이미 _retry된 요청은 다시 retry하지 않는다', async () => {
      const { axiosInstance } = await import('./axiosInstance')
      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const error = {
        response: { status: 401 },
        config: { headers: {}, _retry: true },
      }
      await expect(rejected(error)).rejects.toEqual(error)
    })

    it('401 응답 시 /auth/refresh를 호출한다', async () => {
      const { useAuthStore } = await import('./authStore')
      const { axiosInstance } = await import('./axiosInstance')

      const mockRefreshResponse = {
        data: { accessToken: 'new-token', user: null },
      }
      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce(mockRefreshResponse)
      vi.spyOn(axiosInstance, 'request').mockResolvedValueOnce({ data: 'retried' })

      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const error = {
        response: { status: 401 },
        config: { headers: new axios.AxiosHeaders(), _retry: false },
      }

      await rejected(error)

      expect(axiosPostSpy).toHaveBeenCalledWith('/auth/refresh', null, {
        withCredentials: true,
      })
    })

    it('401 응답 시 refresh 성공 후 새 토큰으로 재시도한다', async () => {
      const { useAuthStore } = await import('./authStore')
      const { axiosInstance } = await import('./axiosInstance')

      const newToken = 'new-access-token'
      vi.spyOn(axios, 'post').mockResolvedValueOnce({
        data: { accessToken: newToken, user: null },
      })
      const retrySpy = vi
        .spyOn(axiosInstance, 'request')
        .mockResolvedValueOnce({ data: 'success' })

      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const error = {
        response: { status: 401 },
        config: { headers: new axios.AxiosHeaders(), _retry: false },
      }

      await rejected(error)

      expect(useAuthStore.getState().accessToken).toBe(newToken)
    })

    it('refresh 실패 시 authStore.reset()을 호출한다', async () => {
      const { useAuthStore } = await import('./authStore')
      useAuthStore.getState().setAuth('old-token', null)

      const { axiosInstance } = await import('./axiosInstance')

      vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('refresh failed'))

      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const error = {
        response: { status: 401 },
        config: { headers: new axios.AxiosHeaders(), _retry: false },
      }

      await expect(rejected(error)).rejects.toThrow()
      expect(useAuthStore.getState().accessToken).toBeNull()
    })

    it('동시 401 요청 시 refresh는 한 번만 호출된다', async () => {
      const { axiosInstance } = await import('./axiosInstance')

      let resolveRefresh!: (val: any) => void
      const refreshPromise = new Promise((res) => {
        resolveRefresh = res
      })

      const axiosPostSpy = vi.spyOn(axios, 'post').mockReturnValueOnce(
        refreshPromise as any
      )
      vi.spyOn(axiosInstance, 'request').mockResolvedValue({ data: 'retried' })

      const handlers = (axiosInstance.interceptors.response as any).handlers
      const { rejected } = handlers.find((h: any) => h !== null)

      const makeError = () => ({
        response: { status: 401 },
        config: { headers: new axios.AxiosHeaders(), _retry: false },
      })

      const p1 = rejected(makeError())
      const p2 = rejected(makeError())

      resolveRefresh({ data: { accessToken: 'shared-token', user: null } })

      await Promise.all([p1, p2])

      expect(axiosPostSpy).toHaveBeenCalledTimes(1)
    })
  })
})

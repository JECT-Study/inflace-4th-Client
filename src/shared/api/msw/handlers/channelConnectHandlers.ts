import { http, HttpResponse } from 'msw'

const STORAGE_KEY = 'mock:channelConnected'

// mock 연동 상태는 새로고침 시 모듈 변수가 초기화되므로 localStorage로 유지
// (node 테스트 환경 등 localStorage가 없으면 항상 미연동으로 동작)
export function isMockChannelConnected() {
  return (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) === 'true'
  )
}

function setMockChannelConnected(connected: boolean) {
  if (typeof localStorage === 'undefined') return
  if (connected) {
    localStorage.setItem(STORAGE_KEY, 'true')
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

const mockChannelConnectResponse = {
  success: true,
  responseDto: {
    channelId: 13,
    youtubeChannelId: 'UCVrJM_cuZGail2SWHZWaZtA',
    updatedAt: '2026-05-04T12:34:56',
  },
  error: null,
}

export const channelConnectHandlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/connect`,
    async () => {
      setMockChannelConnected(true)
      return HttpResponse.json(mockChannelConnectResponse)
    }
  ),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/refresh`,
    async () => {
      return HttpResponse.json(mockChannelConnectResponse)
    }
  ),

  http.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/connect/:channelId`,
    async () => {
      setMockChannelConnected(false)
      return HttpResponse.json({ success: true, responseDto: null, error: null })
    }
  ),
]

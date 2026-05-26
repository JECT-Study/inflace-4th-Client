import { http, HttpResponse } from 'msw'

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
      return HttpResponse.json(mockChannelConnectResponse)
    }
  ),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/channels/:channelId/refresh`,
    async () => {
      return HttpResponse.json(mockChannelConnectResponse)
    }
  ),
]

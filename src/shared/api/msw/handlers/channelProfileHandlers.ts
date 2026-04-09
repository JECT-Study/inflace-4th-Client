import { http, HttpResponse } from 'msw'

import { channelProfileMock } from '@/features/landingAfterLogin/channelProfile/mock/channelProfileMock'

export const channelProfileHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/channels/main`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: channelProfileMock,
      error: null,
    })
  }),
]

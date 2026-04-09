import { http, HttpResponse } from 'msw'

import { mockChannelProfile } from '@/features/landingAfterLogin/channelProfile/mock/mockChannelProfile'

export const channelProfileHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/channels/main`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: mockChannelProfile,
      error: null,
    })
  }),
]

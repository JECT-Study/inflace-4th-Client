import { http, HttpResponse } from 'msw'

export const onboardingHandlers = [
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/onboarding`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: null,
      error: null,
    })
  }),
]

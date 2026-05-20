import { http, HttpResponse } from 'msw'

import { mockMyProfile } from '@/features/me/profile/mock/mockMyProfile'
import type { MyProfileDto } from '@/features/me/profile/types'

let currentProfile: MyProfileDto = { ...mockMyProfile }

export const myProfileHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: currentProfile,
      error: null,
    })
  }),

  http.put(`${process.env.NEXT_PUBLIC_API_URL}/user/preferences`, async ({ request }) => {
    const body = await request.json() as { roles: MyProfileDto['preferences']['roles']; needs: MyProfileDto['preferences']['needs'] }

    currentProfile = {
      ...currentProfile,
      preferences: {
        roles: body.roles,
        needs: body.needs,
      },
    }

    return HttpResponse.json({
      success: true,
      responseDto: currentProfile,
      error: null,
    })
  }),
]

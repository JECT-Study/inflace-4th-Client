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

  http.post(`${process.env.NEXT_PUBLIC_API_URL}/user/profile-image/upload-url`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: {
        uploadUrl: 'https://mock-s3.example.com/upload?signature=mock',
        objectKey: 'profiles/mock-object-key.jpg',
        publicUrl: 'https://mock-s3.example.com/profiles/mock-object-key.jpg',
        expiresInSeconds: 300,
      },
      error: null,
    })
  }),

  http.put(`${process.env.NEXT_PUBLIC_API_URL}/user/profile-image`, async ({ request }) => {
    const body = await request.json() as { objectKey: string }

    currentProfile = {
      ...currentProfile,
      account: {
        ...currentProfile.account,
        profileImageUrl: `https://mock-s3.example.com/${body.objectKey}`,
      },
    }

    return HttpResponse.json({
      success: true,
      responseDto: currentProfile,
      error: null,
    })
  }),
]

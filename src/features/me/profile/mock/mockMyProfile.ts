import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'
import type { MyProfileDto } from '../types'

export const mockMyProfile: MyProfileDto = {
  account: {
    profileImageUrl: mockProfileImage.src,
    name: '김인플',
    email: 'kim@inflace.io',
    enteredAt: '2025-01-10T09:00:00.000Z',
  },
  preferences: {
    roles: ['YOUTUBER'],
    needs: ['CHANNEL_ANALYSIS'],
  },
}

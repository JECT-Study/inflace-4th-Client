import type { MyProfileDto } from '../types'

export const mockMyProfile: MyProfileDto = {
  account: {
    profileImageUrl:
      'https://i.pinimg.com/736x/e2/bc/39/e2bc3977ccf24e3de850deba26cd58b3.jpg',
    name: '민준',
    email: 'minjun.tech@gmail.com',
    enteredAt: '2025-04-10T00:00:00.000Z',
  },
  preferences: {
    roles: ['YOUTUBER'],
    needs: ['CHANNEL_ANALYSIS'],
  },
}

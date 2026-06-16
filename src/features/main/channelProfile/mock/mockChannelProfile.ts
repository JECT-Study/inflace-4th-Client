import type { ChannelProfileDto } from '@/entities/main/channelProfile'

export const mockChannelProfile: ChannelProfileDto = {
  profileImageUrl:
    'https://i.pinimg.com/736x/e2/bc/39/e2bc3977ccf24e3de850deba26cd58b3.jpg',
  name: '민준테크',
  youtubeStudioUrl: 'https://studio.youtube.com/channel/1',
  channelHandle: '@minjun_tech',
  category: ['과학기술'],
  enteredAt: '2025-04-10T00:00:00',
  subscriberCount: 1284,
  videoCount: 86,
  latestUploadDate: '2026-06-08T10:00:00',
}

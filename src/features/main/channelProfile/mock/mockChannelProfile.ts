import type { ChannelProfileDto } from '@/entities/main/channelProfile'
import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'

export const mockChannelProfile: ChannelProfileDto = {
  profileImageUrl: mockProfileImage.src,
  name: '김튜브 스튜디오 김튜브 스튜디오',
  youtubeStudioUrl: 'https://studio.youtube.com/channel/1',
  channelHandle: '@kimtube_studio',
  category: '테크&리뷰',
  enteredAt: '2020-03-15T00:00:00',
  subscriberCount: 285000,
  videoCount: 312,
  latestUploadDate: '2025-02-24T10:00:00',
}

// 임시 데이터
import type { UserStatusData } from './types'
import profileImage from '@/shared/assets/images/mockups/profilepng.png'

export const mockUserFree: UserStatusData = {
  name: '말줄임표를 적용한 닉네임입니다',
  imageUrl: profileImage.src,
  plan: 'starter',
  isChannelConnected: true,
}

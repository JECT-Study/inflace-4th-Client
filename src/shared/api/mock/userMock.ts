import type { AuthUser } from '../types'
import profilePng from '@/shared/assets/mock/profilepng.png'

export const userMock: AuthUser = {
  id: '1',
  profileImage: profilePng.src,
  plan: 'FREE',
  isNewUser: false,
}

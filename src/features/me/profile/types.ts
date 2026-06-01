import type { UserRole, Need } from '@/shared/api/types'

export type { UserRole, Need }

export interface MyProfileAccountDto {
  profileImageUrl: string
  name: string
  email: string
  enteredAt: string
}

export interface MyProfilePreferencesDto {
  roles: UserRole[]
  needs: Need[]
}

export interface MyProfileDto {
  account: MyProfileAccountDto
  preferences: MyProfilePreferencesDto
}

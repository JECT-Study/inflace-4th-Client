'use client'

import IconYoutube from '@/shared/assets/youtube.svg?react'
import { Avatar, AvatarImage, AvatarBadge } from '@/shared/ui/shadcn/avatar'
import { UserAvatarProps } from '../model/types'
import LogoIcon from '@/shared/assets/favicon.svg'
import { useAuthStore } from '@/shared/api'

export const UserIcon = ({ size, showBadge = false }: UserAvatarProps) => {
  const youtubeChannelProfileImage = useAuthStore(
    (state) => state.user?.youtubeChannelProfileImage
  )

  return (
    <Avatar size={size}>
      {youtubeChannelProfileImage ? (
        <AvatarImage src={youtubeChannelProfileImage} />
      ) : (
        <LogoIcon className='size-full rounded-full' />
      )}
      {showBadge && (
        <AvatarBadge>
          <IconYoutube className='size-sm' />
        </AvatarBadge>
      )}
    </Avatar>
  )
}

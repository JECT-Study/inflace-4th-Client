'use client'

import profileImg from '@/shared/assets/mockups/profilepng.png'
import IconYoutube from '@/shared/assets/youtube.svg'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from '@/shared/ui/avatar'

interface UserAvatarProps {
  size?: 'sm' | 'default' | 'lg'
  showBadge?: boolean
}

export const UserAvatar = ({ size, showBadge = false }: UserAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={profileImg.src} />
      {/* 데이터 이미지 없을 시 백그라운드 이미지 */}
      {/* <AvatarFallback>{name[0]}</AvatarFallback> */}
      {showBadge && (
        <AvatarBadge>
          <IconYoutube className='size-sm' />
        </AvatarBadge>
      )}
    </Avatar>
  )
}

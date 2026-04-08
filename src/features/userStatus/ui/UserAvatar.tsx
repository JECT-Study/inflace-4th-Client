'use client'

import profileImg from '@/shared/assets/mock/profilepng.png'
import { userMock } from '@/shared/api/mock/userMock'
import IconYoutube from '@/shared/assets/youtube.svg'
import { Avatar, AvatarImage, AvatarBadge } from '@/shared/ui/shadcn/avatar'
import { UserAvatarProps } from '../model/types'

export const UserAvatar = ({
  size,
  showBadge = false,
  profileImage,
}: UserAvatarProps) => {
  const imageSrc = profileImage ?? userMock.profileImage ?? profileImg.src

  return (
    <Avatar size={size}>
      <AvatarImage src={imageSrc} />
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

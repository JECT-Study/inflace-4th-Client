'use client'

import type { StaticImageData } from 'next/image'
import IconYoutube from '@/shared/assets/icons/iconYoutube.svg'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from '@/shared/ui/avatar'

interface UserAvatarProps {
  src: string | StaticImageData
  name: string
  size?: 'sm' | 'default' | 'lg'
  showBadge?: boolean
}

export const UserAvatar = ({
  src,
  name,
  size = 'default',
  showBadge = false,
}: UserAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={typeof src === 'string' ? src : src.src} alt={name} />
      {/* 데이터 이미지 미연동 시 백그라운드 이미지 */}
      {/* <AvatarFallback>{name[0]}</AvatarFallback> */}
      {showBadge && <AvatarBadge icon={<IconYoutube />} />}
    </Avatar>
  )
}

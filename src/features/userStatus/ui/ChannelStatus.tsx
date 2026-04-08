'use client'

import { Button } from '@/shared/ui/button'
import IconYoutube from '@/shared/assets/youtube-disable.svg'
import { useLoginModal } from '@/features/auth/model/useLoginModal'

export const ChannelStatus = () => {
  const openModal = useLoginModal((s) => s.open)

  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='flex items-center gap-2xs'>
        <div className='flex h-34 w-34 items-center justify-center rounded-full bg-stroke-border-gray-default'>
          <IconYoutube className='size-sm' />
        </div>
        <span className='text-(length:--text-label-sm) font-medium text-text-and-icon-default'>
          채널 미연동
        </span>
      </div>
      <Button
        color='primary'
        style='filled'
        size='xs'
        className='text-(length:--text-label-xs) font-medium'
        onClick={openModal}>
        연동하기
      </Button>
    </div>
  )
}

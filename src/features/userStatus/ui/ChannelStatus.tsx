'use client'

import { Button } from '@/shared/ui/button'
import IconYoutube from '@/shared/assets/icons/iconYoutubeDisable.svg'

interface ChannelStatusProps {
  onConnect?: () => void
}

export const ChannelStatus = ({ onConnect }: ChannelStatusProps) => {
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='flex items-center gap-2xs'>
        <div className='flex h-34 w-34 items-center justify-center rounded-full bg-[#e6e6e6]'>
          <IconYoutube className='size-sm' />
        </div>
        <span className='text-[length:var(--text-label-sm)] font-medium text-[color:var(--color-text-and-icon-default)]'>
          채널 미연동
        </span>
      </div>
      <Button
        color='primary'
        style='filled'
        size='xs'
        className='text-[length:var(--text-label-xs)] font-medium'
        onClick={onConnect}>
        연동하기
      </Button>
    </div>
  )
}

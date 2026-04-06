'use client'

import IconLock from '@/shared/assets/unlock-filled-bold.svg'
import { Button } from '@/shared/ui/button'

export const PlanButton = () => {
  return (
    <>
      <Button
        color='primary'
        style='filled'
        size='xs'
        className='gap-4 text-(length:--text-label-xs)'
        rightIcon={<IconLock className='size-[calc(var(--spacing-12))]' />}>
        플랜 업그레이드
      </Button>
    </>
  )
}

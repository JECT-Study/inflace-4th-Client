'use client'

import IconLock from '@/shared/assets/icons/iconLock.svg'
import { Button } from '@/shared/ui/button'
import type { Plan } from '../model/types'

interface PlanButtonProps {
  plan: Plan
  onClick?: () => void
}

export const PlanButton = ({ plan, onClick }: PlanButtonProps) => {
  const isFree = plan === 'free' || plan === 'starter'
  return (
    <>
      {isFree && (
        <Button
          color='primary'
          style='filled'
          size='xs'
          className='gap-4 text-[12px]'
          onClick={onClick}
          // rightIcon={<IconLock className='size-[calc(var(--spacing-12))]' />}
        >
          플랜 업그레이드
          {/* {isFree && } */}
        </Button>
      )}
    </>
  )
}

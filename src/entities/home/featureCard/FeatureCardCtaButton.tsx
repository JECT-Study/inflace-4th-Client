'use client'

import { Button } from '@/shared/ui/button'
import { useLoginModal } from '@/features/auth'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'

export function FeatureCardCtaButton() {
  const open = useLoginModal((s) => s.open)
  return (
    <Button
      className='float-right mt-3xl'
      color='secondary'
      size='sm'
      variant='filled'
      rightIcon={<IconRightArrow />}
      onClick={open}>
      바로가기
    </Button>
  )
}

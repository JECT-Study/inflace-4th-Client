'use client'

import { Button } from '@/widgets/button'

export function AuthStatusButton() {
  return (
    <Button color='secondary' size='sm' style='filled'>
      <span className='text-label-sm'>로그아웃</span>
    </Button>
  )
}

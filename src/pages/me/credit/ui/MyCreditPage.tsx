'use client'

import { Button } from '@/shared/ui/button'

export function MyCreditPage() {
  return (
    <div className='flex max-h-[60.2rem] max-w-[118.6rem] flex-1 items-center justify-center'>
      <div className='flex h-fit flex-col items-center gap-20'>
        <span className='text-noto-body-md-normal text-text-and-icon-secondary'>
          테스트 결제 페이지입니다.
        </span>
        <Button color='primary' size='lg' variant='filled'>
          결제하기
        </Button>
      </div>
    </div>
  )
}

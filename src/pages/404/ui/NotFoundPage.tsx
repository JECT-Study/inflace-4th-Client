'use client'

import Image from 'next/image'
import NotFoundImage from './404-question-mark.png'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

export function NotFoundPage() {
  const router = useRouter()

  return (
    <div className='flex min-h-screen items-center justify-center bg-background-neutral-default'>
      <div className='flex flex-col items-center gap-40'>
        <Image src={NotFoundImage} alt='404' width={152} height={152} />
        <div className='flex flex-col items-center gap-40'>
          <div className='flex flex-col items-center gap-12'>
            <p className='text-ibm-title-lg-normal text-text-and-icon-primary'>
              죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
            </p>
            <p className='text-noto-body-md-normal text-text-and-icon-secondary'>
              주소가 잘못되었거나 페이지가 이동되었을 수 있어요.
            </p>
          </div>
          <div className='flex items-center justify-center gap-20'>
            <Button
              color='primary'
              size='lg'
              variant='outlined'
              className='w-[18.9rem]'
              onClick={() => router.back()}>
              이전 페이지로
            </Button>
            <Button
              color='primary'
              size='lg'
              variant='filled'
              className='w-[18.9rem]'
              onClick={() => router.push('/')}>
              홈으로 이동
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

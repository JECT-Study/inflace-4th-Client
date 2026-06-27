'use client'

import Image from 'next/image'
import ImageError from '@/shared/assets/errorPageImage.jpg'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

export function MyCreditFailPage() {
  const router = useRouter()

  return (
    <div className='absolute top-[20rem] left-1/2 -translate-x-1/2'>
      <div className='flex flex-col items-center gap-40'>
        <Image src={ImageError} alt='결제 오류' width={152} height={152} />
        <div className='flex flex-col items-center gap-12'>
          <p className='text-ibm-title-lg-normal text-text-and-icon-primary'>
            결제를 완료하지 못했어요
          </p>
          <p className='text-noto-body-md-normal text-text-and-icon-secondary'>
            카드 한도, 잔액, 결제 수단 정보를 확인한 뒤 다시 시도해주세요.
          </p>
        </div>
        <div className='flex w-full justify-between'>
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
            onClick={() => {
              router.push('/')
            }}>
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  )
}

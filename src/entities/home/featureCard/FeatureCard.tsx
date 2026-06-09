'use client'

import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { useLoginModal } from '@/features/auth'
import { FeatureCardItem } from '@/entities/home/featureCard/config/types'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'

export function FeatureCard({
  icon: Icon,
  title,
  description,
  imgSrc,
}: FeatureCardItem) {
  const open = useLoginModal((s) => s.open)
  return (
    <div className='rounded-12 border border-stroke-border-neutral-default bg-background-gray-default p-32 py-40'>
      <div className='flex flex-col gap-24'>
        <h4 className='flex items-center gap-8 text-ibm-title-lg-normal text-brand-primary'>
          <Icon className='size-26' />
          {title}
        </h4>
        <p className='text-noto-body-md-normal text-text-and-icon-primary'>
          {description}
        </p>
        <div className='min-h-0 w-full'>
          <Image
            src={imgSrc}
            alt={title}
            className='h-auto w-full max-w-full object-cover'
          />
        </div>
      </div>
      <Button
        className='float-right mt-3xl'
        color='secondary'
        size={'sm'}
        variant='filled'
        rightIcon={<IconRightArrow />}
        onClick={open}>
        바로가기
      </Button>
    </div>
  )
}

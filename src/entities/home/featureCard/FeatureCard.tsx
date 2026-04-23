import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { FeatureCardItem } from '@/entities/home/featureCard/config/types'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import IconZap from '@/shared/assets/zap-bold.svg'

export function FeatureCard({
  title,
  subTitle,
  description,
  imgSrc,
  url,
}: FeatureCardItem) {
  const router = useRouter()
  return (
    <>
      <div className='bd-[var(--color-stroke-border-primary)] rounded-12--color-background-gray-default)] px-(--spacing-xl)var(--spacing-2xl)]'>
        <h4 className='flex items-center gap-8 text-title-lg font-semibold text-brand-primary [&_path]:fill-brand-primary'>
          <IconZap className='size-26' />
          {title}
        </h4>
        <h5 className='mt-(--spacing-2xl) text-(length:--text-title-sm) font-medium'>
          {subTitle}
        </h5>
        <p className='mt-(--spacing-xs) text-(length:--text-body-sm) font-normal'>
          {description}
        </p>
        <div className='mt-(--spacing-xl) h-58 w-full overflow-hidden rounded-8'>
          <Image
            src={imgSrc}
            alt={title}
            className='h-auto w-full max-w-full object-cover'
          />
        </div>
        <Button
          className='float-right mt-(--spacing-xl) cursor-pointer'
          color='secondary'
          size={'sm'}
          variant='filled'
          rightIcon={<IconRightArrow />}
          onClick={() => router.push(url)}>
          바로가기
        </Button>
      </div>
    </>
  )
}

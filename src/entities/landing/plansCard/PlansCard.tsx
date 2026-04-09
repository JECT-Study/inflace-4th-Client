import { Button } from '@/shared/ui/button'
import { PlansCardItem } from '@/entities/landing/plansCard/config/types'

import IconCheck from '@/shared/assets/check-bold.svg'

export function PlansCard({
  planName,
  price,
  period,
  features,
  buttonLabel,
}: PlansCardItem) {
  return (
    <>
      <div className='flex min-h-120 flex-col justify-between rounded-12 border border-stroke-border-neutral-default bg-background-gray-default p-32 md:last:col-span-2 lg:last:col-span-1'>
        <div className='felx h-fit w-full flex-col gap-32'>
          <div className='flex h-fit w-full flex-col gap-12'>
            {/* 플랜 이름 ex. Free  */}
            <span className='= text-ibm-title-lg-normal text-text-and-icon-default'>
              {planName}
            </span>

            {/* 가격 / 월 ex. 기본 분석 무료 */}
            <div className='flex size-fit items-center gap-4'>
              <h5 className='text-ibm-heading-lg-normal text-text-and-icon-default'>
                {price}
              </h5>
              {period && (
                <span className='text-noto-body-xs-bold text-text-and-icon-secondary'>
                  / 월
                </span>
              )}
            </div>
          </div>

          {/* 플랜 기능 설명 */}
          <ul className='flex h-fit w-full flex-col gap-8'>
            {features.map((item, idx) => (
              <li
                key={idx}
                className={`flex h-fit w-full items-center gap-6 ${item.active ? 'text-noto-body-md-bold text-brand-primary' : 'text-noto-body-md-normal text-text-and-icon-default'}`}>
                <IconCheck className='size-3.75' /> {item.label}
              </li>
            ))}
          </ul>
        </div>

        <Button
          className='h-fit w-full gap-10 rounded-6 px-20 py-10'
          color={`${planName == 'Growth' ? 'primary' : 'secondary'}`}
          variant={'filled'}>
          {buttonLabel}
        </Button>
      </div>
    </>
  )
}

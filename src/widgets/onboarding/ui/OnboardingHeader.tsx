'use client'

import { DialogHeader } from '@/shared/ui/shadcn/dialog'
import { useOnboardingModal } from '@/features/onboarding'

export function OnboardingHeader() {
  const { step } = useOnboardingModal()
  return (
    <>
      <DialogHeader>
        <div className='relative h-8 w-full rounded-full bg-stroke-border-primary'>
          <span
            className='absolute top-0 left-0 h-full rounded-full bg-brand-primary transition-[width] duration-300 ease-in-out'
            style={{ width: `calc(100% / 4 * ${step})` }}></span>
        </div>
        <div className='mt-sm'>
          <p className='text-ibm-title-lg-normal text-brand-primary'>
            {step}
            <span className='text-text-and-icon-disabled'>/4</span>
            <b className='ml-2xs'>
              {step <= 2
                ? '프로필 설정'
                : step == 3
                  ? '기능 소개'
                  : '인플레이스 시작하기'}
            </b>
          </p>
          {step <= 2 && (
            <p className='mt-4 text-noto-caption-md-normal text-text-and-icon-tertiary'>
              마이페이지에서 변경할 수 있어요
            </p>
          )}
        </div>
      </DialogHeader>
    </>
  )
}

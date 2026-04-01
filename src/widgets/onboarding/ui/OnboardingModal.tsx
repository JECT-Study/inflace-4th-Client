'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import {
  OnboardingStep1,
  OnboardingStep2,
  useOnboardingModal,
} from '@/features/onboarding'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/shared/ui/button'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import IconLeftArrow from '@/shared/assets/leftwards-arrow-bold.svg'

const STEPS: Record<number, React.ReactNode> = {
  1: <OnboardingStep1 />,
  2: <OnboardingStep2 />,
}

export function OnboardingModal() {
  const { step, nextStep, prevStep, selections } = useOnboardingModal()

  const isOpen = useOnboardingModal((s) => s.isOpen)
  const close = useOnboardingModal((s) => s.close)
  const sel = selections[step]
  const hasSelection = Array.isArray(sel) ? sel.length > 0 : !!sel
  const isPrevDisabled = step <= 1
  const isNextDisabled = step >= 4 || !hasSelection

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        className='flex h-[544px] w-[1000px] !max-w-[1000px] flex-col rounded-[var(--radius-16)] bg-white p-[80px]'>
        <VisuallyHidden>
          <DialogTitle>프로필 설정</DialogTitle>
        </VisuallyHidden>
        <DialogHeader>
          <div className='relative h-[var(--spacing-8)] w-full rounded-full bg-[var(--color-stroke-border-primary)]'>
            <span
              className='absolute top-0 left-0 h-full rounded-full bg-[var(--color-brand-primary)] transition-[width] duration-300 ease-in-out'
              style={{ width: `calc(100% / 4 * ${step})` }}></span>
          </div>
          <div className='mt-[var(--spacing-sm)]'>
            <p className='text-[length:var(--text-title-lg)] leading-[var(--leading-title-lg)] font-semibold text-[var(--color-brand-primary)]'>
              {step}
              <span className='text-[var(--color-text-and-icon-disabled)]'>
                /4
              </span>
              <b className='ml-[var(--spacing-2xs)]'>프로필 설정</b>
            </p>
            <p className='mt-[var(--spacing-4)] text-[length:var(--text-label-xs)] leading-[var(--leading-label-xs)] font-normal text-[var(--color-text-and-icon-tertiary)]'>
              마이페이지에서 변경할 수 있어요
            </p>
          </div>
        </DialogHeader>
        <div className='mt-[var(--spacing-xl)]'>{STEPS[step]}</div>
        <DialogFooter className='m-0 mt-auto flex w-full justify-between border-0 bg-transparent p-0 sm:justify-between'>
          <Button
            color={'gray'}
            size={'lg'}
            style={'filled'}
            leftIcon={<IconLeftArrow />}
            disabled={isPrevDisabled}
            onClick={prevStep}>
            이전으로
          </Button>
          <Button
            color={'primary'}
            size={'lg'}
            style={'filled'}
            rightIcon={<IconRightArrow />}
            disabled={isNextDisabled}
            onClick={nextStep}>
            다음으로
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

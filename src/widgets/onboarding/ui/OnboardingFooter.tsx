'use client'

import { DialogFooter } from '@/shared/ui/shadcn/dialog'
import { useOnboardingModal } from '@/features/onboarding'
import { Button } from '@/shared/ui/button'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import IconLeftArrow from '@/shared/assets/leftwards-arrow-bold.svg'
import { OnboardingActionButtons } from '@/features/onboarding'

export function OnboardingFooter() {
  const { step, prevStep, nextStep, selections } = useOnboardingModal()
  const sel = selections[step]
  const hasSelection = Array.isArray(sel) ? sel.length > 0 : !!sel
  const isPrevDisabled = step <= 1
  const isNextDisabled = step > 4 || (step <= 2 && !hasSelection)

  return (
    <>
      <DialogFooter
        className={`absolute right-0 bottom-0 m-0 flex w-full justify-between border-0 bg-transparent p-0 sm:justify-between ${step > 2 ? 'w-92' : 'w-full'}`}>
        {step <= 3 ? (
          <>
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
          </>
        ) : (
          <OnboardingActionButtons />
        )}
      </DialogFooter>
    </>
  )
}

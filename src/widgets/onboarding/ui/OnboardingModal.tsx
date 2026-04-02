'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import {
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  useOnboardingModal,
} from '@/features/onboarding'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { OnboardingHeader } from './OnboardingHeader'
import { OnboardingFooter } from './OnboardingFooter'

const STEPS: Record<number, React.ReactNode> = {
  1: <OnboardingStep1 />,
  2: <OnboardingStep2 />,
  3: <OnboardingStep3 />,
  4: <OnboardingStep4 />,
}

export function OnboardingModal() {
  const { step } = useOnboardingModal()

  const isOpen = useOnboardingModal((s) => s.isOpen)
  const close = useOnboardingModal((s) => s.close)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogOverlay className='bg-background-dim-default' />
      <DialogContent
        showCloseButton={false}
        className={`flex h-136 w-250 max-w-250! flex-col overflow-hidden rounded-16 bg-white p-80 ${
          step >= 3
            ? 'after:absolute after:top-0 after:right-0 after:h-full after:w-1/2 after:bg-background-gray-default after:content-[""]'
            : ''
        }`}>
        <div className='relative z-10 h-full'>
          <VisuallyHidden>
            <DialogTitle>프로필 설정</DialogTitle>
          </VisuallyHidden>
          <OnboardingHeader />
          <div className='mt-xl'>{STEPS[step]}</div>
          <OnboardingFooter />
        </div>
      </DialogContent>
    </Dialog>
  )
}

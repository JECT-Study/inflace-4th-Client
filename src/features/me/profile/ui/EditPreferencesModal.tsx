'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/shared/ui/button'
import { RoleSelect } from '@/shared/ui/role-select'
import { NeedSelect } from '@/shared/ui/need-select'
import IconLeftArrow from '@/shared/assets/leftwards-arrow-bold.svg'
import IconRightArrow from '@/shared/assets/rightwards-arrow-bold.svg'
import { useEditPreferencesModal } from '../model/useEditPreferencesModal'
import { useEditPreferences } from '../model/useEditPreferences'

export function EditPreferencesModal() {
  const {
    isOpen,
    step,
    roles,
    needs,
    close,
    nextStep,
    prevStep,
    setRoles,
    setNeeds,
  } = useEditPreferencesModal()
  const { mutate: savePreferences, isPending } = useEditPreferences()

  const hasRoles = roles.length > 0
  const hasNeeds = needs.length > 0

  const handleSave = () => {
    savePreferences({ roles, needs }, { onSuccess: close })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      {/* 뒷 배경 흐림 처리 */}
      <DialogOverlay className='bg-background-dim-default' />
      <DialogContent
        showCloseButton={false}
        className='flex h-fit w-[100rem] max-w-none flex-col gap-32 overflow-hidden rounded-16 bg-white p-[8rem] sm:max-w-none'>
        <VisuallyHidden>
          <DialogTitle>선호도 변경</DialogTitle>
        </VisuallyHidden>

        <div className='flex h-fit w-full'>
          {step === 1 ? (
            <RoleSelect value={roles} onChange={setRoles} />
          ) : (
            <NeedSelect value={needs} onChange={setNeeds} />
          )}
        </div>

        <div className='flex w-full justify-between'>
          {/* 첫번째 페이지에서는 랜더링 되지 않음 */}
          {step === 2 ? (
            <Button
              color='gray'
              size='lg'
              variant='filled'
              leftIcon={<IconLeftArrow />}
              onClick={prevStep}>
              이전으로
            </Button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <Button
              color='primary'
              size='lg'
              variant='filled'
              rightIcon={<IconRightArrow />}
              disabled={!hasRoles}
              onClick={nextStep}>
              다음으로
            </Button>
          ) : (
            <Button
              color='primary'
              size='lg'
              variant='filled'
              disabled={!hasNeeds || isPending}
              onClick={handleSave}>
              저장하기
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

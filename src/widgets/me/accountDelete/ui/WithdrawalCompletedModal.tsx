'use client'

import { Button } from '@/shared/ui/button'

import { ModalShell } from './ModalShell'

interface WithdrawalCompletedModalProps {
  open: boolean
  onGoHome: () => void
}

/* 모달 3 — 탈퇴 완료 안내 */
export function WithdrawalCompletedModal({
  open,
  onGoHome,
}: WithdrawalCompletedModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onGoHome}
      ariaLabelledBy='withdrawal-completed-title'
      className='flex w-[341px] flex-col items-center gap-32'>
      <div className='flex flex-col gap-4'>
        <h2
          id='withdrawal-completed-title'
          className='text-ibm-title-lg-normal text-text-and-icon-default'>
          탈퇴 처리가 완료되었습니다.
        </h2>
        <p className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
          지금까지 인플레이스를 이용해주셔서 감사합니다.
        </p>
      </div>
      <Button
        type='button'
        color='secondary'
        variant='outlined'
        size='lg'
        onClick={onGoHome}>
        홈으로 이동하기
      </Button>
    </ModalShell>
  )
}

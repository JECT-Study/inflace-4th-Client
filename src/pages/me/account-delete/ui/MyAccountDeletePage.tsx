'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui/button'
import IconArrowLeft from '@/shared/assets/leftwards-arrow-bold.svg'
import {
  AccountDeleteModalFlow,
  AccountDeleteNoticeCard,
  LinkedChannelsForDeleteCard,
  type WithdrawalReason,
} from '@/widgets/me/accountDelete'

export function MyAccountDeletePage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function handleSubmitReason(reason: WithdrawalReason, customReason?: string) {
    /* TODO: 탈퇴 API 연동 — '기타' 선택 시 customReason을 함께 전달 */
    void reason
    void customReason
  }

  function handleComplete() {
    /* TODO: 로그아웃 + 인증 상태 클리어 */
    setOpen(false)
    router.push('/')
  }

  return (
    <div className='flex h-fit w-full flex-col gap-24 p-24'>
      <button
        type='button'
        onClick={() => router.back()}
        className='flex w-fit cursor-pointer items-center gap-8 text-ibm-title-lg-normal text-text-and-icon-default'>
        <IconArrowLeft className='size-24' />
        계정 탈퇴
      </button>

      <AccountDeleteNoticeCard />
      <LinkedChannelsForDeleteCard />

      <div className='flex justify-end'>
        <Button
          type='button'
          color='gray'
          variant='filled'
          size='sm'
          onClick={() => setOpen(true)}>
          계정 탈퇴하기
        </Button>
      </div>

      <AccountDeleteModalFlow
        open={open}
        onClose={() => setOpen(false)}
        onComplete={handleComplete}
        onSubmitReason={handleSubmitReason}
      />
    </div>
  )
}

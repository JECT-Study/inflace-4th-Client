'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui/button'
import IconArrowLeft from '@/shared/assets/leftwards-arrow-bold.svg'
import {
  AccountDeleteModalFlow,
  AccountDeleteNoticeCard,
} from '@/widgets/me/accountDelete'
import { LinkedChannelsForDeleteCard } from '@/widgets/me/linkedChannels'
import { useAuth } from '@/features/auth'
import { useDeleteUser, type WithdrawalReason } from '@/features/me'

export function MyAccountDeletePage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()
  const { mutateAsync: deleteUser } = useDeleteUser()

  async function handleSubmitReason(
    reason: WithdrawalReason,
    customReason?: string
  ) {
    await deleteUser({
      reason,
      detail: reason === 'OTHER' ? customReason : undefined,
    })
  }

  /* 탈퇴 완료 — 클라이언트 인증 상태 초기화 + refreshToken 쿠키 삭제 후 홈으로 이동 */
  async function handleComplete() {
    setOpen(false)
    await logout()
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

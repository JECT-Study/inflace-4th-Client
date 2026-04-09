'use client'

import { Button } from '@/shared/ui/button'

import { useAuth } from '../model/useAuth'
import { useLoginModal } from '../model/useLoginModal'
import { UserAvatar } from '@/features/userStatus/ui/UserAvatar'

/*
 * 로그인 여부에 따라 달라지는 버튼
 * 비로그인 시 '로그인'
 * 로그인 시 '로그아웃' 표시
 */
export function LoginButton() {
  const { isAuthenticated, isInitializing, logout, user } = useAuth()
  const openModal = useLoginModal((s) => s.open)

  if (isInitializing) {
    return (
      <Button color='gray' size='sm' variant='filled' disabled>
        <span className='text-label-sm'>로딩중...</span>
      </Button>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        <Button color='secondary' size='sm' variant='filled' onClick={logout}>
          <span className='text-label-sm'>로그아웃</span>
        </Button>
        <UserAvatar size={'sm'} showBadge={false} profileImage={user?.profileImage} />
      </>
    )
  }

  return (
    <Button color='secondary' size='sm' variant='filled' onClick={openModal}>
      <span className='text-label-sm'>로그인</span>
    </Button>
  )
}

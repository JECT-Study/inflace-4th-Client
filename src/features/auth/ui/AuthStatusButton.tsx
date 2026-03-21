'use client'

import { Button } from '@/shared/ui/button'

export function AuthStatusButton() {
  const session = true //[D]: false -> 로그인/회원가입  / true -> 로그아웃

  //   const { data: session } = useSession()

  return (
    // <Button color='secondary' size='sm' style='filled' onClick={handleOpenModal}>
    <Button color='secondary' size='sm' style='filled'>
      <span className='text-label-sm'>
        {session ? '로그아웃' : '로그인/회원가입'}
      </span>
    </Button>
  )
}

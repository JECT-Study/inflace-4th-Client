'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/widgets/button'
import SearchIcon from '@/shared/assets/search-bold.svg'

export function NavigateToLoginButton() {
  const router = useRouter()

  return (
    <>
      <Button
        color='primary'
        size='lg'
        style='filled'
        leftIcon={<SearchIcon />}
        onClick={() => router.push('/login')}>
        레이블
      </Button>
    </>
  )
}

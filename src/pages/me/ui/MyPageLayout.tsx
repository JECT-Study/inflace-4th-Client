'use client'

import { useEffect } from 'react'
import { MyPageSidebar } from '@/features/me'
import { useSidebarStore } from '@/shared/api'

type Props = {
  children: React.ReactNode
}

export function MyPageLayout({ children }: Props) {
  const setOpen = useSidebarStore((state) => state.setOpen)

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div className='flex size-full bg-background-gray-default'>
      <MyPageSidebar />
      {children}
    </div>
  )
}

'use client'

import { useEffect } from 'react'

import { useSidebarStore } from '@/widgets/layout/sidebar'

export function ErrorPageLayout({ children }: { children: React.ReactNode }) {
  const setOpen = useSidebarStore((state) => state.setOpen)

  useEffect(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <div className='relative min-h-screen bg-primitive-brand-vivid-75'>
      {children}
    </div>
  )
}

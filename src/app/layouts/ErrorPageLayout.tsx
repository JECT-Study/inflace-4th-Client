'use client'

import { useEffect, useRef } from 'react'

import { useSidebarStore } from '@/widgets/layout/sidebar'

export function ErrorPageLayout({ children }: { children: React.ReactNode }) {
  const open = useSidebarStore((state) => state.open)
  const setOpen = useSidebarStore((state) => state.setOpen)
  const previousOpenRef = useRef(open)

  useEffect(() => {
    const previousOpen = previousOpenRef.current
    setOpen(true)
    return () => {
      setOpen(previousOpen)
    }
  }, [setOpen])

  return (
    <div className='relative min-h-screen bg-primitive-brand-vivid-75'>
      {children}
    </div>
  )
}

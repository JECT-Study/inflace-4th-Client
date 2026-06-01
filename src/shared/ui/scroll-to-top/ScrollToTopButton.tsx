'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/shared/lib/utils'
import IconLeftwardsArrow from '@/shared/assets/leftwards-arrow-bold.svg'

interface ScrollToTopButtonProps {
  /* 표시 시작 스크롤 위치 (px). 기본 400 */
  threshold?: number
  className?: string
}

export function ScrollToTopButton({
  threshold = 400,
  className,
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > threshold)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='맨 위로 스크롤'
      className={cn(
        'fixed right-32 bottom-32 z-40 flex size-56 cursor-pointer items-center justify-center rounded-full bg-brand-secondary text-white shadow-lg transition-opacity hover:opacity-90',
        className
      )}>
      <IconLeftwardsArrow className='size-24 rotate-90' />
    </button>
  )
}

'use client'

import { useEffect } from 'react'
import { cn } from '@/shared/lib/utils'

interface ModalShellProps {
  open: boolean
  onClose: () => void
  className?: string
  ariaLabelledBy?: string
  children: React.ReactNode
}

/**
 * 계정 탈퇴 흐름 모달들의 공통 셸
 * - dim 클릭 / ESC 키로 닫기
 * - body scroll lock
 * - 디자인의 rounded-16 + bg-white + p-40 + 가운데 정렬
 */
export function ModalShell({
  open,
  onClose,
  className,
  ariaLabelledBy,
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!open) return
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby={ariaLabelledBy}
      className='fixed inset-0 z-50 flex items-center justify-center'>
      <button
        type='button'
        aria-label='닫기'
        onClick={onClose}
        className='absolute inset-0 cursor-default bg-black/10 backdrop-blur-xs'
      />
      <div
        className={cn(
          'relative z-10 max-h-[calc(100vh-32px)] overflow-y-auto rounded-16 bg-white p-40 shadow-[0_8px_24px_0_rgba(0,0,0,0.12)]',
          className
        )}>
        {children}
      </div>
    </div>
  )
}

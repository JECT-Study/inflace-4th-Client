'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/shared/lib/utils'

interface ModalShellProps {
  open: boolean
  onClose: () => void
  className?: string
  ariaLabelledBy?: string
  children: React.ReactNode
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * 계정 탈퇴 흐름 모달들의 공통 셸
 * - dim 클릭 / ESC 키로 닫기
 * - body scroll lock
 * - 포커스 트랩: 열릴 때 패널로 포커스 이동, Tab 순환, 닫힐 때 원래 위치 복원
 * - 디자인의 rounded-16 + bg-white + p-40 + 가운데 정렬
 */
export function ModalShell({
  open,
  onClose,
  className,
  ariaLabelledBy,
  children,
}: ModalShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousActive = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      previousActive?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={dialogRef}
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
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative z-10 max-h-[calc(100vh-32px)] overflow-y-auto rounded-16 bg-white p-40 outline-none',
          'shadow-[0_8px_24px_0_rgba(0,0,0,0.12)]',
          className
        )}>
        {children}
      </div>
    </div>
  )
}

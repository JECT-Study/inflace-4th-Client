import { useState, useRef, useEffect } from 'react'

import { cn } from '@/shared/lib/utils'
import IconUp from '@/shared/assets/up-bold.svg'

type DropdownTriggerProps = {
  label: string
  output: string
  children?: (onClose: () => void) => React.ReactNode
}

function DropdownTrigger({ label, output, children }: DropdownTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => children && setIsOpen((prev) => !prev)}
        className={cn(
          'flex size-fit cursor-pointer items-center gap-12 rounded-10 bg-white p-12',
          isOpen && 'bg-brand-secondary'
        )}>
        {/* 필터링 기준 */}
        <span
          className={cn(
            'text-noto-label-sm-bold text-text-and-icon-primary',
            isOpen && 'text-white'
          )}>
          {label}:
        </span>
        {/* 결과값 */}
        <span
          className={cn(
            'max-w-[8rem] truncate text-noto-label-sm-normal text-text-and-icon-tertiary',
            isOpen && 'text-white'
          )}>
          {output}
        </span>
        {/* 화살표 */}
        <span
          className={cn(
            'flex shrink-0 items-center justify-center transition-transform [&>svg]:h-full [&>svg]:w-full [&>svg_*]:fill-current',
            isOpen && 'text-white',
            !isOpen && 'rotate-180'
          )}>
          <IconUp />
        </span>
      </button>

      {isOpen && children && (
        <div className='absolute top-full left-0 z-10 mt-8'>
          {children(() => setIsOpen(false))}
        </div>
      )}
    </div>
  )
}

export { DropdownTrigger }

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { isValidElement, type ReactElement, type ReactNode } from 'react'

import TooltipArrow from '@/shared/assets/tooltip-arrow.svg'
import { cn } from '@/shared/lib/utils'

interface LockTooltipProps {
  label?: string
  content?: ReactNode
  showArrow?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
  children: ReactElement
}

const ARROW_CLASS: Record<'top' | 'right' | 'bottom' | 'left', string> = {
  top: 'absolute -bottom-8 left-1/2 h-8 w-20 -translate-x-1/2',
  bottom: 'absolute -top-8 left-1/2 h-8 w-20 -translate-x-1/2 rotate-180',
  right: 'absolute -left-[1.4rem] top-1/2 h-8 w-20 -translate-y-1/2 rotate-90',
  left: 'absolute -right-[1.4rem] top-1/2 h-8 w-20 -translate-y-1/2 -rotate-90',
}

// 호버 시 노출되는 안내 툴팁
// shadcn Tooltip 기본 Arrow(사각형 회전) 대신 Figma 디자인의 꼬리 이미지를 그대로 사용
export function LockTooltip({
  label,
  content,
  showArrow = true,
  side = 'top',
  align = 'center',
  className,
  children,
}: LockTooltipProps) {
  return (
    <TooltipPrimitive.Provider delay={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          render={isValidElement(children) ? children : <span />}
        />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={side}
            align={align}
            sideOffset={20}>
            <TooltipPrimitive.Popup
              className={cn(
                'relative flex items-center justify-center gap-10 rounded-lg bg-white px-20 py-16 text-noto-caption-lg-bold whitespace-pre-wrap text-text-and-icon-primary shadow-[0px_2px_6px_rgba(14,38,70,0.24)]',
                className
              )}>
              {label}
              {content}
              {/* 꼬리: Figma 디자인 에셋 그대로 사용 (w-20 h-8, svgr 인라인 컴포넌트) */}
              {showArrow && (
                <TooltipArrow aria-hidden className={ARROW_CLASS[side]} />
              )}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { isValidElement, type ReactElement } from 'react'

import TooltipArrow from '../assets/tooltip-arrow.svg'

interface LockTooltipProps {
  label: string
  children: ReactElement
}

// 자물쇠 아이콘 호버 시 위로 노출되는 안내 툴팁
// shadcn Tooltip 기본 Arrow(사각형 회전) 대신 Figma 디자인의 꼬리 이미지를 그대로 사용
export function LockTooltip({ label, children }: LockTooltipProps) {
  return (
    <TooltipPrimitive.Provider delay={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          render={isValidElement(children) ? children : <span />}
        />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner side='top' sideOffset={20}>
            <TooltipPrimitive.Popup className='relative flex items-center justify-center gap-10 whitespace-nowrap rounded-lg bg-white px-20 py-16 text-noto-caption-lg-bold text-text-and-icon-primary shadow-[0px_2px_6px_rgba(14,38,70,0.24)]'>
              {label}

              {/* 꼬리: Figma 디자인 에셋 그대로 사용 (w-20 h-8, svgr 인라인 컴포넌트) */}
              <TooltipArrow
                aria-hidden
                className='absolute -bottom-8 left-1/2 h-8 w-20 -translate-x-1/2'
              />
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

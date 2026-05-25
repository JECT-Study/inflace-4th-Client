'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/button'
import IconArrowRight from '@/shared/assets/rightwards-arrow-bold.svg'
import { cn } from '@/shared/lib/utils'

const BOTTOM_OFFSET = 24

interface CompetitorSelectionBarProps {
  count: number
  max: number
  onReset: () => void
  onAnalyze: () => void
}

/**
 * 선택 영상 액션 바
 * - 평소엔 자기 in-flow 자리에 표시
 * - 스크롤하다 자기 자리의 bottom이 viewport 하단 24px 라인에 닿는 순간부터 그 위치에 fixed로 고정
 * - 다시 위로 스크롤해 자기 자리가 viewport 하단 24px 라인 아래로 내려가면 fixed 해제
 */
export function CompetitorSelectionBar({
  count,
  max,
  onReset,
  onAnalyze,
}: CompetitorSelectionBarProps) {
  const canAnalyze = count > 0
  const placeholderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const [centerX, setCenterX] = useState<number | null>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new ResizeObserver(() => {
      setBarHeight(bar.offsetHeight)
    })
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => {
      const placeholder = placeholderRef.current
      if (!placeholder) return
      const rect = placeholder.getBoundingClientRect()
      const threshold = window.innerHeight - BOTTOM_OFFSET
      setIsFixed(rect.bottom <= threshold)
      setCenterX(rect.left + rect.width / 2)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [barHeight])

  return (
    <div ref={placeholderRef} style={{ height: barHeight || undefined }}>
      <div
        ref={barRef}
        style={isFixed && centerX != null ? { left: centerX } : undefined}
        className={cn(
          'z-30 mx-auto flex w-fit items-center gap-40 rounded-full bg-white/90 px-24 py-12 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1),0px_2px_8px_0px_rgba(0,0,0,0.08)] backdrop-blur-sm',
          isFixed && 'fixed bottom-24 -translate-x-1/2'
        )}>
        <p className='flex items-center gap-8 text-noto-label-lg-normal text-text-and-icon-primary'>
          선택한 영상
          <span>
            <span className='text-noto-label-lg-bold text-brand-primary'>
              {count}
            </span>
            <span className='text-text-and-icon-primary'>/{max}</span>
          </span>
        </p>

        <div className='flex items-center gap-8'>
          <Button
            type='button'
            color='primary'
            variant='outlined'
            size='lg'
            onClick={onReset}
            disabled={count === 0}
            className='rounded-full'>
            초기화
          </Button>
          <Button
            type='button'
            color='primary'
            variant='filled'
            size='lg'
            onClick={onAnalyze}
            disabled={!canAnalyze}
            rightIcon={<IconArrowRight />}
            className='rounded-full'>
            영상 분석하기
          </Button>
        </div>
      </div>
    </div>
  )
}

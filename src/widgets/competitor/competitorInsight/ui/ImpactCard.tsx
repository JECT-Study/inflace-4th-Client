'use client'

import type { ComponentType, ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

interface ImpactCardProps {
  icon: ComponentType<{ className?: string }>
  title: string
  subtitle: string
  className?: string
  children: ReactNode
}

/**
 * 분석 인사이트 카드의 공통 컨테이너
 * - 좌상단 아이콘 + 타이틀/서브타이틀
 * - 카드 좌우 패딩 44px (헤더·본문 동일 정렬)
 */
export function ImpactCard({
  icon: Icon,
  title,
  subtitle,
  className,
  children,
}: ImpactCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-32 rounded-12 bg-white px-44 py-32 shadow-[0px_2px_6px_0px_rgba(13,13,13,0.04),0px_6px_12px_0px_rgba(13,13,13,0.04)]',
        className
      )}>
      <div className='flex items-start gap-12'>
        <div className='flex items-center justify-center rounded-12 bg-[#fcf8ff] p-4'>
          <Icon className='size-24 text-brand-primary' />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-ibm-title-lg-normal text-text-and-icon-default'>
            {title}
          </p>
          <p className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}

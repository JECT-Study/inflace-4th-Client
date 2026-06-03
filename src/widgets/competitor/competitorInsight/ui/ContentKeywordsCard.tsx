'use client'

import { Tags } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import type { TrendsContentKeywords } from '@/features/competitor'

import { ImpactCard } from './ImpactCard'

/* 상위 N개 키워드를 brand-primary 색으로 강조 (API에 우선도 필드 없어 임의 결정) */
const HIGHLIGHT_COUNT = 2

interface ContentKeywordsCardProps {
  data: TrendsContentKeywords
}

export function ContentKeywordsCard({ data }: ContentKeywordsCardProps) {
  const { keywords, keywordSummary } = data

  return (
    <ImpactCard
      icon={Tags}
      title='콘텐츠 공통 키워드'
      subtitle='제목 · 설명 · 태그 · 자막 텍스트 분석'>
      <div className='flex flex-col gap-32'>
        {keywords.length > 0 ? (
          <div className='flex flex-wrap gap-8'>
            {keywords.map((keyword, idx) => (
              <span
                key={`${keyword}-${idx}`}
                className={cn(
                  'rounded-8 p-8 text-noto-body-md-normal',
                  idx < HIGHLIGHT_COUNT
                    ? 'bg-[#f3eeff] text-brand-primary'
                    : 'bg-background-gray-stronger text-text-and-icon-tertiary'
                )}>
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className='text-noto-body-xs-normal text-text-and-icon-tertiary'>
            데이터가 부족합니다.
          </p>
        )}

        <div className='flex flex-col gap-8'>
          <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
            공통 주제 요약
          </p>
          <p className='whitespace-pre-line text-noto-body-lg-normal text-text-and-icon-secondary'>
            {keywordSummary ?? '데이터가 부족합니다.'}
          </p>
        </div>
      </div>
    </ImpactCard>
  )
}

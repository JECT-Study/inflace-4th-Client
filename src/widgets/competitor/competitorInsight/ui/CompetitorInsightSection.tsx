'use client'

import { useEffect } from 'react'

import { useBrandCollaborationsTrends } from '@/features/competitor'
import { Button } from '@/shared/ui/button'

import { ChannelCharacteristicsCard } from './ChannelCharacteristicsCard'
import { ContentKeywordsCard } from './ContentKeywordsCard'
import { StrategyInsightCard } from './StrategyInsightCard'

interface CompetitorInsightSectionProps {
  /* 분석 대상 영상 ID 목록 — 빈 배열이면 렌더링하지 않음 (페이지 단에서 가드) */
  videoIds: string[]
  /* trends 응답을 받은 직후 호출 (캐시 hit 포함) */
  onAnalysisComplete?: () => void
}

/**
 * 분석 인사이트 묶음 컴포넌트
 * - 로딩: 스피너 카드
 * - 에러: 재시도 버튼 포함 카드 (정의서 문구)
 * - 성공: 3개 Impact Card 세로 배치
 */
export function CompetitorInsightSection({
  videoIds,
  onAnalysisComplete,
}: CompetitorInsightSectionProps) {
  const { data, isLoading, isError, refetch } = useBrandCollaborationsTrends({
    videoIds,
  })

  useEffect(() => {
    if (data) onAnalysisComplete?.()
  }, [data, onAnalysisComplete])

  if (isLoading) {
    return <StatusCard>분석 중입니다...</StatusCard>
  }

  if (isError) {
    return (
      <StatusCard>
        <p className='text-noto-body-lg-normal text-text-and-icon-secondary'>
          분석 중 오류가 발생했습니다. 다시 시도해주세요.
        </p>
        <Button
          type='button'
          color='primary'
          variant='outlined'
          size='md'
          onClick={() => refetch()}>
          다시 시도
        </Button>
      </StatusCard>
    )
  }

  if (!data) return null

  return (
    <div className='flex w-full flex-col gap-24'>
      <ContentKeywordsCard data={data.contentKeywords} />
      <ChannelCharacteristicsCard data={data.channelCharacteristics} />
      <StrategyInsightCard data={data.strategyInsight} />
    </div>
  )
}

function StatusCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full flex-col items-center gap-16 rounded-12 bg-white px-24 py-32 shadow-[0px_2px_6px_0px_rgba(13,13,13,0.04),0px_6px_12px_0px_rgba(13,13,13,0.04)]'>
      <div className='size-32 animate-spin rounded-full border-2 border-text-and-icon-tertiary border-t-transparent' />
      {typeof children === 'string' ? (
        <p className='text-noto-body-xs-normal text-text-and-icon-secondary'>
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  )
}

'use client'

import StrategyInsightIcon from '@/shared/assets/ai-strategy-insight.svg'

import type { TrendsStrategyInsight } from '@/features/competitor'

import { ImpactCard } from './ImpactCard'

interface StrategyInsightCardProps {
  data: TrendsStrategyInsight
}

export function StrategyInsightCard({ data }: StrategyInsightCardProps) {
  const { pplIntent, competitivePoints } = data

  return (
    <ImpactCard
      icon={StrategyInsightIcon}
      title='AI 전략 인사이트'
      subtitle='PPL 의도 분석'>
      <div className='flex flex-col gap-32'>
        <QuestionBlock
          question='왜 이 채널들과 PPL을 진행했을까?'
          answer={pplIntent}
        />
        <QuestionBlock
          question='영상에서 공통으로 강조한 포인트는?'
          answer={competitivePoints}
        />
      </div>
    </ImpactCard>
  )
}

function QuestionBlock({
  question,
  answer,
}: {
  question: string
  answer: string | null
}) {
  return (
    <div className='flex items-start gap-20'>
      <div className='w-[2px] self-stretch bg-brand-primary' />
      <div className='flex flex-1 flex-col gap-8'>
        <p className='text-noto-body-xs-bold text-brand-primary'>{question}</p>
        <p className='whitespace-pre-line text-noto-body-lg-normal text-text-and-icon-secondary'>
          {answer ?? '데이터가 부족합니다.'}
        </p>
      </div>
    </div>
  )
}

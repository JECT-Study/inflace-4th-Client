'use client'

import { BarChart3 } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { format10Thousands } from '@/shared/lib/format'
import type {
  TrendsChannelCharacteristics,
  TrendsCategoryDistribution,
} from '@/features/competitor'

import { ImpactCard } from './ImpactCard'

/* 카테고리 분포 바 색상 (디자인 핑크/시안/옐로) — 4번째 이상은 마지막 색 재사용 */
const CATEGORY_COLORS = ['bg-[#f651a1]', 'bg-[#34c9e8]', 'bg-[#ffce58]']

interface ChannelCharacteristicsCardProps {
  data: TrendsChannelCharacteristics
}

export function ChannelCharacteristicsCard({
  data,
}: ChannelCharacteristicsCardProps) {
  const {
    channelCount,
    avgSubscribers,
    minSubscribers,
    maxSubscribers,
    uploadIntervalDays,
    categoryDistribution,
  } = data

  /* 일 단위 평균 업로드 주기를 주당 횟수로 환산 */
  const uploadsPerWeek =
    uploadIntervalDays && uploadIntervalDays > 0
      ? (7 / uploadIntervalDays).toFixed(1)
      : null

  return (
    <ImpactCard
      icon={BarChart3}
      title='채널 공통 특징'
      subtitle={`협업 채널 ${channelCount}개 기준`}>
      <div className='flex flex-wrap items-start gap-48'>
        <Metric
          label='평균 구독자'
          value={format10Thousands(avgSubscribers)}
          hint={`${format10Thousands(minSubscribers)}~${format10Thousands(maxSubscribers)} 분포`}
        />
        <Metric
          label='평균 업로드'
          value={uploadsPerWeek ? `${uploadsPerWeek}회` : '-'}
          hint='주당 업로드'
        />

        <div className='flex min-w-[280px] flex-1 flex-col gap-12 px-12'>
          <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
            카테고리 분포
          </p>
          {categoryDistribution.length > 0 ? (
            <div className='flex flex-col gap-16'>
              {categoryDistribution.map((item, idx) => (
                <CategoryBar
                  key={`${item.category}-${idx}`}
                  item={item}
                  colorClass={
                    CATEGORY_COLORS[idx] ??
                    CATEGORY_COLORS[CATEGORY_COLORS.length - 1]
                  }
                />
              ))}
            </div>
          ) : (
            <p className='text-noto-body-xs-normal text-text-and-icon-tertiary'>
              분석 데이터가 충분하지 않습니다.
            </p>
          )}
        </div>
      </div>
    </ImpactCard>
  )
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint: string
}) {
  return (
    <div className='flex w-[120px] flex-col gap-8'>
      <p className='text-noto-body-xs-bold text-text-and-icon-primary'>
        {label}
      </p>
      <div className='flex flex-col gap-4'>
        <p className='text-ibm-heading-md-normal text-text-and-icon-primary'>
          {value}
        </p>
        <p className='text-noto-caption-md-normal text-text-and-icon-secondary'>
          {hint}
        </p>
      </div>
    </div>
  )
}

function CategoryBar({
  item,
  colorClass,
}: {
  item: TrendsCategoryDistribution
  colorClass: string
}) {
  const clamped = Math.min(Math.max(item.percentage, 0), 100)
  return (
    <div className='flex items-center gap-4'>
      <p className='w-[120px] truncate text-noto-label-md-normal text-text-and-icon-secondary'>
        {item.category}
      </p>
      <div className='relative h-20 flex-1 overflow-hidden rounded-full bg-background-gray-stronger'>
        <div
          className={cn('h-full rounded-full', colorClass)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className='w-[60px] text-right text-noto-body-xs-bold text-text-and-icon-primary'>
        {clamped.toFixed(0)}%
      </p>
    </div>
  )
}

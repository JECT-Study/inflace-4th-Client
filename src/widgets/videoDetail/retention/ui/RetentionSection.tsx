'use client'

import { useState } from 'react'
import {
  useRetention,
  useRetentionSummary,
  useRetentionDropPoints,
} from '@/features/videoDetail/retention'
import type {
  DropPoint,
  RetentionDataPoint,
} from '@/features/videoDetail/retention'
import { RetentionChart, formatDuration } from './RetentionChart'
import WatchRetentionIcon from '@/shared/assets/watch-retention.svg'
import ChartIcon from '@/shared/assets/chart-bold.svg'
import BounceRateIcon from '@/shared/assets/bounce-rate.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

const SECTION_LABELS = [
  '인트로 (1/4 구간)',
  '중반 (2/4 구간)',
  '후반 (3/4 구간)',
  '아웃트로 (4/4 구간)',
]

const EMPTY_MESSAGE = '데이터가 충분하지 않아 분석 결과를 제공할 수 없어요'

/* 데이터 부족 시 그래프 뒤에 흐리게 깔리는 데코용 샘플 곡선 (실제 값 아님) */
const EMPTY_SAMPLE: RetentionDataPoint[] = [
  { timeRatio: 0, watchRatio: 1.0, displayTime: '0:00', isDrop: false },
  { timeRatio: 0.25, watchRatio: 0.82, displayTime: '1:00', isDrop: false },
  { timeRatio: 0.5, watchRatio: 0.6, displayTime: '2:00', isDrop: false },
  { timeRatio: 0.75, watchRatio: 0.52, displayTime: '3:00', isDrop: false },
  { timeRatio: 1, watchRatio: 0.38, displayTime: '4:00', isDrop: false },
]

function formatRelativeAvg(ratio: number): string {
  const diff = Math.round((ratio - 1) * 100)
  return diff >= 0 ? `+${diff}%` : `${diff}%`
}

/* 아이콘 + 제목 카드 헤더 패턴 */
function SectionCardHeader({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className='flex items-center gap-8'>
      <span className='rounded-12 bg-background-neutral-default p-4'>{icon}</span>
      <p className='text-noto-title-sm-bold text-text-and-icon-primary'>
        {title}
      </p>
      {children}
    </div>
  )
}

function DropOffCard({
  point,
  label,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: {
  point: DropPoint
  label: string
  isHighlighted: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const timeRange = point.endTime
    ? `${point.startTime}~${point.endTime}`
    : point.startTime

  return (
    <div
      className={`flex flex-1 flex-col gap-24 overflow-hidden rounded-12 p-16 transition-colors ${
        isHighlighted
          ? 'bg-[rgba(241,61,93,0.08)]'
          : 'bg-background-gray-default'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className='flex flex-col gap-4'>
        <p
          className={`text-noto-caption-md-normal transition-colors ${
            isHighlighted
              ? 'text-text-and-icon-default'
              : 'text-text-and-icon-secondary'
          }`}>
          {timeRange}
        </p>
        <p className='text-noto-title-sm-normal text-text-and-icon-primary'>
          {label}
        </p>
      </div>
      <p
        className={`text-ibm-heading-sm-normal transition-colors ${
          isHighlighted ? 'text-feedback-error' : 'text-text-and-icon-primary'
        }`}>
        {point.dropRate}% 이탈
      </p>
    </div>
  )
}

interface RetentionSectionProps {
  videoId: string
}

export function RetentionSection({ videoId }: RetentionSectionProps) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

  const {
    data: retentionData,
    isLoading: retentionLoading,
    isError: retentionError,
  } = useRetention(videoId)
  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useRetentionSummary(videoId)
  const {
    data: dropPointsData,
    isLoading: dropLoading,
    isError: dropError,
  } = useRetentionDropPoints(videoId)

  const retention = retentionData?.retentionData ?? []
  const summary = summaryData?.retentionData
  const dropPoints = dropPointsData?.dropPoints ?? []

  const isPositive = (summary?.relativeRetentionAvg ?? 0) >= 1
  const showSummaryEmpty = summaryError || !summary
  const showRetentionEmpty = retentionError || retention.length === 0
  const showDropEmpty = dropError || dropPoints.length === 0

  return (
    <section className='flex flex-col gap-16'>
      <div className='flex items-center px-2'>
        <p className='flex-1 text-ibm-title-md-normal text-text-and-icon-default'>
          시청 지속률 분석
        </p>
      </div>

      <div className='flex flex-col gap-16'>
        {/* 평균 시청 지속 시간 카드 */}
        <div
          className={`flex flex-col gap-24 rounded-12 bg-white px-24 pt-24 ${showSummaryEmpty ? 'pb-64' : 'pb-24'} shadow-[0_2px_6px_0_rgba(13,13,13,0.04)] transition-colors hover:bg-background-gray-default`}>
          <SectionCardHeader
            icon={
              <WatchRetentionIcon className='size-24 text-btn-primary-text-disabled' />
            }
            title='평균 시청 지속 시간'
          />

          {summaryLoading ? (
            <div className='flex flex-col gap-8 px-40'>
              <Skeleton className='h-28 w-32' />
              <Skeleton className='h-16 w-48' />
            </div>
          ) : showSummaryEmpty ? (
            <div className='flex w-full items-center justify-center'>
              <p className='text-noto-body-xs-normal text-text-and-icon-primary'>
                {EMPTY_MESSAGE}
              </p>
            </div>
          ) : (
            <div className='flex flex-col gap-2 px-40'>
              <p className='text-ibm-title-lg-normal text-text-and-icon-default'>
                {formatDuration(summary?.avgWatchDuration ?? 0)}
              </p>
              <div className='flex items-center gap-6'>
                <p className='text-noto-caption-md-normal text-text-and-icon-secondary'>
                  유튜브 평균 대비
                </p>
                <p
                  className={`text-noto-title-sm-bold ${
                    isPositive ? 'text-feedback-success' : 'text-feedback-error'
                  }`}>
                  {formatRelativeAvg(summary?.relativeRetentionAvg ?? 0)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 시청 지속률 그래프 카드 */}
        <div className='flex flex-col gap-16 overflow-hidden rounded-12 bg-white pt-24 pb-32 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
          <div className='px-24'>
            <SectionCardHeader
              icon={
                <ChartIcon className='size-24 text-btn-primary-text-disabled' />
              }
              title='시청 지속률'
            />
          </div>

          {retentionLoading ? (
            <div className='px-24'>
              <Skeleton className='h-[32.8rem] w-full' />
            </div>
          ) : showRetentionEmpty ? (
            <div className='relative px-24'>
              <div
                aria-hidden
                className='pointer-events-none select-none opacity-60 blur-[3px]'>
                <RetentionChart
                  data={EMPTY_SAMPLE}
                  avgWatchDuration={0}
                  hoveredSection={null}
                  onSectionHover={() => {}}
                />
              </div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-noto-body-xs-normal text-text-and-icon-primary'>
                  {EMPTY_MESSAGE}
                </p>
              </div>
            </div>
          ) : (
            <div className='px-24'>
              <RetentionChart
                data={retention}
                avgWatchDuration={summary?.avgWatchDuration ?? 0}
                hoveredSection={hoveredSection}
                onSectionHover={setHoveredSection}
              />
            </div>
          )}
        </div>

        {/* 구간별 이탈율 카드 */}
        <div
          className={`flex flex-col gap-24 rounded-12 bg-white px-24 pt-24 ${showDropEmpty ? 'pb-64' : 'pb-24'} shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]`}>
          <SectionCardHeader
            icon={
              <BounceRateIcon className='size-24 text-btn-primary-text-disabled' />
            }
            title='구간별 이탈율'
          />

          {dropLoading ? (
            <div className='flex gap-24 px-40'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className='h-[10rem] flex-1' />
              ))}
            </div>
          ) : showDropEmpty ? (
            <div className='flex w-full items-center justify-center'>
              <p className='text-noto-body-xs-normal text-text-and-icon-primary'>
                {EMPTY_MESSAGE}
              </p>
            </div>
          ) : (
            <div className='flex items-center gap-24 px-40'>
              {dropPoints.slice(0, 4).map((point, index) => (
                <DropOffCard
                  key={point.startTime}
                  point={point}
                  label={SECTION_LABELS[index] ?? `구간 ${index + 1}`}
                  isHighlighted={hoveredSection === index}
                  onMouseEnter={() => setHoveredSection(index)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

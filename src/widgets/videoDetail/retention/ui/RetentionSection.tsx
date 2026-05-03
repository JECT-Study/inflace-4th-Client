'use client'

import { useState } from 'react'
import {
  useRetention,
  useRetentionSummary,
  useRetentionDropPoints,
  mockRetentionData,
  mockRetentionSummary,
  mockDropPoints,
} from '@/features/videoDetail/retention'
import type { DropPoint } from '@/features/videoDetail/retention'
import { RetentionChart, formatDuration } from './RetentionChart'
import WatchRetentionIcon from '@/shared/assets/watch-retention.svg'
import ChartIcon from '@/shared/assets/chart-bold.svg'
import BounceRateIcon from '@/shared/assets/bounce-rate.svg'
import QuestionIcon from '@/shared/assets/question-bold.svg'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'

const SECTION_LABELS = [
  '인트로 (1/4 구간)',
  '중반 (2/4 구간)',
  '후반 (3/4 구간)',
  '아웃트로 (4/4 구간)',
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
      <span className='rounded-12 bg-background-brand-default p-4'>{icon}</span>
      <p className='text-noto-title-sm-bold text-text-and-icon-primary'>{title}</p>
      {children}
    </div>
  )
}

/* 물음표 아이콘 + 인라인 툴팁 — 자체 hover 상태 관리 */
function TooltipIcon({ text }: { text: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className='relative ml-2'>
      <button
        type='button'
        className='flex items-center'
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}>
        <QuestionIcon className='size-16 text-text-and-icon-tertiary' />
      </button>
      {visible && (
        <div className='absolute left-1/2 top-full z-10 mt-6 w-[18rem] -translate-x-1/2 rounded-12 bg-white p-16 shadow-[0_0_8px_0_rgba(13,13,13,0.08),0_6px_12px_0_rgba(13,13,13,0.08)]'>
          <p className='text-noto-caption-md-normal text-text-and-icon-secondary'>{text}</p>
        </div>
      )}
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
        isHighlighted ? 'bg-[rgba(241,61,93,0.08)]' : 'bg-background-gray-default'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className='flex flex-col gap-4'>
        <p
          className={`text-noto-caption-md-normal transition-colors ${
            isHighlighted ? 'text-text-and-icon-default' : 'text-text-and-icon-secondary'
          }`}>
          {timeRange}
        </p>
        <p className='text-noto-title-sm-normal text-text-and-icon-primary'>{label}</p>
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

  const { data: retentionData, isLoading: retentionLoading } = useRetention(videoId)
  const { data: summaryData, isLoading: summaryLoading } = useRetentionSummary(videoId)
  const { data: dropPointsData, isLoading: dropLoading } = useRetentionDropPoints(videoId)

  const retention = retentionData?.retentionData ?? mockRetentionData
  const summary = summaryData?.retentionData ?? mockRetentionSummary
  const dropPoints = dropPointsData?.dropPoints ?? mockDropPoints

  const isLoading = retentionLoading || summaryLoading || dropLoading
  const isPositive = summary.relativeRetentionAvg >= 1

  return (
    <section className='flex flex-col gap-16'>
      <div className='flex items-center px-2'>
        <p className='flex-1 text-ibm-title-md-normal text-text-and-icon-default'>
          시청 지속률 분석
        </p>
      </div>

      <div className='flex flex-col gap-16'>
        {/* 평균 시청 지속 시간 카드 */}
        <div className='flex flex-col gap-24 rounded-12 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)] transition-colors hover:bg-background-gray-default'>
          <SectionCardHeader
            icon={<WatchRetentionIcon className='size-24 text-btn-primary-text-disabled' />}
            title='평균 시청 지속 시간'>
            <TooltipIcon text='해당 영상을 시청한 사람들이 평균적으로 얼마나 오래 시청했는지를 나타냅니다.' />
          </SectionCardHeader>

          {isLoading ? (
            <div className='flex flex-col gap-8 px-40'>
              <Skeleton className='h-28 w-32' />
              <Skeleton className='h-16 w-48' />
            </div>
          ) : (
            <div className='flex flex-col gap-2 px-40'>
              <p className='text-ibm-title-lg-normal text-text-and-icon-default'>
                {formatDuration(summary.avgWatchDuration)}
              </p>
              <div className='flex items-center gap-6'>
                <p className='text-noto-caption-md-normal text-text-and-icon-secondary'>
                  유튜브 평균 대비
                </p>
                <p
                  className={`text-noto-title-sm-bold ${
                    isPositive ? 'text-feedback-success' : 'text-feedback-error'
                  }`}>
                  {formatRelativeAvg(summary.relativeRetentionAvg)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 시청 지속률 그래프 카드 */}
        <div className='flex flex-col gap-16 overflow-hidden rounded-12 bg-white pb-32 pt-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
          <div className='px-24'>
            <SectionCardHeader
              icon={<ChartIcon className='size-24 text-btn-primary-text-disabled' />}
              title='시청 지속률'
            />
          </div>

          {isLoading ? (
            <div className='px-24'>
              <Skeleton className='h-[32.8rem] w-full' />
            </div>
          ) : (
            <div className='px-24'>
              <RetentionChart
                data={retention}
                avgWatchDuration={summary.avgWatchDuration}
                hoveredSection={hoveredSection}
                onSectionHover={setHoveredSection}
              />
            </div>
          )}
        </div>

        {/* 구간별 이탈율 카드 */}
        <div className='flex flex-col gap-24 rounded-12 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
          <SectionCardHeader
            icon={<BounceRateIcon className='size-24 text-btn-primary-text-disabled' />}
            title='구간별 이탈율'
          />

          {isLoading ? (
            <div className='flex gap-24 px-40'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className='h-[10rem] flex-1' />
              ))}
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

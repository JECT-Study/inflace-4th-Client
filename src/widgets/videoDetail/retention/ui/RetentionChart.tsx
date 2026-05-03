'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from 'recharts'
import { ChartTooltip } from '@/shared/ui/chart/ChartTooltip'
import type { RetentionDataPoint } from '@/features/videoDetail/retention'

interface RetentionChartProps {
  data: RetentionDataPoint[]
  avgWatchDuration?: number
  hoveredSection: number | null
  onSectionHover: (index: number | null) => void
}

const LINE_COLOR = '#5A44F2'
const HIGHLIGHT_COLOR = '#F13D5D'
const SECTION_KEYS = ['s0', 's1', 's2', 's3'] as const
const SECTION_BOUNDARIES = [0.25, 0.5, 0.75]

type SectionKey = (typeof SECTION_KEYS)[number]
type SectionDataPoint = RetentionDataPoint & Record<SectionKey, number | undefined>

function getSectionIndex(timeRatio: number): number {
  if (timeRatio < 0.25) return 0
  if (timeRatio < 0.5) return 1
  if (timeRatio < 0.75) return 2
  return 3
}

export function parseDuration(displayTime: string): number {
  const [min, sec] = displayTime.split(':').map(Number)
  return (min ?? 0) * 60 + (sec ?? 0)
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}분 ${s}초`
}

/* 경계 포인트를 보간 삽입하고 s0~s3 구간 필드 생성 — 정렬 1회 */
function buildSectionData(data: RetentionDataPoint[]): SectionDataPoint[] {
  const existingRatios = new Set(data.map((d) => d.timeRatio))
  const extraPoints: RetentionDataPoint[] = []

  for (const boundary of SECTION_BOUNDARIES) {
    if (existingRatios.has(boundary)) continue

    let before: RetentionDataPoint | undefined
    let after: RetentionDataPoint | undefined
    for (const d of data) {
      if (d.timeRatio < boundary) before = d
      else if (!after) { after = d; break }
    }
    if (!before || !after) continue

    const t = (boundary - before.timeRatio) / (after.timeRatio - before.timeRatio)
    extraPoints.push({
      timeRatio: boundary,
      watchRatio: before.watchRatio + (after.watchRatio - before.watchRatio) * t,
      displayTime: '',
      isDrop: false,
    })
  }

  const augmented = [...data, ...extraPoints].sort((a, b) => a.timeRatio - b.timeRatio)

  return augmented.map((d) => ({
    ...d,
    s0: d.timeRatio <= 0.25 ? d.watchRatio : undefined,
    s1: d.timeRatio >= 0.25 && d.timeRatio <= 0.5 ? d.watchRatio : undefined,
    s2: d.timeRatio >= 0.5 && d.timeRatio <= 0.75 ? d.watchRatio : undefined,
    s3: d.timeRatio >= 0.75 ? d.watchRatio : undefined,
  }))
}

function RetentionTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { dataKey: string; payload: SectionDataPoint }[]
}) {
  if (!active || !payload?.length) return null
  const main = payload.find((p) => p.dataKey === 'watchRatio') ?? payload[0]
  if (!main?.payload.displayTime) return null
  const { displayTime, watchRatio, isDrop } = main.payload
  return (
    <ChartTooltip
      topLabel={displayTime}
      primaryValue={`${Math.round(watchRatio * 100)}%`}
      annotation={isDrop ? '급이탈 구간' : undefined}
    />
  )
}

function AvgDurationLabel({
  viewBox,
  onEnter,
  onLeave,
}: {
  viewBox?: { x?: number; y?: number; height?: number }
  onEnter: (e: React.MouseEvent<SVGRectElement>) => void
  onLeave: () => void
}) {
  return (
    <rect
      x={(viewBox?.x ?? 0) - 8}
      y={viewBox?.y ?? 0}
      width={16}
      height={viewBox?.height ?? 0}
      fill='transparent'
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  )
}

export function RetentionChart({
  data,
  avgWatchDuration,
  hoveredSection,
  onSectionHover,
}: RetentionChartProps) {
  const [avgTooltipPos, setAvgTooltipPos] = useState<{ x: number; y: number } | null>(null)

  const sectionData = useMemo(() => buildSectionData(data), [data])

  /* O(n) find → O(1) Map 조회 */
  const displayTimeMap = useMemo(
    () => new Map(data.map((d) => [d.timeRatio, d.displayTime])),
    [data]
  )

  const steepestDropPoint = useMemo(() => {
    let max: { point: RetentionDataPoint; drop: number } | null = null
    for (let i = 1; i < data.length; i++) {
      if (!data[i].isDrop) continue
      const drop = data[i - 1].watchRatio - data[i].watchRatio
      if (!max || drop > max.drop) max = { point: data[i], drop }
    }
    return max?.point ?? null
  }, [data])

  const avgTimeRatio = useMemo(() => {
    const lastPoint = data[data.length - 1]
    const totalSec = lastPoint ? parseDuration(lastPoint.displayTime) : 0
    return avgWatchDuration && totalSec > 0
      ? Math.min(avgWatchDuration / totalSec, 1)
      : null
  }, [data, avgWatchDuration])

  const handleChartMouseMove = useCallback(
    (state: { activeLabel?: string | number; isTooltipActive?: boolean }) => {
      if (state.activeLabel !== undefined && state.isTooltipActive) {
        onSectionHover(getSectionIndex(Number(state.activeLabel)))
      }
    },
    [onSectionHover]
  )

  const handleChartMouseLeave = useCallback(() => onSectionHover(null), [onSectionHover])

  return (
    <div className='relative h-[32.8rem] w-full text-noto-caption-sm-bold text-text-and-icon-tertiary [&_*:focus]:outline-none [&_svg]:outline-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          data={sectionData}
          margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          onMouseMove={handleChartMouseMove}
          onMouseLeave={handleChartMouseLeave}>
          <defs>
            <linearGradient id='retentionGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#5A44F2' stopOpacity={0.24} />
              <stop offset='100%' stopColor='#FFFFFF' stopOpacity={0.24} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke='#E5E7EB' strokeOpacity={1} />

          <XAxis
            dataKey='timeRatio'
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tickCount={5}
            tickFormatter={(v: number) => displayTimeMap.get(v) ?? ''}
          />

          <YAxis
            domain={[0, 1]}
            axisLine={false}
            tickLine={false}
            width={44}
            tickMargin={8}
            ticks={[0, 0.25, 0.5, 0.75, 1.0]}
            tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
          />

          {steepestDropPoint && (
            <ReferenceLine
              x={steepestDropPoint.timeRatio}
              stroke='#5A44F2'
              strokeDasharray='4 4'
              strokeWidth={1.5}
              strokeOpacity={0.6}
            />
          )}

          {avgTimeRatio !== null && (
            <ReferenceLine
              x={avgTimeRatio}
              stroke='#77757F'
              strokeDasharray='6 3'
              strokeWidth={1.5}
              label={(props: { viewBox?: { x?: number; y?: number; height?: number } }) => (
                <AvgDurationLabel
                  viewBox={props.viewBox}
                  onEnter={(e) => setAvgTooltipPos({ x: e.clientX, y: e.clientY })}
                  onLeave={() => setAvgTooltipPos(null)}
                />
              )}
            />
          )}

          <Tooltip content={<RetentionTooltip />} cursor={false} />

          <Area
            type='monotone'
            dataKey='watchRatio'
            fill='url(#retentionGradient)'
            fillOpacity={1}
            stroke='none'
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: '#5A44F2' }}
          />

          {SECTION_KEYS.map((key, i) => (
            <Line
              key={key}
              type='monotone'
              dataKey={key}
              stroke={hoveredSection === i ? HIGHLIGHT_COLOR : LINE_COLOR}
              strokeWidth={3}
              dot={false}
              activeDot={false}
              connectNulls={false}
              legendType='none'
            />
          ))}

          <Brush
            dataKey='timeRatio'
            height={20}
            stroke='#E5E7EB'
            fill='#F9FAFB'
            travellerWidth={6}
            tickFormatter={() => ''}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {avgTooltipPos && avgWatchDuration && (
        <div
          className='pointer-events-none fixed z-50 flex flex-col gap-4 rounded-12 bg-white p-20 shadow-[0_0_8px_0_rgba(13,13,13,0.08),0_6px_12px_0_rgba(13,13,13,0.08)]'
          style={{ left: avgTooltipPos.x + 12, top: avgTooltipPos.y - 20 }}>
          <p className='text-noto-body-xxs-bold text-text-and-icon-primary'>
            평균 시청 지속시간
          </p>
          <p className='text-noto-title-sm-bold text-brand-primary'>
            {formatDuration(avgWatchDuration)}
          </p>
        </div>
      )}
    </div>
  )
}

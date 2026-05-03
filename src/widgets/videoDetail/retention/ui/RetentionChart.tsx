'use client'

import { useState, useMemo } from 'react'
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

type SectionKey = (typeof SECTION_KEYS)[number]

type SectionDataPoint = RetentionDataPoint & Record<SectionKey, number | undefined>

function getSectionIndex(timeRatio: number): number {
  if (timeRatio < 0.25) return 0
  if (timeRatio < 0.5) return 1
  if (timeRatio < 0.75) return 2
  return 3
}

function parseDuration(displayTime: string): number {
  const [min, sec] = displayTime.split(':').map(Number)
  return (min ?? 0) * 60 + (sec ?? 0)
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}분 ${s}초`
}

/* 0.25, 0.5, 0.75 경계에 보간값을 삽입하고 s0~s3 필드를 생성 */
function buildSectionData(data: RetentionDataPoint[]): SectionDataPoint[] {
  const BOUNDARIES = [0.25, 0.5, 0.75]

  let augmented = [...data]

  for (const boundary of BOUNDARIES) {
    if (augmented.find((d) => d.timeRatio === boundary)) continue

    const before = [...augmented].reverse().find((d) => d.timeRatio < boundary)
    const after = augmented.find((d) => d.timeRatio > boundary)
    if (!before || !after) continue

    const t = (boundary - before.timeRatio) / (after.timeRatio - before.timeRatio)
    const watchRatio = before.watchRatio + (after.watchRatio - before.watchRatio) * t

    augmented = [
      ...augmented,
      { timeRatio: boundary, watchRatio, displayTime: '', isDrop: false },
    ].sort((a, b) => a.timeRatio - b.timeRatio)
  }

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
  if (!main) return null
  const point = main.payload
  if (!point.displayTime) return null
  return (
    <ChartTooltip
      topLabel={point.displayTime}
      primaryValue={`${Math.round(point.watchRatio * 100)}%`}
      annotation={point.isDrop ? '급이탈 구간' : undefined}
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
  const x = viewBox?.x ?? 0
  const y = viewBox?.y ?? 0
  const height = viewBox?.height ?? 0
  return (
    <rect
      x={x - 8}
      y={y}
      width={16}
      height={height}
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
  const [avgTooltipPos, setAvgTooltipPos] = useState<{
    x: number
    y: number
  } | null>(null)

  const sectionData = useMemo(() => buildSectionData(data), [data])

  const steepestDropPoint = useMemo(() => {
    let max: { point: RetentionDataPoint; drop: number } | null = null
    for (let i = 1; i < data.length; i++) {
      if (!data[i].isDrop) continue
      const drop = data[i - 1].watchRatio - data[i].watchRatio
      if (!max || drop > max.drop) max = { point: data[i], drop }
    }
    return max?.point ?? null
  }, [data])

  const lastPoint = data[data.length - 1]
  const totalDurationSec = lastPoint ? parseDuration(lastPoint.displayTime) : 0
  const avgTimeRatio =
    avgWatchDuration && totalDurationSec > 0
      ? Math.min(avgWatchDuration / totalDurationSec, 1)
      : null

  function handleChartMouseMove(state: {
    activeLabel?: string | number
    isTooltipActive?: boolean
  }) {
    if (state.activeLabel !== undefined && state.isTooltipActive) {
      onSectionHover(getSectionIndex(Number(state.activeLabel)))
    }
  }

  return (
    <div className='relative h-[32.8rem] w-full text-noto-caption-sm-bold text-text-and-icon-tertiary [&_*:focus]:outline-none [&_svg]:outline-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          data={sectionData}
          margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          onMouseMove={handleChartMouseMove}
          onMouseLeave={() => onSectionHover(null)}>
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
            tickFormatter={(value: number) => {
              const point = data.find((d) => d.timeRatio === value)
              return point?.displayTime ?? ''
            }}
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

          {/* 가장 급감하는 구간 세로선 — 1개만 표시 */}
          {steepestDropPoint && (
            <ReferenceLine
              x={steepestDropPoint.timeRatio}
              stroke='#5A44F2'
              strokeDasharray='4 4'
              strokeWidth={1.5}
              strokeOpacity={0.6}
            />
          )}

          {/* 평균 시청 지속시간 세로선 */}
          {avgTimeRatio !== null && (
            <ReferenceLine
              x={avgTimeRatio}
              stroke='#77757F'
              strokeDasharray='6 3'
              strokeWidth={1.5}
              label={(props: {
                viewBox?: { x?: number; y?: number; height?: number }
              }) => (
                <AvgDurationLabel
                  viewBox={props.viewBox}
                  onEnter={(e) =>
                    setAvgTooltipPos({ x: e.clientX, y: e.clientY })
                  }
                  onLeave={() => setAvgTooltipPos(null)}
                />
              )}
            />
          )}

          <Tooltip content={<RetentionTooltip />} cursor={false} />

          {/* 그라디언트 채우기 영역 — 선 없이 fill만 */}
          <Area
            type='monotone'
            dataKey='watchRatio'
            fill='url(#retentionGradient)'
            fillOpacity={1}
            stroke='none'
            dot={false}
            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: '#fff',
              fill: '#5A44F2',
            }}
          />

          {/* 구간별 선 — 호버 시 해당 구간만 빨간색 */}
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

      {/* 평균 시청 지속시간 호버 툴팁 */}
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

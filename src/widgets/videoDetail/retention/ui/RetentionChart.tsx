'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
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

const Y_AXIS_WIDTH = 44
const AVG_LINE_HOVER_PX = 12

export function RetentionChart({
  data,
  avgWatchDuration,
  hoveredSection,
  onSectionHover,
}: RetentionChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [avgTooltipPos, setAvgTooltipPos] = useState<{ x: number; y: number } | null>(null)

  const sectionData = useMemo(() => buildSectionData(data), [data])

  const displayTimeMap = useMemo(() => {
    const map = new Map(data.map((d) => [d.timeRatio, d.displayTime]))
    for (const boundary of SECTION_BOUNDARIES) {
      if (map.has(boundary)) continue
      let before: RetentionDataPoint | undefined
      let after: RetentionDataPoint | undefined
      for (const d of data) {
        if (d.timeRatio <= boundary) before = d
        else if (!after) { after = d; break }
      }
      if (!before || !after) continue
      const t = (boundary - before.timeRatio) / (after.timeRatio - before.timeRatio)
      const sec = parseDuration(before.displayTime) + t * (parseDuration(after.displayTime) - parseDuration(before.displayTime))
      const m = Math.floor(sec / 60)
      const s = Math.floor(sec % 60)
      map.set(boundary, `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    return map
  }, [data])

  const avgTimeRatio = useMemo(() => {
    const lastPoint = data[data.length - 1]
    const totalSec = lastPoint ? parseDuration(lastPoint.displayTime) : 0
    return avgWatchDuration && totalSec > 0
      ? Math.min(avgWatchDuration / totalSec, 1)
      : null
  }, [data, avgWatchDuration])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avgTimeRatio === null || !containerRef.current) {
        setAvgTooltipPos(null)
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height) {
        setAvgTooltipPos(null)
        return
      }

      const avgX = Y_AXIS_WIDTH + avgTimeRatio * (rect.width - Y_AXIS_WIDTH)
      if (Math.abs(mouseX - avgX) < AVG_LINE_HOVER_PX) {
        setAvgTooltipPos({ x: e.clientX, y: e.clientY })
      } else {
        setAvgTooltipPos(null)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [avgTimeRatio])

  const handleChartMouseMove = useCallback(
    (state: { activeLabel?: string | number; isTooltipActive?: boolean }) => {
      if (state.activeLabel !== undefined && state.isTooltipActive) {
        onSectionHover(getSectionIndex(Number(state.activeLabel)))
      }
    },
    [onSectionHover]
  )

  const handleChartMouseLeave = useCallback(() => {
    onSectionHover(null)
    setAvgTooltipPos(null)
  }, [onSectionHover])

  return (
    <div
      ref={containerRef}
      className='relative h-[32.8rem] w-full text-noto-caption-sm-bold text-text-and-icon-tertiary [&_*:focus]:outline-none [&_svg]:outline-none'
    >
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
            type='number'
            domain={[0, 1]}
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

          {avgTimeRatio !== null && (
            <ReferenceLine
              x={avgTimeRatio}
              stroke='#77757F'
              strokeDasharray='6 3'
              strokeWidth={1.5}
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
          className='pointer-events-none fixed z-50'
          style={{ left: avgTooltipPos.x + 12, top: avgTooltipPos.y - 20 }}>
          <ChartTooltip
            topLabel='평균 시청 지속시간'
            primaryValue={formatDuration(avgWatchDuration)}
          />
        </div>
      )}
    </div>
  )
}

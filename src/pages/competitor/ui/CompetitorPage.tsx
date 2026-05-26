'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CompetitorFilterPanel } from '@/widgets/competitor'
import {
  DEFAULT_COMPETITOR_FILTER,
  useBrandCollaborations,
  type CompetitorFilterState,
} from '@/features/competitor'
import { Lightbulb } from 'lucide-react'

export function CompetitorPage() {
  const queryClient = useQueryClient()

  /* 사용자가 입력 중인 필터 (편집 상태) */
  const [draftFilter, setDraftFilter] = useState<CompetitorFilterState>(
    DEFAULT_COMPETITOR_FILTER
  )

  /* 검색하기로 확정된 필터 — 이 값이 있어야 API 호출됨 */
  const [appliedFilter, setAppliedFilter] =
    useState<CompetitorFilterState | null>(null)

  const { data } = useBrandCollaborations({ filter: appliedFilter })

  const totalCount =
    data?.pages.reduce((sum, p) => sum + p.content.length, 0) ?? 0
  const hasResults = totalCount > 0

  function handleChange<K extends keyof CompetitorFilterState>(
    key: K,
    value: CompetitorFilterState[K]
  ) {
    setDraftFilter((prev) => ({ ...prev, [key]: value }))
  }

  /* 초기화: 편집 필터 + 적용 필터 모두 초기 상태로 */
  function handleReset() {
    setDraftFilter(DEFAULT_COMPETITOR_FILTER)
    setAppliedFilter(null)
  }

  /* 검색: 편집 필터를 확정. 동일 조건 재검색 시에도 강제 refetch */
  function handleSearch() {
    setAppliedFilter(draftFilter)
    queryClient.invalidateQueries({ queryKey: ['brand-collaborations'] })
  }

  return (
    <div className='flex w-full flex-col bg-white pb-96'>
      <CompetitorFilterPanel
        filter={draftFilter}
        onChange={handleChange}
        onReset={handleReset}
        onSearch={handleSearch}
      />

      {/* 결과 영역 — 영상 그리드는 다음 PR에서 작업, 일단 AI 분석 인사이트 placeholder만 */}
      <div className='w-full px-24 pt-24'>
        <AnalysisInsightCard hasResults={hasResults} />
      </div>
    </div>
  )
}

function AnalysisInsightCard({ hasResults }: { hasResults: boolean }) {
  return (
    <div className='flex w-full flex-col items-center gap-24 overflow-hidden rounded-16 bg-background-gray-default p-32'>
      <div className='flex flex-col items-center gap-12'>
        <Lightbulb className='size-24 text-text-and-icon-primary' />
        <p className='text-ibm-title-lg-thin text-text-and-icon-primary'>
          AI 분석 인사이트
        </p>
      </div>
      <div className='text-center text-noto-body-xs-normal text-text-and-icon-secondary'>
        <p>
          {hasResults
            ? '조회된 영상 중 1개 이상을 선택한 후, 영상 분석하기 버튼을 누르면 분석이 시작됩니다.'
            : '검색을 시작하면 결과가 이곳에 표시됩니다.'}
        </p>
        <p>
          유료 광고 영상들 중, 강조되는 내용 및 주요 키워드, 채널 특성을 분석한
          리포트를 제공합니다.
        </p>
        <p className='mt-16 text-noto-label-md-normal text-text-and-icon-primary'>
          * 영상은 최대 10개까지 선택 가능합니다.
        </p>
      </div>
    </div>
  )
}

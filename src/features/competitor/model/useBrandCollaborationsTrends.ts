'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchBrandCollaborationsTrends } from '../api/competitorApi'

interface UseBrandCollaborationsTrendsOptions {
  /* 분석 대상 영상 ID 배열 (1~10) */
  videoIds: string[]
  enabled?: boolean
}

/**
 * 선택한 영상들로 AI 분석 인사이트(trends) 조회
 * - queryKey에 정렬된 videoIds를 포함해 동일 영상셋이면 캐시 재사용
 * - 빈 배열이거나 10개 초과면 자동 비활성화
 */
export function useBrandCollaborationsTrends({
  videoIds,
  enabled = true,
}: UseBrandCollaborationsTrendsOptions) {
  const sortedIds = [...videoIds].sort()
  const isValidCount = sortedIds.length > 0 && sortedIds.length <= 10

  return useQuery({
    queryKey: ['brand-collaborations-trends', sortedIds],
    queryFn: () =>
      fetchBrandCollaborationsTrends({ youtubeVideoIds: sortedIds }),
    enabled: enabled && isValidCount,
    /* 같은 영상셋이면 새 조건이 되기 전까지 stale 처리 안 함 */
    staleTime: Infinity,
  })
}

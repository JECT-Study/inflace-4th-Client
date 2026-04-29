import { useMemo } from 'react'

import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

import { fetchVideoAnalysis } from '../api/videosApi'
import type { VideosResponse } from './types'

/* 영상 목록 무한 스크롤 훅 */
export function useVideos(channelId: string) {
  const result = useInfiniteScroll<VideosResponse>({
    queryKey: ['videoAnalysis', channelId],
    queryFn: ({ pageParam }) => fetchVideoAnalysis(channelId, pageParam),
    // channelId가 없으면 fetch하지 않음
    enabled: !!channelId,
  })

  /* 메모이제이션 => 불필요한 재랜더링 방지 */
  const videos = useMemo(
    () => result.data?.pages.flatMap((page) => page.videos) ?? [],
    [result.data?.pages]
  )

  return { ...result, videos }
}

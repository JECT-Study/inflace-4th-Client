import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

import { fetchVideoAnalysis } from '../api/videosApi'
import type { VideosResponse } from './types'

/**
 * 영상 목록 무한 스크롤 훅
 *
 * useInfiniteScroll의 도메인 래퍼입니다.
 * useInfiniteScroll은 pages 원본을 반환하므로,
 * 여기서 videos 키로 플랫닝하여 단순 배열로 노출합니다.
 */
export function useVideos(channelId: string) {
  const result = useInfiniteScroll<VideosResponse>({
    queryKey: ['videoAnalysis', channelId],
    queryFn: ({ pageParam }) => fetchVideoAnalysis(channelId, pageParam),
    // channelId가 없으면 fetch하지 않음
    enabled: !!channelId,
  })

  // 모든 페이지의 videos 배열을 하나의 배열로 병합
  const videos = result.data?.pages.flatMap((page) => page.videos) ?? []

  return { ...result, videos }
}

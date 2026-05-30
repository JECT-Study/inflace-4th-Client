import { useMemo } from 'react'

import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

import { fetchVideoList } from '../api/videosApi'
import type { VideoFilterParams, VideosResponse } from './types'

export function useVideos(channelId: string, params?: VideoFilterParams) {
  const result = useInfiniteScroll<VideosResponse>({
    queryKey: ['videoList', channelId, params],
    queryFn: ({ pageParam }) =>
      fetchVideoList(channelId, { ...params, cursor: pageParam ?? undefined }),
  })

  const videos = useMemo(
    () => result.data?.pages.flatMap((page) => page.videos) ?? [],
    [result.data?.pages]
  )

  return { ...result, videos }
}

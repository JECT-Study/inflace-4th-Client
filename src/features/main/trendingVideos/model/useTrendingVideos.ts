import { useQuery } from '@tanstack/react-query'

import { fetchTrendingVideos } from '../api/trendingVideosApi'

// channelId가 빈 값이면 쿼리를 비활성화(enabled: false)하여 호출하지 않음
export function useTrendingVideos(channelId: string) {
  return useQuery({
    queryKey: ['trendingVideos', channelId],
    queryFn: () => fetchTrendingVideos(channelId),
    enabled: !!channelId,
  })
}

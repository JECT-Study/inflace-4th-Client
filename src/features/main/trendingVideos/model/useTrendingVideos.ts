import { useQuery } from '@tanstack/react-query'

import { fetchTrendingVideos } from '../api/trendingVideosApi'

export function useTrendingVideos(channelId: string) {
  return useQuery({
    queryKey: ['trendingVideos', channelId],
    queryFn: () => fetchTrendingVideos(channelId),
    enabled: !!channelId,
  })
}

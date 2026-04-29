import { useQuery } from '@tanstack/react-query'
import { fetchChannelTrendingVideo } from '../api/channelTrendingVideoApi'

export function useChannelTrendingVideo(channelId: string, isShort: boolean) {
  return useQuery({
    queryKey: ['channelDashboard', channelId, 'trendingVideo', isShort],
    queryFn: () => fetchChannelTrendingVideo(channelId, isShort),
    enabled: !!channelId,
  })
}

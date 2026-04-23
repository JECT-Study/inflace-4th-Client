import { useQuery } from '@tanstack/react-query'
import {
  fetchChannelTrendingVideo,
  type ContentType,
} from '../api/channelTrendingVideoApi'

export function useChannelTrendingVideo(
  channelId: string,
  contentType: ContentType
) {
  return useQuery({
    queryKey: ['channelDashboard', channelId, 'trendingVideo', contentType],
    queryFn: () => fetchChannelTrendingVideo(channelId, contentType),
    enabled: !!channelId,
  })
}

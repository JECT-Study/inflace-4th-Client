import { useQuery } from '@tanstack/react-query'

import { fetchVideoList } from '../api/videosApi'
import type { VideoFilterParams } from './types'

export function useVideos(channelId: string, params?: VideoFilterParams) {
  return useQuery({
    queryKey: ['videoList', channelId, params],
    queryFn: () => fetchVideoList(channelId, params),
    enabled: !!channelId,
  })
}

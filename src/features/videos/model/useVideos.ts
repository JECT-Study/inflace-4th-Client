import { useQuery } from '@tanstack/react-query'

import { fetchVideoAnalysis } from '../api/videosApi'

export function useVideos(channelId: string) {
  return useQuery({
    queryKey: ['videoAnalysis', channelId],
    queryFn: () => fetchVideoAnalysis(channelId),
    enabled: !!channelId,
  })
}

import { useQuery } from '@tanstack/react-query'

import { fetchVideoAnalysis } from '../api/videoAnalysisApi'

export function useVideoAnalysis(channelId: string) {
  return useQuery({
    queryKey: ['videoAnalysis', channelId],
    queryFn: () => fetchVideoAnalysis(channelId),
    enabled: !!channelId,
  })
}

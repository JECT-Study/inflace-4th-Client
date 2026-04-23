import { useQuery } from '@tanstack/react-query'
import { fetchVideoStats } from '../api/videoStatsApi'

export function useVideoStats(videoId: string) {
  return useQuery({
    queryKey: ['videoStats', videoId],
    queryFn: () => fetchVideoStats(videoId),
    enabled: !!videoId,
  })
}

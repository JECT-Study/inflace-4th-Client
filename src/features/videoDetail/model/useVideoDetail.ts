import { useQuery } from '@tanstack/react-query'
import { fetchVideoDetail } from '../api/videoDetailApi'

export function useVideoDetail(videoId: string) {
  return useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => fetchVideoDetail(videoId),
    enabled: !!videoId,
  })
}

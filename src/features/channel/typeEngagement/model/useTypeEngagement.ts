import { useQuery } from '@tanstack/react-query'
import { fetchTypeEngagement } from '../api/typeEngagementApi'

export function useTypeEngagement(channelId: string) {
  return useQuery({
    queryKey: ['typeEngagement', channelId],
    queryFn: () => fetchTypeEngagement(channelId),
    enabled: !!channelId,
  })
}

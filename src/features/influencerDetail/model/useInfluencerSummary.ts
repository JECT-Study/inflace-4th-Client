import { useQuery } from '@tanstack/react-query'
import { fetchInfluencerSummary } from '../api/influencerSummaryApi'

export function useInfluencerSummary(channelId: string) {
  return useQuery({
    queryKey: ['influencerSummary', channelId],
    queryFn: () => fetchInfluencerSummary(channelId),
    enabled: !!channelId,
  })
}

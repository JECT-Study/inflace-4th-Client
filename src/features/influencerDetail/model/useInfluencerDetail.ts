import { useQuery } from '@tanstack/react-query'
import { fetchInfluencerDetail } from '../api/influencerDetailApi'

export function useInfluencerDetail(channelId: string) {
  return useQuery({
    queryKey: ['influencerDetail', channelId],
    queryFn: () => fetchInfluencerDetail(channelId),
    enabled: !!channelId,
  })
}

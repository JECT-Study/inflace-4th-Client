import { useQuery } from '@tanstack/react-query'
import { fetchSubscriberGrowth } from '../api/useSubscriberGrowthApi'

export function useSubscriberGrowth(channelId: string, range: string) {
  return useQuery({
    queryKey: ['channelDashboard', channelId, range],
    queryFn: () => fetchSubscriberGrowth(channelId, range),
    enabled: !!channelId,
  })
}

import { useQuery } from '@tanstack/react-query'
import { fetchSubscriberGrowth } from '../api/subscriberGrowthApi'

export function useSubscriberGrowth(channelId: string, range: string) {
  return useQuery({
    queryKey: ['subscriberGrowth', channelId, range],
    queryFn: () => fetchSubscriberGrowth(channelId, range),
    enabled: !!channelId,
  })
}

import { useQuery } from '@tanstack/react-query'
import { fetchSubscriberChart } from '../api/subscriberChartApi'

export function useSubscriberChart(channelId: string) {
  return useQuery({
    queryKey: ['subscriberChart', channelId],
    queryFn: () => fetchSubscriberChart(channelId),
    enabled: !!channelId,
  })
}

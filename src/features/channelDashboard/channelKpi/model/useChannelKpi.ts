import { useQuery } from '@tanstack/react-query'
import { fetchChannelKpi } from '../api/channelKpiApi'

export function useChannelKpi(channelId: string) {
  return useQuery({
    queryKey: ['channelDashboard', channelId],
    queryFn: () => fetchChannelKpi(channelId),
    enabled: !!channelId,
  })
}

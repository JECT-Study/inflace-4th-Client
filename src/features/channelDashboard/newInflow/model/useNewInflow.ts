import { useQuery } from '@tanstack/react-query'
import { fetchNewInflow } from '../api/newInflowApi'

export function useNewInflow(channelId: string, isShort: boolean) {
  return useQuery({
    queryKey: ['channelDashboard', channelId, 'newInflow', isShort],
    queryFn: () => fetchNewInflow(channelId, isShort),
    enabled: !!channelId,
  })
}

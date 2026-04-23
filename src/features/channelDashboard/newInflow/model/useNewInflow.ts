import { useQuery } from '@tanstack/react-query'
import { fetchNewInflow, type ContentType } from '../api/newInflowApi'

export function useNewInflow(channelId: string, contentType: ContentType) {
  return useQuery({
    queryKey: ['channelDashboard', channelId, 'newInflow', contentType],
    queryFn: () => fetchNewInflow(channelId, contentType),
    enabled: !!channelId,
  })
}

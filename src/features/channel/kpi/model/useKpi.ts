import { useQuery } from '@tanstack/react-query'
import { fetchKpi } from '../api/kpiApi'

export function useKpi(channelId: string) {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => fetchKpi(channelId),
    enabled: !!channelId,
  })
}

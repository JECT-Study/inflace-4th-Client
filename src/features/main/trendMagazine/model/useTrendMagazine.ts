import { useQuery } from '@tanstack/react-query'

import { fetchTrendMagazine } from '../api/trendMagazineApi'

export function useTrendMagazine(channelId: string) {
  return useQuery({
    queryKey: ['trendMagazine', channelId],
    queryFn: () => fetchTrendMagazine(channelId),
    enabled: !!channelId,
  })
}

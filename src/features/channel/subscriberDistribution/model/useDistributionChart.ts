import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchSubscriberDistribution } from '../api/DistributionChartApi'

type DistributionToggle = 'countries' | 'ages'

export function useDistributionChart(channelId: string) {
  const [filter, setFilter] = useState<DistributionToggle>('countries')

  const query = useQuery({
    queryKey: ['distributionChart', channelId, filter],
    queryFn: () => fetchSubscriberDistribution(channelId, ['genders', filter]),
    enabled: !!channelId,
  })

  return { ...query, filter, setFilter }
}

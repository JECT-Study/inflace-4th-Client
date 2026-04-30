import { useQuery } from '@tanstack/react-query'

import { fetchInfluencers } from '../api/influencerApi'

export function useInfluencers() {
  return useQuery({
    queryKey: ['influencers'],
    queryFn: fetchInfluencers,
  })
}

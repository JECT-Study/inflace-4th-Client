import { useQuery } from '@tanstack/react-query'

import { fetchChannelProfile } from '../api/channelProfileApi'

export function useChannelProfile(id: string) {
  return useQuery({
    queryKey: ['channelProfile', id],
    queryFn: () => fetchChannelProfile(id),
    enabled: !!id,
  })
}

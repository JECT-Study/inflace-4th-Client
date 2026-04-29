import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/shared/api/authStore'
import { fetchChannelProfile } from '../api/channelProfileApi'

export function useChannelProfile() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['channelProfile'],
    queryFn: () => fetchChannelProfile(),
    enabled: !!accessToken,
  })
}

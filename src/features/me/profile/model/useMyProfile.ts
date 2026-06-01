import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/shared/api/authStore'
import { fetchMyProfile } from '../api/myProfileApi'

export function useMyProfile() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => fetchMyProfile(),
    enabled: !!accessToken,
  })
}

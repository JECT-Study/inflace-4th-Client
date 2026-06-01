import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  putPreferences,
  EditPreferencesPayload,
} from '../api/editPreferencesApi'
import type { MyProfileDto } from '../types'

export function useEditPreferences() {
  const queryClient = useQueryClient()

  /**
   * 유저의 직업 및 기능 변경 시 낙관적 업데이트
   * 서버 응답을 기다리지 않고 즉시 캐시를 업데이트
   * 실패 시 이전 값으로 롤백
   */
  return useMutation({
    mutationFn: putPreferences,
    onMutate: async (payload: EditPreferencesPayload) => {
      await queryClient.cancelQueries({ queryKey: ['myProfile'] })

      const previous = queryClient.getQueryData<MyProfileDto>(['myProfile'])

      queryClient.setQueryData<MyProfileDto>(['myProfile'], (old) => {
        if (!old) return old
        return {
          ...old,
          preferences: {
            roles: payload.roles,
            needs: payload.needs,
          },
        }
      })

      return { previous }
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData<MyProfileDto>(['myProfile'], data.responseDto)
      }
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['myProfile'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] })
    },
  })
}

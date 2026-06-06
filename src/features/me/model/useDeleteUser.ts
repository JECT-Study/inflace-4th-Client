import { useMutation } from '@tanstack/react-query'

import { deleteUser } from '../api/userApi'

export const useDeleteUser = () =>
  useMutation({
    mutationFn: deleteUser,
  })

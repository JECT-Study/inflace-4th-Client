import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  postProfileImageUploadUrl,
  uploadFileToS3,
  putProfileImage,
} from '../api/profileImageApi'

export function useEditProfileImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const { uploadUrl, objectKey } = await postProfileImageUploadUrl({
        contentType: file.type,
        fileSize: file.size,
      })

      await uploadFileToS3(uploadUrl, file)

      return putProfileImage({ objectKey })
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['myProfile'], updatedProfile)
    },
  })
}

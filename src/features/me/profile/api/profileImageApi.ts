import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type {
  ProfileImageUploadUrlRequest,
  ProfileImageUploadUrlResponse,
  ProfileImageUpdateRequest,
  MyProfileDto,
} from '../types'

export async function postProfileImageUploadUrl(
  payload: ProfileImageUploadUrlRequest,
): Promise<ProfileImageUploadUrlResponse> {
  const response = await axiosInstance.post<
    ApiResponse<ProfileImageUploadUrlResponse>
  >('/user/profile-image/upload-url', payload)
  return response.data.responseDto
}

export async function uploadFileToS3(
  uploadUrl: string,
  file: File,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
  if (!response.ok) {
    throw new Error(`S3 업로드 실패: ${response.status}`)
  }
}

export async function putProfileImage(
  payload: ProfileImageUpdateRequest,
): Promise<MyProfileDto> {
  const response = await axiosInstance.put<ApiResponse<MyProfileDto>>(
    '/user/profile-image',
    payload,
  )
  return response.data.responseDto
}

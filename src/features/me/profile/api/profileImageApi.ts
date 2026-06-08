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
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)
  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error(`S3 업로드 실패: ${response.status}`)
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('S3 업로드 타임아웃: 30초 초과')
    }
    throw error
  } finally {
    clearTimeout(timeout)
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

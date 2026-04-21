'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/features/auth'
import { useVideos, VideoList } from '@/features/videos'
import { SearchAndFilter } from '@/widgets/videos'

export function VideosPage() {
  const router = useRouter()
  const { isInitializing, user } = useAuth()

  /* TODO: 백엔드 명세 변경 후 + IN-211 PR 머지 후 로직 변경*/
  /* 유저가 유튜브 채널을 연동하지 않았다면 /으로 리다이렉트 */
  useEffect(() => {
    if (!isInitializing && !user?.youtubeChannelName) {
      router.replace('/')
    }
  }, [isInitializing, user?.youtubeChannelName, router])

  const channelId = user?.id ?? ''
  const { data } = useVideos(channelId)

  return (
    <>
      <SearchAndFilter />
      <VideoList videos={data?.videos ?? []} />
    </>
  )
}

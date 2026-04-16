'use client'

import { useParams } from 'next/navigation'

import { ChannelProfileSection } from '@/widgets/landingAfterLogin/channelProfile'
import { TrendingVideosSection } from '@/widgets/landingAfterLogin/trendingVideos'
import { TrendMagazineSection } from '@/widgets/landingAfterLogin/trendMagazine'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth'

export function ChannelProfilePage() {
  /* 유저가 로그아웃 상태라면 해당 페이지가 아닌
   * home 페이지를 렌더링함
   */
  const router = useRouter()
  const { isLoggedIn, isInitializing, user } = useAuth()

  useEffect(() => {
    if (!isInitializing && !isLoggedIn && !user?.id) {
      router.replace(`/`)
    }
  }, [isInitializing, isLoggedIn, user?.id, router])

  const params = useParams<{ id: string }>()
  const id = params!.id

  return (
    <div className='flex flex-col divide-y'>
      {/* 프로필 카드 */}
      <ChannelProfileSection channelId={id} />

      {/* 콘텐츠 */}
      <div className='felx h-fit w-full flex-col px-24 pt-40 pb-96'>
        <TrendingVideosSection channelId={id} />
        <TrendMagazineSection channelId={id} />
      </div>
    </div>
  )
}

'use client'

import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { TrendingVideosSection } from '@/widgets/main/trendingVideos'
import { TestTrendMagazineSection } from '@/widgets/main/testTrendMagazine'
import { useAuth } from '@/features/auth'
import { useYoutubeConnectModal } from '@/features/auth/model/useYoutubeConnectModal'
import { Button } from '@/shared/ui/button'

export function ChannelProfilePage() {
  const { user } = useAuth()
  const channelId = user?.userChannelDetails?.youtubeChannelId
  const openYoutubeConnectModal = useYoutubeConnectModal((s) => s.open)

  if (!channelId) {
    return (
      <div className='flex flex-col divide-y'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-16 p-3xl'>
          <p className='text-noto-body-md-normal text-text-and-icon-secondary'>
            유튜브 채널을 연동하면 채널 분석을 시작할 수 있어요
          </p>
          <Button
            color='primary'
            variant='filled'
            size='md'
            onClick={openYoutubeConnectModal}>
            유튜브 연동하기
          </Button>
        </div>

        <div className='flex h-fit w-full flex-col px-24 pt-40 pb-96'>
          <TestTrendMagazineSection />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col divide-y'>
      {/* 프로필 카드 */}
      <ChannelProfileSection channelId={channelId} isExpanded={false} />

      {/* 콘텐츠 */}
      <div className='flex h-fit w-full flex-col px-24 pt-40 pb-96'>
        <TrendingVideosSection channelId={channelId} />
        <TestTrendMagazineSection />
      </div>
    </div>
  )
}

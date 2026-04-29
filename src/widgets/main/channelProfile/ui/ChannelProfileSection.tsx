import { Users, Video } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import {
  ChannelProfileCard,
  ChannelRefreshButton,
  ChannelStatItem,
  LatestUploadDateCard,
} from '@/entities/main/channelProfile'
import {
  format10Thousands,
  formatThousands,
  formatDate,
} from '@/shared/lib/format'
import {
  useChannelProfile,
  mockChannelProfile,
} from '@/features/main/channelProfile'
import RedirectIcon from '@/shared/assets/redirect-bold.svg'

type ChannelProfileSectionVariant = 'default' | 'dashboard'


interface ChannelProfileSectionProps {
  channelId: string
  isExpanded: boolean
  variant?: ChannelProfileSectionVariant
}

// 채널 정보를 표시하는 위젯
// 채널 아이콘과 구독자수, 동영상 수, 최근 업로드일 표시.
export function ChannelProfileSection({
  channelId,
  isExpanded,
  variant = 'default',
}: ChannelProfileSectionProps) {
  const { data: apiData, isLoading } = useChannelProfile(channelId)
  const data = apiData ?? mockChannelProfile

  if (isLoading) {
    return (
      //스켈레톤 UI, 로딩중일 때 상태를 표시합니다.
      <section className='flex h-fit w-full flex-col gap-[10rem] p-(--semantic-breakpoint-spacing-3xl) md:flex-row'>
        <Skeleton className='h-48 w-48 rounded-full' />
        <div className='flex flex-1 flex-col gap-3'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-28' />
          <div className='mt-4 grid grid-cols-3 gap-4'>
            <Skeleton className='h-20' />
            <Skeleton className='h-20' />
            <Skeleton className='h-20' />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('flex flex-col gap-[10rem] p-3xl md:flex-row', variant === 'dashboard' ? 'bg-white' : 'bg-background-gray-default')}>
      {/* 채널 기본 정보 */}
      <ChannelProfileCard
        profileImageUrl={data.profileImageUrl}
        name={data.name}
        channelHandle={data.channelHandle}
        category={data.category}
      />

      <div className='flex h-fit w-full flex-col gap-12'>
        {/* 상세정보  */}
        <div className='flex h-fit w-full flex-col gap-12'>
          {/* 유튜브 스튜디오 링크 */}
          <span className='flex items-center justify-end px-4 py-2 text-noto-label-xs-thin text-text-and-icon-tertiary transition-colors hover:bg-gray-50'>
            <a
              href={data.youtubeStudioUrl}
              target='_blank'
              rel='noopener noreferrer'>
              YouTube Studio
            </a>
            <RedirectIcon />
          </span>

          {/* 구독자 수, 총 동영상 수, 최근 업로드일 */}
          <div className='flex flex-col gap-4 md:flex-row'>
            {/* 구독자 수 */}
            <ChannelStatItem
              icon={<Users size={16} />}
              label={'구독자 수'}
              value={format10Thousands(data.subscriberCount)}
              unit={'명'}
              variant={variant}
            />

            {/* 총 동영상 수 */}
            <ChannelStatItem
              icon={<Video size={16} />}
              label={'총 동영상 수'}
              value={formatThousands(data.videoCount)}
              unit={'개'}
              variant={variant}
            />

            {/* 최근 업로드일  */}
            <LatestUploadDateCard value={formatDate(data.latestUploadDate)} variant={variant} />
          </div>
        </div>

        {/* 대시보드용 새로고침 */}
        {isExpanded && (
          <ChannelRefreshButton
            queryKeys={[
              ['channelProfile', channelId],
              ['channelDashboard', channelId],
            ]}
          />
        )}
      </div>
    </section>
  )
}

import { Users, Video } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
  ChannelStatItem,
  LatestUploadDateCard,
} from '@/entities/main/channelProfile'
import FaviconIcon from '@/shared/assets/favicon.svg'
import RedirectIcon from '@/shared/assets/redirect-bold.svg'

interface ChannelProfileEmptyStateProps {
  onConnect: () => void
}

// 유튜브 채널을 아직 연동하지 않았을 때 보여주는 채널 프로필 빈 상태 위젯
export function ChannelProfileEmptyState({
  onConnect,
}: ChannelProfileEmptyStateProps) {
  return (
    <section className='flex flex-col gap-[10rem] bg-background-gray-default p-3xl md:flex-row'>
      {/* 채널 연동 안내 + 연동 버튼 */}
      <div className='flex h-fit w-full items-center gap-32'>
        <FaviconIcon className='size-[15rem] shrink-0 rounded-full' />

        <div className='flex flex-1 flex-col gap-8 py-28'>
          <h2 className='text-ibm-heading-md-normal text-text-and-icon-default'>
            유튜브 채널 연동이 필요해요
          </h2>
          <Button color='primary' variant='filled' size='md' onClick={onConnect}>
            연동하기
          </Button>
        </div>
      </div>

      <div className='flex h-fit w-full flex-col items-end gap-12'>
        {/* 유튜브 스튜디오 링크 (연동 전이라 비활성 표시) */}
        <span className='flex cursor-not-allowed items-center justify-end gap-2 px-4 py-2 text-noto-label-xs-thin text-text-and-icon-tertiary'>
          YouTube Studio
          <RedirectIcon />
        </span>

        {/* 구독자 수, 총 동영상 수, 최근 업로드일 (연동 전이라 빈 값 표시) */}
        <div className='flex w-full flex-col gap-4 md:flex-row'>
          <ChannelStatItem icon={<Users size={16} />} label='구독자 수' value='-' unit='명' />
          <ChannelStatItem icon={<Video size={16} />} label='총 동영상 수' value='-' unit='개' />
          <LatestUploadDateCard value={{ year: '-', month: '-', day: '-' }} />
        </div>
      </div>
    </section>
  )
}

'use client'

import { useParams } from 'next/navigation'
import { ChannelProfileSection } from '@/widgets/main/channelProfile'
import { ChannelKpiSection } from '@/widgets/channel/channelKpi'

export function ChannelPage() {
  const params = useParams<{ id: string }>()
  const id = params!.id

  return (
    <div className='flex flex-col gap-y-24 divide-y bg-background-gray-default'>
      {/* 프로필 카드 */}

      <ChannelProfileSection
        channelId={id}
        isExpanded={true}
        variant='dashboard'
      />
      <div className='border-0 px-24'>
        <ChannelKpiSection channelId={id} />
      </div>
    </div>
  )
}

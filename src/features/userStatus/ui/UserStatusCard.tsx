'use client'

import { UserAvatar } from './UserAvatar'
import { PlanButton } from './PlanButton'
import type { UserStatusData } from '../model/types'
import { ChannelStatus } from './ChannelStatus'

interface UserStatusCardProps {
  user: UserStatusData // 사용자 정보 (이름, 프로필 이미지, 플랜, 채널 연동 여부 등)
  onPlanUpgrade?: () => void // 플랜 업그레이드 버튼 클릭 시 호출되는 콜백
  onChannelConnect?: () => void // 채널 연동 버튼 클릭 시 호출되는 콜백
  onLogout?: () => void // 로그아웃 버튼 클릭 시 호출되는 콜백
  isChannelConnected?: boolean // 유튜브 채널 연동 여부 (true: 연동됨, false/undefined: 미연동)
}

export const UserStatusCard = ({
  user,
  onPlanUpgrade,
  onChannelConnect,
}: UserStatusCardProps) => {
  return (
    <div className='flex flex-col px-sm'>
      <div className='flex w-full flex-col gap-y-12 rounded-10 border-1 border-[var(--color-stroke-border-primary)] bg-[var(--color-background-gray-default)] p-2xs'>
        {user.isChannelConnected ? (
          <>
            <div className='flex items-center gap-12'>
              <UserAvatar src={user.imageUrl} name={user.name} showBadge />
              <div className='flex min-w-0 flex-1 flex-col gap-6'>
                <p className='truncate text-[13px] leading-[var(--leading-caption-md)] font-medium tracking-[-0.195px] text-[var(--color-text-and-icon-default)]'>
                  {user.name}
                </p>
                <p className='text-[13px] leading-[var(--leading-caption-md)] font-normal tracking-[-0.195px] text-[var(--color-brand-primary)]'>
                  {user.plan}
                </p>
              </div>
            </div>

            <PlanButton plan={user.plan} onClick={onPlanUpgrade} />
          </>
        ) : (
          <ChannelStatus onConnect={onChannelConnect} />
        )}
      </div>
    </div>
  )
}

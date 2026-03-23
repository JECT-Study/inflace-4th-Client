'use client'

import { UserAvatar } from './UserAvatar'
import { PlanButton } from './PlanButton'

export const UserStatusCard = () => {
  return (
    <div className='flex flex-col px-sm'>
      <div className='flex w-full flex-col gap-y-12 rounded-10 border border-[var(--color-stroke-border-primary)] bg-[var(--color-background-gray-default)] p-2xs'>
        <div className='flex items-center gap-12'>
          <UserAvatar size='default' showBadge />
          <div className='flex min-w-0 flex-1 flex-col gap-6'>
            <p className='truncate text-[length:var(--text-label-sm)] leading-[var(--leading-caption-md)] font-medium text-[var(--color-text-and-icon-default)]'>
              말줄임표를 적용한 닉네임입니다
            </p>
            <p className='text-[length:var(--text-label-sm)] leading-[var(--leading-caption-md)] text-[var(--color-brand-primary)]'>
              starter
            </p>
          </div>
        </div>

        <PlanButton />

        {/* 채널 미연동 컴포넌트 */}
        {/* <ChannelStatus /> */}
      </div>
    </div>
  )
}

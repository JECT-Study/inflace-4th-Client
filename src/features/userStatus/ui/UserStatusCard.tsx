'use client'

import { useAuthStore } from '@/shared/api/authStore'
import { UserAvatar } from './UserAvatar'
import { PlanButton } from './PlanButton'
import { ChannelStatus } from './ChannelStatus'

export const UserStatusCard = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const plan = useAuthStore((state) => state.user?.plan)

  if (accessToken) {
    return (
      <div className='flex flex-col px-sm'>
        <div className='flex w-full flex-col gap-y-12 rounded-10 border border-(--color-stroke-border-primary) bg-background-gray-default p-2xs'>
          <div className='flex items-center gap-12'>
            <UserAvatar size='default' showBadge />
            <div className='flex min-w-0 flex-1 flex-col gap-6'>
              <p className='truncate text-(length:--text-label-sm) leading-(--leading-caption-md) font-medium text-text-and-icon-default'>
                말줄임표를 적용한 닉네임입니다
              </p>
              <p className='text-(length:--text-label-sm) leading-(--leading-caption-md) text-brand-primary'>
                {plan?.toLowerCase() ?? 'free'}
              </p>
            </div>
          </div>

          <PlanButton />
        </div>
      </div>
    )
  }

  /* 로그인 상태가 아니라면 채널 미연동 표시 */
  return (
    <div className='flex flex-col px-sm'>
      <div className='flex w-full flex-col gap-y-12 rounded-10 border border-(--color-stroke-border-primary) bg-background-gray-default p-2xs'>
        <ChannelStatus />
      </div>
    </div>
  )
}

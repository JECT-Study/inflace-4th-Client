'use client'

import { AuthStatusButton } from '@/features/auth'
import { UserAvatar } from '@/features/userStatus/ui/UserAvatar'
import { Logo } from '@/shared/ui/Logo'

export function Header() {
  return (
    <>
      <header className='sticky top-0'>
        <div className='absolute top-0 left-0 flex h-[var(--spacing-header-height)] w-full items-center border-b border-(--sidebar-border) bg-white px-34'>
          <div className='flex shrink-0 basis-full items-center justify-between'>
            <Logo variant='header' />
            <div className='flex items-center gap-x-16'>
              <AuthStatusButton />

              <UserAvatar size={'sm'} showBadge={false} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

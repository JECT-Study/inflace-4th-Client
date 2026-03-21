'use client'

import { AuthStatusButton } from '@/features/auth'
import { mockUserFree } from '@/features/userStatus/model/mock'
import { UserAvatar } from '@/features/userStatus/ui/UserAvatar'
import { Logo } from '@/shared/ui/Logo'

export function Header() {
  return (
    <>
      <header className='sticky top-0'>
        <div className='absolute top-0 left-0 flex h-[66px] w-full items-center border-b border-(--sidebar-border) bg-white px-34'>
          <div className='flex shrink-0 basis-full items-center justify-between'>
            <Logo variant='header' />
            <div className='flex items-center gap-x-16'>
              <AuthStatusButton />

              <UserAvatar
                src={mockUserFree.imageUrl}
                name={mockUserFree.name}
                size={'sm'}
                showBadge={false}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

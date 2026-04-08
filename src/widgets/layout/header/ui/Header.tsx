'use client'

import { LoginButton } from '@/features/auth'

import { Logo } from '@/shared/ui/Logo'

export function Header() {
  return (
    <>
      <header className='sticky top-0 z-11 h-header-height'>
        <div className='absolute top-0 left-0 flex h-header-height w-full items-center border-b border-sidebar-border bg-white px-34'>
          <div className='flex shrink-0 basis-full items-center justify-between'>
            <Logo variant='header' />
            <div className='flex items-center gap-x-16'>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

'use client'

import { Sidebar, SidebarContent } from '@/shared/ui/shadcn/sidebar'
import { NavGroupList } from '@/features/navigation/ui/NavGroupList'
import { UserStatusCard } from '@/features/userStatus'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='mt-header-height size-fit w-full flex-col items-center gap-16 overscroll-contain'>
        <UserStatusCard />

        <NavGroupList />
      </SidebarContent>
    </Sidebar>
  )
}

'use client'

import { Sidebar, SidebarContent } from '@/shared/ui/shadcn/sidebar'
import { NavGroupList } from '@/features/navigation/ui/NavGroupList'
import { ChannelStatusCard } from '@/features/navigation/ui/ChannelStatusCard'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='mt-header-height size-fit w-full flex-col items-center gap-16 overscroll-contain'>
        <ChannelStatusCard />

        <NavGroupList />
      </SidebarContent>
    </Sidebar>
  )
}

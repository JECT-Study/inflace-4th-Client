'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/shadcn/sidebar'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '../model/navItems'
import { NavMenuItem } from './NavMenuItem'

export function NavGroupList() {
  const currentPath = usePathname()
  return (
    <>
      {NAV_ITEMS.map((group) => {
        return (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = currentPath
                  ? currentPath === item.url ||
                    currentPath.startsWith(item.url + '/')
                  : false
                return (
                  <NavMenuItem
                    key={item.title}
                    item={item}
                    isActive={isActive}
                  />
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        )
      })}
    </>
  )
}

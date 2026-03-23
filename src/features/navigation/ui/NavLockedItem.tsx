import { SidebarMenuItem, SidebarMenuButton } from '@/shared/ui/sidebar'
import { SidebarIcon } from '@/features/navigation/ui/NavSidebarIcon'
import type { NavItem } from '../model/types'
import Link from 'next/link'

interface LockedNavItemProps {
  item: NavItem
}

export const NavLockedItem = ({ item }: LockedNavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Link
          href={item.url}
          className='flex w-full items-center justify-between gap-8'>
          {item.icon && (
            <SidebarIcon
              name={item.icon}
              className='transition-colors [&>path]:fill-current'
              size={20}
            />
          )}
          <span>{item.title}</span>
          <SidebarIcon
            name={'lock'}
            className='ml-auto shrink-0 [&_path]:fill-[#ccc]'
            size={16}
          />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

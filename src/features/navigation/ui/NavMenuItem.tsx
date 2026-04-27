import { SidebarMenuItem, SidebarMenuButton } from '@/shared/ui/shadcn/sidebar'
import { SidebarIcon } from '@/features/navigation/ui/NavSidebarIcon'
import type { NavItem } from '../model/types'
import Link from 'next/link'

interface NavMenuItemProps {
  item: NavItem
}

export const NavMenuItem = ({ item }: NavMenuItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Link
          href={item.url}
          className='flex items-center gap-8'>
          {item.icon && (
            <SidebarIcon
              name={item.icon}
              className='shrink-0 [&>path]:fill-current'
              size={18}
            />
          )}
          <span className='whitespace-nowrap'>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

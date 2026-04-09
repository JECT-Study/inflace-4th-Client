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
          className='flex items-center justify-between gap-8'>
          {item.icon && (
            <SidebarIcon
              name={item.icon}
              className='[&>path]:fill-current'
              size={20}
            />
          )}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

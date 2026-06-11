import { SidebarMenuItem, SidebarMenuButton } from '@/shared/ui/shadcn/sidebar'
import { SidebarIcon } from '@/features/navigation/ui/NavSidebarIcon'
import { useLoginModal } from '@/features/auth/model/useLoginModal'
import { useYoutubeConnectModal } from '@/features/auth/model/useYoutubeConnectModal'
import { useAuth } from '@/features/auth/model/useAuth'
import type { NavItem } from '../model/types'
import Link from 'next/link'

interface NavMenuItemProps {
  item: NavItem
}

export const NavMenuItem = ({ item }: NavMenuItemProps) => {
  const { isLoggedIn, user } = useAuth()
  const openLoginModal = useLoginModal((s) => s.open)
  const openYoutubeConnectModal = useYoutubeConnectModal((s) => s.open)

  const isChannelConnected = Boolean(
    user?.userChannelDetails?.youtubeChannelId &&
      user?.userChannelDetails?.youtubeChannelName
  )

  const handleClick = (e: React.MouseEvent) => {
    if (item.requiresAuth && !isLoggedIn) {
      e.preventDefault()
      openLoginModal()
      return
    }
    if (item.requiresChannel && !isChannelConnected) {
      e.preventDefault()
      openYoutubeConnectModal()
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Link
          href={item.url}
          className='flex items-center gap-8'
          onClick={handleClick}>
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

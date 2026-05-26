import { SidebarMenuItem, SidebarMenuButton } from '@/shared/ui/shadcn/sidebar'
import { SidebarIcon } from '@/features/navigation/ui/NavSidebarIcon'
import { useLoginModal } from '@/features/auth/model/useLoginModal'
import { useAuth } from '@/features/auth/model/useAuth'
import type { NavItem } from '../model/types'
import Link from 'next/link'

interface NavMenuItemProps {
  item: NavItem
}

export const NavMenuItem = ({ item }: NavMenuItemProps) => {
  const { isLoggedIn } = useAuth()
  const openLoginModal = useLoginModal((s) => s.open)

  // 인증이 필요한 항목을 미로그인 상태로 클릭하면 페이지 이동을 막고 모달 오픈
  const handleClick = (e: React.MouseEvent) => {
    if (item.requiresAuth && !isLoggedIn) {
      e.preventDefault()
      openLoginModal()
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

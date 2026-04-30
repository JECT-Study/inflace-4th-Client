import { UserPlan } from '@/shared/api/types'

export type IconName =
  | 'sidebar'
  | 'dashboard'
  | 'video'
  | 'search'
  | 'chart'
  | 'resing'
  | 'article'
  | 'message'
  | 'question'
  | 'lock'

export interface SidebarIconProps {
  name: IconName
  className?: string
  size?: number | string
}

export interface NavItem {
  id?: string | number
  title: string
  icon?: IconName
  url: string
  requiredPlan?: UserPlan
}

export interface NavGroup {
  id: number
  group: string
  items: NavItem[]
}

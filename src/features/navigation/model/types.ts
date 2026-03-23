import type { IconName } from '@/features/navigation/ui/NavSidebarIcon'

export type UserPlan = 'free' | 'starter' | 'growth'

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

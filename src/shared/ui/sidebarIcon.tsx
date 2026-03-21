import IconSidebar from '@/shared/assets/icons/iconSidebar.svg'
import IconDashboard from '@/shared/assets/icons/iconDashboard.svg'
import IconVideo from '@/shared/assets/icons/iconVideo.svg'
import IconSearch from '@/shared/assets/icons/iconSearch.svg'
import IconChart from '@/shared/assets/icons/iconChart.svg'
import IconStrategy from '@/shared/assets/icons/iconStrategy.svg'
import IconMessage from '@/shared/assets/icons/iconMessage.svg'
import IconTrend from '@/shared/assets/icons/iconTrend.svg'
import IconInfo from '@/shared/assets/icons/iconInformation.svg'
import IconLock from '@/shared/assets/icons/iconLockDisable.svg'

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>

export type IconName =
  | 'sidebar'
  | 'dashboard'
  | 'video'
  | 'search'
  | 'chart'
  | 'strategy'
  | 'trend'
  | 'message'
  | 'info'
  | 'lock'

interface SidebarIconProps {
  name: IconName
  className?: string
  size?: number | string
}

const iconMap: Record<IconName, SVGComponent> = {
  sidebar: IconSidebar,
  dashboard: IconDashboard,
  video: IconVideo,
  search: IconSearch,
  chart: IconChart,
  strategy: IconStrategy,
  trend: IconTrend,
  message: IconMessage,
  info: IconInfo,
  lock: IconLock,
}

export const SidebarIcon = ({
  name,
  className,
  size = 18,
}: SidebarIconProps) => {
  const IconComponent = iconMap[name]

  if (!IconComponent) return null

  return (
    <IconComponent
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        display: 'block',
      }}
    />
  )
}

import IconSidebar from '@/shared/assets/iconSidebar.svg';
import IconDashboard from '@/shared/assets/iconDashboard.svg'
import IconVideo from '@/shared/assets/iconVideo.svg';
import IconSearch from '@/shared/assets/iconSearch.svg';
import IconPropose from '@/shared/assets/iconPropose.svg';
import IconMessage from '@/shared/assets/iconMessage.svg';
import IconTrend from '@/shared/assets/iconTrend.svg';
import IconInfo from '@/shared/assets/iconInformation.svg'

export type IconName = 'sidebar' | 'dashboard' | 'video' | 'search' | 'propose' | 'message' | 'trend' | 'info';

interface SidebarIconProps {
    name: IconName;
    className?: string;
    size?: number | string;
}

const iconMap: Record<IconName, any> = {
    sidebar: IconSidebar,
    dashboard: IconDashboard,
    video: IconVideo,
    search: IconSearch,
    propose: IconPropose,
    message: IconMessage,
    trend: IconTrend,
    info: IconInfo
};

export const SidebarIcon = ({ name, className, size = 18 }: SidebarIconProps) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) return null;
    
    return (
        <IconComponent
            className={className}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                flexShrink: 0,
                display: 'block'
            }}
        />
    );
};
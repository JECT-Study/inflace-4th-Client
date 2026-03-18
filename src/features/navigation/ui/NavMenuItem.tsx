import { SidebarMenuItem, SidebarMenuButton } from "@/shared/ui/sidebar";
import { SidebarIcon } from "@/shared/icons/sidebarIcon";
import { Lock } from "lucide-react";
import { NavItem } from "../config";

interface NavMenuItemProps {
    item: NavItem;
    isRestricted: boolean;
}

export const NavMenuItem = ({ item, isRestricted }: NavMenuItemProps) => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                disabled={isRestricted}
                onClick={() => { if (!isRestricted) { } }}
            >
                <SidebarIcon
                    name={item.icon as any}
                    className="[&>path]:fill-current transition-colors"
                    size={20}
                />
                <span>{item.title}</span>
                {isRestricted && <Lock className="ml-auto size-3.5 opacity-60" />}
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
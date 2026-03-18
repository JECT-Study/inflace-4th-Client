import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/shared/ui/sidebar";
import { NAV_ITEMS, UserPlan } from "../config";
import { NavMenuItem } from "./NavMenuItem";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { Button } from "@/shared/ui/button";
import { SaveIcon } from "lucide-react";

export function NavGroupList({ userPlan }: { userPlan: UserPlan }) {
    return (
        <>
            {NAV_ITEMS.map((group) => {
                const isRestricted = group.id === 4 && userPlan === 'free';

                return (
                    <SidebarGroup key={group.group} disabled={isRestricted}>
                        <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <NavMenuItem
                                    key={item.title}
                                    item={item}
                                    isRestricted={isRestricted}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </>
    );
}
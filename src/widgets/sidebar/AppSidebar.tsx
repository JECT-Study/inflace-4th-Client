'use client'

import { Sidebar, SidebarContent, SidebarTrigger } from "@/shared/ui/sidebar";
import { NavGroupList } from "@/features/navigation/ui/NavGroupList";
import { UserPlan } from "@/features/navigation/config";

export function AppSidebar({ userPlan }: { userPlan: UserPlan }) {
    return (
        <Sidebar>
            <SidebarContent className="mt-[66px]">
                <NavGroupList userPlan={userPlan} />
            </SidebarContent>
        </Sidebar>
    );
}
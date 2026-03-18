import { IconName } from "@/shared/icons/sidebarIcon";

export type UserPlan = 'free' | 'starter' | 'growth';

export interface NavItem {
    id?: string | number;
    title: string;
    icon?: IconName;
    url: string;
    minPlan?: string;
}

export interface NavGroup {
    id: number;
    group: string;
    items: NavItem[];
}

export const NAV_ITEMS: NavGroup[] = [
    {
        id: 1,
        group: "내 채널 관리",
        items: [
            { title: "대시보드 홈", icon: "dashboard", url: "" },
            { title: "영상 성과 분석", icon: "video", url: "" },
        ],
    },
    {
        id: 2,
        group: "인플루언서 찾기",
        items: [
            { title: "통합 검색", icon: "search", url: "" },
        ],
    },
    {
        id: 3,
        group: "커뮤니케이션",
        items: [
            { title: "협업 제안 이력", icon: "propose", url: "" },
            { title: "메시지 수신함", icon: "message", url: "" },
        ],
    },
    {
        id: 4,
        group: "비즈니스 전략",
        items: [
            { title: "경쟁사 벤치마크", icon: "dashboard", url: "", minPlan: "starter" },
            { title: "트렌드 분석", icon: "trend", url: "", minPlan: "starter" },
        ],
    },
    {
        id: 5,
        group: "지원",
        items: [
            { title: "고객센터", icon: "info", url: ""},
        ],
    },
];
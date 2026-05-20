import { create } from 'zustand'

type SidebarState = {
  open: boolean
  setOpen: (open: boolean) => void
}

// 앱 전체 글로벌 사이드바(shadcn SidebarProvider)의 열림/닫힘 상태
export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarState = {
  open: boolean
  setOpen: (open: boolean) => void
}

// 앱 전체 글로벌 사이드바(shadcn SidebarProvider)의 열림/닫힘 상태
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      open: true,
      setOpen: (open) => set({ open }),
    }),
    { name: 'sidebar-store' }
  )
)

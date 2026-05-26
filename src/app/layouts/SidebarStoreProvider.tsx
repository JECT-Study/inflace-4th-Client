'use client'

import { SidebarProvider } from '@/shared/ui/shadcn/sidebar'
import { useSidebarStore } from '@/shared/api'

export function SidebarStoreProvider({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebarStore()

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {children}
    </SidebarProvider>
  )
}

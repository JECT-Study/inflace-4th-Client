'use client'

import { cn } from '@/shared/lib/utils'

export const TAB = {
  PERFORMANCE: 'performance',
  ADVERTISEMENT: 'advertisement',
} as const

const TABS = [
  { id: TAB.PERFORMANCE, label: '성과' },
  { id: TAB.ADVERTISEMENT, label: '광고' },
] as const

export type Tab = (typeof TAB)[keyof typeof TAB]

interface TabGroupProps {
  activeTab: Tab
  onTabChange: (id: Tab) => void
}

export function TabGroup({ activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className='flex h-fit w-full rounded-12 bg-background-gray-stronger p-2'>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'w-[50%] rounded-12 py-16 text-noto-label-lg-bold',
            activeTab === tab.id
              ? 'border-1 border-brand-primary bg-white text-brand-primary'
              : 'text-text-and-icon-secondary'
          )}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

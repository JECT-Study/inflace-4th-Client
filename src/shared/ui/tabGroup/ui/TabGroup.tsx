'use client'

import { cn } from '@/shared/lib/utils'

interface TabItem<T extends string> {
  id: T
  label: string
}

interface TabGroupProps<T extends string> {
  tabs: readonly TabItem<T>[]
  activeTab: T
  onTabChange: (id: T) => void
  type?: 'fill' | 'fit'
}

export function TabGroup<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  type = 'fill',
}: TabGroupProps<T>) {
  return (
    <div
      className={cn(
        'flex h-fit rounded-12 bg-background-gray-stronger p-2',
        type === 'fill' ? 'w-full' : 'w-fit'
      )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'rounded-12 py-16 text-noto-label-lg-bold',
            type === 'fill' ? 'flex-1' : 'w-fit px-16',
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

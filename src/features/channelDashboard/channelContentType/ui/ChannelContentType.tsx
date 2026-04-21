import { cn } from '@/shared/lib/utils'

export const FILTER_OPTIONS = ['롱폼', '숏폼'] as const
export type FilterOption = (typeof FILTER_OPTIONS)[number]

export const FILTER_TO_TYPE: Record<FilterOption, string> = {
  롱폼: '',
  숏폼: 'SHORT_FORM',
}

interface Props {
  active: FilterOption
  onActiveChange: (option: FilterOption) => void
}

// 채널 분석 공통 옵션 (롱폼, 숏폼)
export function ChannelContentType({ active, onActiveChange }: Props) {
  return (
    <div className='flex h-full w-fit gap-8 text-noto-label-sm-normal text-text-and-icon-disabled'>
      {FILTER_OPTIONS.map((option, index) => (
        <button
          key={option}
          onClick={() => onActiveChange(option)}
          className={cn(
            'flex cursor-pointer items-center px-8 py-4',
            active === option && 'text-text-and-icon-primary',
            index > 0 &&
              'relative after:absolute after:top-1/2 after:-left-4 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-text-and-icon-disabled after:content-[""]'
          )}>
          {option}
        </button>
      ))}
    </div>
  )
}

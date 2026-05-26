import { Select } from 'radix-ui'
import { cn } from '@/shared/lib/utils'
import { mockYoutubeCategories } from '@/entities/youtubeCategory/mock/mockYoutubeCategories'
import IconDown from '@/shared/assets/down-bold.svg'

type SelectOption = { value: string; label: string }

const CATEGORY_OPTIONS: SelectOption[] = mockYoutubeCategories.map(
  ({ id, title }) => ({ value: String(id), label: title })
)

export function CategoryDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className='flex flex-col gap-12'>
      <p className='text-noto-label-md-bold text-text-and-icon-primary'>
        카테고리
      </p>
      <Select.Root
        value={value || undefined}
        onValueChange={onChange}>
        <Select.Trigger
          className={cn(
            'group flex h-fit w-full cursor-pointer items-center justify-between gap-10 rounded-6 border border-stroke-border-gray-stronger bg-white px-16 py-12 text-left outline-none',
            'hover:bg-btn-secondary-outlined-hover',
            'data-placeholder:text-text-and-icon-disabled',
            'not-data-placeholder:text-text-and-icon-primary'
          )}>
          <span className='w-[16.2rem] text-noto-label-md-normal transition-colors'>
            <Select.Value placeholder='카테고리 선택' />
          </span>
          <Select.Icon asChild>
            <IconDown className='size-20 text-text-and-icon-secondary transition-transform group-data-[state=open]:rotate-180' />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position='popper'
            side='bottom'
            avoidCollisions={false}
            className={cn(
              'z-50 mt-8 flex h-fit w-[38rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]',
              'data-open:animate-in data-open:fade-in-0',
              'data-closed:animate-out data-closed:fade-out-0'
            )}>
            <Select.Viewport className='grid grid-cols-2 gap-2'>
              {CATEGORY_OPTIONS.map(({ value: v, label }) => (
                <Select.Item
                  key={v}
                  value={v}
                  className={cn(
                    'flex cursor-pointer items-center rounded-4 px-12 py-10 text-noto-label-md-normal text-text-and-icon-secondary outline-none select-none',
                    'hover:bg-btn-secondary-outlined-hover hover:text-text-and-icon-default'
                  )}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

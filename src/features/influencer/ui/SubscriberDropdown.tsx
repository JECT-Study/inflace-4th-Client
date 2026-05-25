import { useState } from 'react'

import { Button } from '@/shared/ui/button'

type SubscriberQuery = { from: string; to: string }

type SubscriberDropdownProps = {
  defaultFrom?: string
  defaultTo?: string
  onChange: (output: string, query: SubscriberQuery) => void
}

function SubscriberDropdown({
  defaultFrom = '',
  defaultTo = '',
  onChange,
}: SubscriberDropdownProps) {
  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)

  function handleConfirm() {
    const output = from || to ? `${from || '0'}명 ~ ${to || ''}명` : '전체'

    onChange(output, { from, to })
  }

  return (
    <div className='flex h-fit w-[32rem] flex-col gap-16 rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      <div className='flex h-fit w-full flex-col gap-2'>
        <span className='text-noto-label-md-normal text-text-and-icon-disabled'>
          직접 입력
        </span>

        <div className='flex h-fit w-full items-center gap-10'>
          <div className='flex h-fit w-full items-center gap-4'>
            <input
              type='number'
              min={0}
              placeholder='min'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className='flex h-fit w-full flex-1 [appearance:textfield] items-center gap-24 rounded-6 border px-16 py-12 text-noto-label-md-normal text-text-and-icon-secondary outline-none placeholder:text-text-and-icon-tertiary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />

            <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
              명
            </span>
          </div>

          <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
            ~
          </span>

          <div className='flex h-fit w-full items-center gap-4'>
            <input
              type='number'
              min={0}
              placeholder='max'
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className='flex h-fit w-full flex-1 [appearance:textfield] items-center gap-24 rounded-6 border px-16 py-12 text-noto-label-md-normal text-text-and-icon-secondary outline-none placeholder:text-text-and-icon-tertiary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />

            <span className='text-noto-label-md-normal text-text-and-icon-secondary'>
              명
            </span>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          color='secondary'
          variant='filled'
          size='sm'
          disabled={
            (from === '' && to === '') ||
            (from !== '' && to !== '' && Number(from) > Number(to))
          }
          onClick={handleConfirm}>
          완료
        </Button>
      </div>
    </div>
  )
}

export { SubscriberDropdown }
export type { SubscriberQuery }

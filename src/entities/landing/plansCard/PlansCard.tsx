import { Button } from '@/shared/ui/button'
import { PlansCardItem } from '@/entities/landing/plansCard/config/types'

import IconCheck from '@/shared/assets/check-bold.svg'

export function PlansCard({
  planName,
  price,
  period,
  features,
  buttonLabel,
}: PlansCardItem) {
  return (
    <>
      <div className='bd-[var(--color-stroke-border-primary)] flex min-h-[480px] flex-col rounded-[var(--radius-12)] border bg-[var(--color-background-gray-default)] p-[var(--spacing-xl)] text-[var(--color-text-and-icon-default)] md:last:col-span-2 lg:last:col-span-1'>
        <span className='text-[length:var(--text-title-lg)] leading-[var(--leading-title-lg)] font-semibold'>
          {planName}
        </span>
        <h5 className='mt-[var(--spacing-2xs)] flex items-center gap-[var(--spacing-4)] text-[length:var(--text-heading-md)] leading-[var(--leading-heading-lg)] font-semibold'>
          {price}
          {period && (
            <span className='text-[length:var(--text-body-xs)] font-semibold text-[var(--color-text-and-icon-secondary)]'>
              {}
            </span>
          )}
        </h5>
        <ul className='mt-[var(--spacing-xl)] flex flex-col gap-[var(--spacing-8)]'>
          {features.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-[var(--spacing-6)] text-[length:var(--text-body-md)] font-normal ${item.active ? 'text-[var(--color-brand-primary)] [&_path]:fill-[var(--color-brand-primary)]' : ''}`}>
              <IconCheck className='size-[15px]' /> {item.label}
            </li>
          ))}
        </ul>

        <Button
          className='mt-auto'
          color={`${planName == 'Growth' ? 'primary' : 'secondary'}`}
          style={'filled'}>
          {buttonLabel}
        </Button>
      </div>
    </>
  )
}

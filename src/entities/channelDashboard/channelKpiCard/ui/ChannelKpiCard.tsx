import { type ReactNode } from 'react'

interface ChannelKpiCardProps {
  icon?: ReactNode
  label: string
  prefix?: string
  value: number | string
  // tier: number // 상위, 하위 영역 후순위
  unit?: string
}

export function ChannelKpiCard({
  icon,
  label,
  prefix,
  value,
  unit,
}: ChannelKpiCardProps) {
  return (
    <div className='flex h-fit w-full flex-col gap-24 rounded-12 bg-white p-24 shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex h-fit w-full items-center gap-12 text-noto-body-xs-bold text-text-and-icon-default'>
        {icon && (
          <span className='rounded-12 bg-background-brand-default p-4'>
            {icon}
          </span>
        )}
        <span className='text-ibm-title-md-thin'>{label}</span>
      </div>
      <div className='h-fit w-full pl-[4.4rem] text-text-and-icon-default'>
        {prefix && <span className='text-ibm-heading-md-normal'>{prefix}</span>}
        <span className='text-ibm-heading-md-normal'>{value}</span>
        <span className='text-ibm-heading-md-normal'>{unit}</span>
      </div>
    </div>
  )
}

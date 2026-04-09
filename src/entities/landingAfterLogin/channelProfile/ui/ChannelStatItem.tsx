import { type ReactNode } from 'react'

interface ChannelStatItemProps {
  icon?: ReactNode
  label: string
  value: string
  unit?: string
}

//구독자 수, 총 동영상 수, 최근 업로드일을 알려주는 카드 컴포넌트
export function ChannelStatItem({
  icon,
  label,
  value,
  unit,
}: ChannelStatItemProps) {
  return (
    <div className='min-w[168px] flex h-fit w-full flex-col gap-4 rounded-12 border bg-white px-32 py-16'>
      {/* 아이콘 + 내용 ex. 구독자 수 */}
      <div className='flex h-fit w-full items-center gap-4 text-noto-body-xs-bold text-text-and-icon-tertiary'>
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>

      {/* 값 + 단위 ex. 28.5만 명 */}
      <div className='flex h-fit w-full items-center gap-4'>
        <span className='text-ibm-heading-sm-thin text-brand-secondary'>
          {value}
        </span>
        {unit && (
          <span className='font-medium text-text-and-icon-tertiary'>
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

interface ChartTooltipProps {
  topLabel?: string
  primaryValue: string
  annotation?: string
}

export function ChartTooltip({
  topLabel,
  primaryValue,
  annotation,
}: ChartTooltipProps) {
  return (
    <div className='flex flex-col gap-4 rounded-12 bg-white p-20 shadow-[0_0_8px_0_rgba(13,13,13,0.08),0_6px_12px_0_rgba(13,13,13,0.08)]'>
      {topLabel && (
        <p className='text-noto-body-xxs-bold text-text-and-icon-primary'>
          {topLabel}
        </p>
      )}
      <p className='text-noto-title-sm-bold text-brand-primary'>
        {primaryValue}
      </p>
      {annotation && (
        // 컬러값 수정 필요
        <p className='text-noto-body-xs-bold text-feedback-error'>
          {annotation}
        </p>
      )}
    </div>
  )
}

interface HashtagBoxProps {
  label: string
}

export function HashtagBox({ label }: HashtagBoxProps) {
  return (
    <span className='size-fit gap-10 rounded-[10rem] bg-background-gray-stronger px-8 py-4 text-noto-label-xs-normal text-text-and-icon-tertiary'>
      #{label}
    </span>
  )
}

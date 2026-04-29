import { useState } from 'react'
import { formatDate } from '@/shared/lib/format'
import { Button } from '@/shared/ui/button'
import IconRefresh from '@/shared/assets/refresh-bold.svg'

interface ChannelRefreshButtonProps {
  onRefresh: () => void
}

export function ChannelRefreshButton({ onRefresh }: ChannelRefreshButtonProps) {
  const [date, setDate] = useState<string>(() => new Date().toISOString())
  const { year, month, day, hour, minute } = formatDate(date)

  const handleRefresh = () => {
    onRefresh()
    setDate(new Date().toISOString())
  }

  return (
    <div className='flex w-full items-center justify-end gap-12'>
      <p className='text-noto-caption-lg-normal text-text-and-icon-tertiary'>
        {`마지막 업데이트: ${year}년 ${month}월 ${day}일 ${hour}:${minute}`}
      </p>
      <Button
        variant='filled'
        color='gray'
        size='xs'
        leftIcon={<IconRefresh />}
        onClick={handleRefresh}>
        새로고침
      </Button>
    </div>
  )
}

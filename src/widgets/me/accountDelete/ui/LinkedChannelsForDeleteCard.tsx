'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface LinkedChannel {
  id: string
  name: string
  handle: string
  registeredAt: string
  categories: string[]
  selected: boolean
}

/* 디자인 기준 mock 데이터 — 실제 채널 연동 페이지가 구현되면 데이터 소스 교체 예정 */
const MOCK_CHANNELS: LinkedChannel[] = [
  {
    id: '1',
    name: '테크인사이트 TV',
    handle: '@techinisght_tv',
    registeredAt: '2025.10.05',
    categories: ['반려동물/동물', '반려동물/동물', '반려동물/동물'],
    selected: false,
  },
  {
    id: '2',
    name: '뷰티인사이트 TV',
    handle: '@techinisght_tv',
    registeredAt: '2025.10.05',
    categories: ['반려동물/동물', '반려동물/동물', '반려동물/동물'],
    selected: false,
  },
  {
    id: '3',
    name: '트래블인사이트 TV',
    handle: '@techinisght_tv',
    registeredAt: '2025.10.05',
    categories: ['반려동물/동물', '반려동물/동물', '반려동물/동물'],
    selected: true,
  },
]

export function LinkedChannelsForDeleteCard() {
  return (
    <div className='flex w-full flex-col gap-24 rounded-16 bg-white p-32'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-noto-title-md-bold text-text-and-icon-default'>
          연동된 유튜브 채널
        </h2>
        <p className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
          연동된 유튜브 채널들 중 분석을 진행할 채널을 선택해주세요.
        </p>
      </div>

      <ul className='flex flex-col gap-16'>
        {MOCK_CHANNELS.map((channel) => (
          <ChannelRow key={channel.id} channel={channel} />
        ))}
      </ul>
    </div>
  )
}

function ChannelRow({ channel }: { channel: LinkedChannel }) {
  return (
    <li
      className={cn(
        'flex items-center gap-24 rounded-12 border p-24',
        channel.selected
          ? 'border-brand-primary bg-[#5A44F214]'
          : 'border-stroke-border-gray-stronger bg-white'
      )}>
      <div className='relative size-66 shrink-0 overflow-hidden rounded-full bg-background-gray-stronger' />

      <div className='flex min-w-0 flex-1 flex-col gap-4'>
        <div className='flex items-center gap-8'>
          <span className='text-noto-label-lg-bold text-text-and-icon-default'>
            {channel.name}
          </span>
          <div className='flex gap-4'>
            {channel.categories.map((cat, i) => (
              <span
                key={i}
                className='rounded-4 bg-background-gray-stronger px-8 py-2 text-noto-caption-md-normal text-text-and-icon-secondary'>
                #{cat}
              </span>
            ))}
          </div>
        </div>
        <span className='text-noto-caption-md-normal text-text-and-icon-tertiary'>
          {channel.handle}
        </span>
        <p className='text-noto-caption-md-normal text-text-and-icon-tertiary'>
          YouTube Analytics {channel.registeredAt} 연동{' '}
          <button
            type='button'
            className='cursor-pointer text-brand-primary hover:underline'>
            | 연동 해지
          </button>
        </p>
      </div>

      {channel.selected && (
        <Button
          type='button'
          color='primary'
          variant='filled'
          size='sm'
          className='shrink-0'>
          대시보드 보기
        </Button>
      )}
    </li>
  )
}

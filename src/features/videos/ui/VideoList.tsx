import { VideoCard } from '@/entities/videos'
import type { VideoCardItem } from '@/entities/videos'
import type { VideoSort } from '../model/types'

interface SortOption {
  label: string
  value: VideoSort
}

const SORT_OPTIONS: SortOption[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '조회수순', value: 'VIEWS' },
  { label: '좋아요순', value: 'LIKES' },
  { label: 'VPH순', value: 'VPH' },
  { label: 'Outlier순', value: 'OUTLIER' },
]

interface VideoListProps {
  videos: VideoCardItem[]
  selectedSort?: VideoSort
  onSortChange?: (sort: VideoSort) => void
}

export function VideoList({ videos, selectedSort = 'LATEST', onSortChange }: VideoListProps) {
  return (
    <div className='flex h-fit w-full flex-col gap-16 px-24 py-20'>
      {/* 정렬 기준 */}
      <div className='flex size-fit self-end'>
        {SORT_OPTIONS.map((option, index) => (
          <span
            key={option.value}
            className='flex items-center text-noto-label-md-normal text-text-and-icon-tertiary'>
            <button
              type='button'
              aria-pressed={selectedSort === option.value}
              className={`size-fit cursor-pointer px-8 py-4 ${selectedSort === option.value ? 'text-noto-label-md-bold text-brand-secondary' : ''}`}
              onClick={() => onSortChange?.(option.value)}>
              {option.label}
            </button>
            {index < SORT_OPTIONS.length - 1 && '・'}
          </span>
        ))}
      </div>

      <div className='grid h-fit w-full grid-cols-[repeat(auto-fill,minmax(34.6rem,1fr))] gap-24'>
        {videos.map((video) => (
          <VideoCard key={video.videoId} {...video} />
        ))}
      </div>
    </div>
  )
}

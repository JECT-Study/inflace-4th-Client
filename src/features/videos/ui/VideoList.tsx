import { VideoCard } from '@/entities/videos'
import type { VideoCardItem } from '@/entities/videos'

interface VideoListProps {
  videos: VideoCardItem[]
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className='grid h-fit w-full grid-cols-[repeat(auto-fill,minmax(34.6rem,1fr))] gap-24 px-24 py-20'>
      {' '}
      {videos.map((video) => (
        <VideoCard key={video.videoId} {...video} />
      ))}
    </div>
  )
}

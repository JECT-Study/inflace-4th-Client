import { VideoCard } from '@/entities/videos'
import type { VideoCardItem } from '@/entities/videos'

interface VideoListProps {
  videos: VideoCardItem[]
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className='grid h-fit w-full grid-cols-4 gap-24 px-24 py-20 md:grid-cols-3 lg:grid-cols-4'>
      {videos.map((video) => (
        <VideoCard key={video.videoId} {...video} />
      ))}
    </div>
  )
}

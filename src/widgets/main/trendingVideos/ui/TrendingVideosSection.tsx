import { Skeleton } from '@/shared/ui/shadcn/skeleton'
import { VideoCard } from '@/entities/main/videoCard'
import { BlurPlanGate } from '@/features/planGate'
import {
  useTrendingVideos,
  mockTrendingVideos,
} from '@/features/main/trendingVideos'

//인기 급상승 동영상의 리스트를 보여줌
// channelId가 없으면(채널 미연동) API 호출 없이 mock 데이터로 미리보기를 보여줌
export function TrendingVideosSection({ channelId }: { channelId?: string }) {
  const { data, isLoading } = useTrendingVideos(channelId ?? '')
  const videos = data?.length ? data : mockTrendingVideos

  return (
    <section className='flex h-fit w-full flex-col gap-16'>
      {/* 급상승 동영상 헤더 */}
      <div className='flex h-fit w-full flex-col items-start justify-between gap-3'>
        <h3 className='text-ibm-title-lg-normal text-text-and-icon-default'>
          시청자 반응 급상승 동영상
        </h3>

        {/* 서브텍스트 + 더보기 */}
        <div className='flex h-fit w-full justify-between'>
          <p className='text-noto-title-sm-thin text-text-and-icon-tertiary'>
            조회수 대비 참여율이 채널 평균보다 높은 영상이에요
          </p>
        </div>
      </div>

      {/* 급상승 동영상 리스트 */}
      {isLoading ? (
        <div className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-64' />
          ))}
        </div>
      ) : (
        <BlurPlanGate requiredPlan='STARTER'>
          <div className='grid grid-cols-2 gap-4'>
            {videos.slice(0, 4).map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </BlurPlanGate>
      )}
    </section>
  )
}

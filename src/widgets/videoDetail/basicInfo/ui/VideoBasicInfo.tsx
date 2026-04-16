import CalendarIcon from '@/shared/assets/calendar-bold.svg'
import TagIcon from '@/shared/assets/tag-bold.svg'
import { formatDate } from '@/shared/lib/format'
import type { VideoDetailDto } from '@/entities/video'

interface VideoBasicInfoProps {
  video: VideoDetailDto
}

// API는 YouTube watch URL(youtube.com/watch?v=...) 형식만 반환한다고 가정
function getYouTubeVideoId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/)
  return match ? match[1] : null
}

export function VideoBasicInfo({ video }: VideoBasicInfoProps) {
  const { videoUrl, title, description, publishedAt, hashtags } = video
  const displayHashtags = hashtags?.slice(0, 5) ?? []
  const { year, month, day } = formatDate(publishedAt)

  const videoId = getYouTubeVideoId(videoUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null

  return (
    <div className='flex w-full flex-col gap-16 overflow-hidden rounded-8 sm:flex-row sm:items-start sm:gap-24'>
      {/* YouTube iframe */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className='aspect-video w-full shrink-0 rounded-4 sm:aspect-auto sm:h-[170px] sm:w-[302px]'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      ) : (
        <div className='aspect-video w-full shrink-0 rounded-4 bg-stroke-border-gray-default sm:aspect-auto sm:h-[170px] sm:w-[302px]' />
      )}

      {/* 영상 정보 */}
      <div className='flex min-w-0 flex-1 flex-col gap-24 sm:self-stretch'>
        {/* 제목 + 설명 */}
        <div className='flex flex-col gap-8'>
          <p className='w-full text-noto-title-sm-bold text-text-and-icon-default'>
            {title}
          </p>
          {description && (
            <p className='w-full text-noto-body-xs-normal text-text-and-icon-primary'>
              {description}
            </p>
          )}
        </div>

        {/* 업로드 날짜 + 해시태그 */}
        <div className='flex flex-col gap-8'>
          <div className='flex items-center gap-8'>
            <CalendarIcon className='size-16 shrink-0 text-text-and-icon-secondary' />
            <span className='whitespace-nowrap text-noto-label-sm-thin text-text-and-icon-primary'>
              {`${year}년 ${Number(month)}월 ${Number(day)}일`}
            </span>
          </div>

          {displayHashtags.length > 0 && (
            <div className='flex min-w-0 items-center gap-8'>
              <TagIcon className='size-16 shrink-0 text-text-and-icon-secondary' />
              <div className='flex min-w-0 flex-wrap gap-8'>
                {displayHashtags.map((tag) => (
                  <span
                    key={tag}
                    className='whitespace-nowrap rounded-full bg-brand-secondary-weaker px-8 py-4 text-noto-label-sm-thin text-white'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LeftwardsArrowIcon from '@/shared/assets/leftwards-arrow-bold.svg'
import { useAuth } from '@/features/auth'
import { useVideoDetail, mockVideoDetail } from '@/features/videoDetail'
import { VideoBasicInfo } from '@/widgets/videoDetail/basicInfo'

export function VideoDetailPage() {
  const router = useRouter()
  const { isAuthenticated, isInitializing } = useAuth()

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace('/')
    }
  }, [isInitializing, isAuthenticated, router])

  const params = useParams<{ videoId: string }>()
  const videoId = params!.videoId

  const { data: apiData, isLoading, isError } = useVideoDetail(videoId)
  const video = apiData ?? mockVideoDetail

  if (isLoading) return null

  if (isError) {
    return (
      <div className='flex items-center justify-center py-96'>
        <p className='text-noto-body-xs-normal text-text-and-icon-secondary'>
          데이터를 불러올 수 없습니다. 새로고침 해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-24 bg-background-gray-default px-24 pt-24 pb-96'>
      {/* 페이지 타이틀 */}
      <button
        onClick={() => router.back()}
        className='flex h-28 w-fit items-center gap-16 py-4'>
        <LeftwardsArrowIcon className='size-24 shrink-0 text-text-and-icon-default' />
        <p className='text-ibm-title-lg-normal text-text-and-icon-default'>
          영상 상세 분석 대시보드
        </p>
      </button>

      {/* 컨텐츠 */}
      <div className='flex w-full flex-col gap-64'>
        {/* 영상 기본 정보 */}
        <VideoBasicInfo video={video} />

        {/* TODO: 티켓 2 — 핵심 지표 카드 영역 */}

        {/* TODO: 티켓 3 — 시청 지속률 그래프 영역 */}
      </div>
    </div>
  )
}

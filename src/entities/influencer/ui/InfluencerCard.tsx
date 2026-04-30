'use client'

import Image from 'next/image'

import Send from '@/shared/assets/send-bold.svg'
import { format10Thousands } from '@/shared/lib/format'
import { HeartButton } from '@/shared/ui/heart-button'
import type { Influencer } from '../model/types'

export function InfluencerCard({ influencer }: { influencer: Influencer }) {
  const {
    channelName,
    thumbnailUrl,
    categories,
    subscriberCount,
    averageViews,
    averageEngagementRate,
    recentUploadCount30d,
    recentPplBrand,
  } = influencer

  return (
    <div className='flex h-fit w-full min-w-[52.1rem] flex-col gap-72 rounded-12 border border-stroke-border-gray-default p-32'>
      {/* 콘텐츠 */}
      <div className='flex h-fit w-full flex-col gap-24'>
        <div className='flex h-fit w-full items-center gap-16'>
          {/* 채널 아이콘 */}
          <div className='relative size-[7.2rem] shrink-0 overflow-hidden rounded-full'>
            <Image src={thumbnailUrl} alt={channelName} fill />
          </div>

          {/* 채널 이름, 해시태그, 좋아요 버튼 */}
          <div className='flex h-fit w-full flex-col gap-6'>
            <div className='flex h-fit w-full justify-between gap-4'>
              <span className='text-noto-label-lg-bold text-text-and-icon-default'>
                {channelName}
              </span>

              <HeartButton
                initialBookmarked={influencer.bookmarked}
                onToggle={() => {
                  // TODO: 찜 추가/해제 API 호출
                }}
              />
            </div>

            {/* 해시태그 */}
            <div className='flex h-fit w-full flex-wrap gap-12'>
              {categories.map((category) => (
                <span
                  key={category}
                  className='size-fit gap-10 rounded-[10rem] bg-background-gray-stronger px-8 py-4 text-noto-label-xs-normal text-text-and-icon-tertiary'>
                  #{category}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='flex h-fit w-full flex-col gap-24 px-8'>
          {/* 통계 */}
          <div className='flex h-[5.4rem] w-full gap-24'>
            <div className='flex h-[5.4rem] w-full flex-col gap-8'>
              <span className='text-noto-label-sm-thin text-text-and-icon-tertiary'>
                구독자
              </span>
              <span className='text-ibm-title-lg-thin text-[#121212]'>
                {format10Thousands(subscriberCount)}
              </span>
            </div>
            <div className='flex h-[5.4rem] w-full flex-col gap-8'>
              <span className='text-noto-label-sm-thin text-text-and-icon-tertiary'>
                평균 조회수
              </span>
              <span className='text-ibm-title-lg-thin text-[#121212]'>
                {format10Thousands(averageViews)}
              </span>
            </div>
            <div className='flex h-[5.4rem] w-full flex-col gap-8'>
              <span className='text-noto-label-sm-thin text-text-and-icon-tertiary'>
                평균 참여율
              </span>
              <span className='text-ibm-title-lg-thin text-[#121212]'>
                {averageEngagementRate.toFixed(1)}%
              </span>
            </div>
            <div className='flex h-[5.4rem] w-full flex-col gap-8'>
              <span className='text-noto-label-sm-thin whitespace-nowrap text-text-and-icon-tertiary'>
                최근 30일 업로드
              </span>
              <span className='text-ibm-title-lg-thin text-[#121212]'>
                {recentUploadCount30d}회
              </span>
            </div>
          </div>

          {/**최근 PPL 브랜드
           * PPL 브랜드 관련 로직 백엔드에서 논의중
           */}
          <div className='flex size-fit flex-col gap-8'>
            <span className='text-noto-label-sm-thin text-text-and-icon-tertiary'>
              최근 PPL 브랜드
            </span>

            <div className='flex size-fit flex-wrap gap-12'>
              {recentPplBrand.map((brand) => (
                <span
                  key={brand}
                  className='text-noto-label-md-bold text-brand-tertiary-stronger'>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 공유 + 채널 분석 보기 */}
      <div className='flex h-fit w-full items-center gap-16'>
        <button className='flex size-[4.4rem] shrink-0 items-center justify-center gap-10 rounded-6 bg-background-gray-stronger p-10 text-text-and-icon-primary'>
          <Send className='size-20' />
        </button>

        <button className='flex h-fit w-full items-center justify-center gap-10 rounded-6 bg-background-gray-stronger px-20 py-10 text-noto-label-lg-normal text-text-and-icon-primary'>
          채널 분석 보기 →
        </button>
      </div>
    </div>
  )
}

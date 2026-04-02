'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ImgMock from '../assets/mock/onboardingMock.jpg'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

export function OnboardingStep3() {
  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='h-75 pr-(--spacing-lg)'>
          <Swiper
            pagination={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className='h-75 w-full pb-5.5! [&_.swiper-pagination]:bottom-0! [&_.swiper-pagination-bullet]:h-10! [&_.swiper-pagination-bullet]:w-10! [&_.swiper-pagination-bullet]:border! [&_.swiper-pagination-bullet]:border-(--color-stroke-border-neutral-default)! [&_.swiper-pagination-bullet]:bg-white! [&_.swiper-pagination-bullet]:opacity-100! [&_.swiper-pagination-bullet-active]:bg-[#060404]!'>
            <SwiperSlide>
              <Image src={ImgMock.src} alt='임시 목업 이미지' fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={ImgMock.src} alt='임시 목업 이미지' fill />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={ImgMock.src} alt='임시 목업 이미지' fill />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className='pl-14.5'>
          <p className='text-(length:--text-title-sm) leading-(--leading-title-sm) font-medium text-text-and-icon-default'>
            수천 개 채널 중, 딱 맞는 인플루언서만 골라드려요
          </p>
          <p className='mt-(--spacing-xs) text-body-xs leading-(--leading-body-xs) font-normal text-text-and-icon-tertiary'>
            카테고리, 구독자 수, 평균 조회수, 오디언스 성별·연령까지 필터링해서
            캠페인에 맞는 채널만 골라드려요.
          </p>
        </div>
      </div>
    </>
  )
}

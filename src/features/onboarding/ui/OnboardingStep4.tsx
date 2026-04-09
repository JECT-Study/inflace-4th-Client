'use client'

import ImgMock from '../assets/mock/onboardingMock.jpg'
import Image from 'next/image'

export function OnboardingStep4() {
  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='relative h-75 w-98 pr-(--spacing-lg)'>
          <Image src={ImgMock.src} alt='목업 이미지' fill />
        </div>

        <div className='pl-14.5'>
          <p className='text-(length:--text-title-sm) leading-(--leading-title-sm) font-medium text-text-and-icon-default'>
            환영해요, {'김튜브'}님 🎉
            <br />
            유튜브 채널을 연동하고 채널 분석 결과를 확인하세요
          </p>
          <p className='mt-(--spacing-xs) text-body-xs leading-(--leading-body-xs) font-normal text-text-and-icon-tertiary'>
            유튜버 환경이 준비됐어요.
            <br />
            지금 채널 연동하면 채널 성과부터 경쟁사 분석까지 한눈에 파악할 수
            있어요.
          </p>
        </div>
      </div>
    </>
  )
}

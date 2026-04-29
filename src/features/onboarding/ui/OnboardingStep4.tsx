'use client'

import ImgMock from '../assets/mock/onboardingMock.jpg'
import Image from 'next/image'
import { CHANNEL_ANALYSIS_VALUE } from '../model/optionsStep02'
import { Need, useOnboardingModal } from '@/features/onboarding'

export function OnboardingStep4() {
  const { selections } = useOnboardingModal()
  const need = selections[2] as Need[]
  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='relative h-[30rem] w-[39.2rem] pr-lg'>
          <Image src={ImgMock.src} alt='목업 이미지' fill />
        </div>
        <div className='pl-[5.8rem]'>
          {need?.includes(CHANNEL_ANALYSIS_VALUE) ? (
            <>
              <p className='text-noto-title-sm-normal text-text-and-icon-default'>
                환영해요, {'김튜브'}님 🎉
                <br />
                유튜브 채널을 연동하고 채널 분석 결과를 확인하세요
              </p>
              <p className='mt-xs text-noto-body-xs-normal text-text-and-icon-tertiary'>
                유튜버 환경이 준비됐어요.
                <br />
                지금 채널 연동하면 채널 성과부터 경쟁사 분석까지 한눈에 파악할
                수 있어요.
              </p>
            </>
          ) : (
            <>
              <p className='text-noto-title-sm-normal text-text-and-icon-default'>
                환영해요, {'김튜브'}님 🎉
                <br />
                바로 시작해볼까요?
              </p>
              <p className='mt-xs text-noto-body-xs-normal text-text-and-icon-tertiary'>
                마케터 맞춤 기능이 세팅됐어요.
                <br />
                이제 인플루언서 탐색과 트렌드를 한눈에 확인할 수 있어요.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { useLoginModal } from '@/features/auth'
import heroSection01Bg from '@/widgets/home/assets/heroSection01Bg.jpg'
import heroSection02Bg from '@/widgets/home/assets/heroSection02Bg.jpg'
import heroSection02Item from '@/widgets/home/assets/heroSection02Item.png'
import heroSection03Bg from '@/widgets/home/assets/heroSection03Bg.jpg'
import heroSection03Item from '@/widgets/home/assets/heroSection03Item.png'
import IconArrowRight from '@/shared/assets/rightwards-arrow-bold.svg'

export function HeroMain() {
  const open = useLoginModal((s) => s.open)
  return (
    <>
      {/* section01 - intro */}
      <section
        className='relative h-[44rem] w-full snap-start snap-always bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${heroSection01Bg.src})` }}>
        <div className='absolute top-[10.6rem] left-0 flex w-full flex-col items-center gap-24'>
          <h3 className='text-center text-heading-md leading-heading-md text-white'>
            인플루언서와 마케터가 만나는 공간,
            <strong className='bg-gradient-to-b from-[#BBBDF8] to-[#B9CCF6] bg-clip-text text-transparent drop-shadow-[0_0_100px_#5942F8] filter'>
              인플레이스
            </strong>
          </h3>
          <button
            onClick={() =>
              document
                .getElementById('section02')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className='flex size-fit cursor-pointer rounded-full border-1 border-white p-16 py-6 text-body-xs text-white'>
            더 알아보기
          </button>
        </div>
      </section>

      {/* section02 - slide */}
      <section
        id='section02'
        className='relative h-[calc(100vh-var(--spacing-header-height))] w-full snap-start snap-always overflow-hidden bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${heroSection02Bg.src})` }}>
        <div className='absolute top-[20rem] flex flex-col gap-40 px-[12rem]'>
          <h3 className='text-ibm-display-sm-normal text-white'>
            유튜브 스튜디오만으론 부족하니까,
          </h3>
          <p className='flex flex-col gap-12 text-noto-heading-sm-bold text-white'>
            내 채널 분석부터 경쟁 채널 염탐까지 가능
            <span className='text-noto-body-sm-normal text-neutral-200'>
              기본, 유입, 참여, 성장 지표로 나누어 다른 툴보다 더 구체적이고
              <br />
              실질적인 성장 데이터를 한눈에 제공합니다.
            </span>
          </p>
          <Button
            color='secondary'
            size='lg'
            variant='outlined'
            rightIcon={<IconArrowRight />}
            className='bg-white'
            onClick={open}>
            인플루언서로 무료체험 시작
          </Button>
        </div>
        <div className='absolute top-[12.2rem] left-[84.4rem] h-[59.7rem] w-[80rem]'>
          <Image
            src={heroSection02Item.src}
            fill
            alt='인플루언서 영상 성과 분석'
          />
        </div>
      </section>

      {/* section03 - slide */}
      <section
        className='relative h-[calc(100vh-var(--spacing-header-height))] w-full snap-start snap-always overflow-hidden bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${heroSection03Bg.src})` }}>
        <div className='absolute top-[18.5rem] flex flex-col gap-40 px-[12rem]'>
          <h3 className='text-ibm-display-sm-normal text-white'>
            인플루언서 리서치에
            <br />
            밤새던 마케터를 위해,
          </h3>
          <p className='flex flex-col gap-12 text-noto-heading-sm-bold text-white'>
            인플루언서 탐색부터 경쟁사 협업 분석까지, 한 번에
            <span className='text-noto-body-sm-normal text-neutral-200'>
              강력한 가격 경쟁력으로 리소스 낭비 없는 인플루언서/채널 분석
              지표를 경험해 보세요.
            </span>
          </p>
          <Button
            color='secondary'
            size='lg'
            variant='outlined'
            rightIcon={<IconArrowRight />}
            className='bg-white'
            onClick={open}>
            마케터로 무료체험 시작
          </Button>
        </div>
        <div className='absolute top-[12.2rem] left-[84.4rem] h-[56rem] w-[99.3rem]'>
          <Image src={heroSection03Item.src} fill alt='인플루언서 검색' />
        </div>
      </section>
    </>
  )
}

'use client'
import swiper01 from '@/widgets/landing/assets/swiper01.jpg'
import swiper02 from '@/widgets/landing/assets/swiper02.jpg'
import IconSearch from '@/shared/assets/search-bold.svg'
import { Button } from '@/shared/ui/button'

export function HeroMain() {
  return (
    <>
      <section
        className='relative h-[calc(100vh-var(--spacing-header-height))] w-full snap-start snap-always bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${swiper01.src})` }}>
        <div className='absolute top-[162px] left-[120px] text-white'>
          <h3 className='text-[length:var(--text-display-sm)] leading-[var(--leading-display-sm)] font-semibold'>
            인플루언서 선택, 감이 아닌
            <strong className='text-[#8B80FF]'> 데이터</strong>로
          </h3>
          <Button
            color='primary'
            size='lg'
            style='filled'
            className='mt-[var(--spacing-xl)]'>
            무료로 시작하기
          </Button>
        </div>
      </section>

      <section
        className='relative h-[calc(100vh-var(--spacing-header-height))] w-full snap-start snap-always bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${swiper02.src})` }}>
        <div className='absolute top-[162px] left-[120px] text-white'>
          <h3 className='text-[length:var(--text-display-sm)] leading-[var(--leading-display-sm)] font-semibold'>
            진짜 영향력을 가진 인플루언서만,
            <strong className='text-[#8B80FF]'> 인플레이스</strong>
          </h3>
          <p className='mt-[var(--spacing-2xl)] text-[length:var(--text-title-lg)] leading-[var(--leading-title-lg)] font-normal'>
            아직도 일일이 댓글 육안 검토하고 계신가요?
          </p>
          <p className='mt-[var(--spacing-2xs)] text-[length:var(--text-label-md)] leading-[var(--leading-body-sm)] font-normal !text-[var(--color-stroke-border-primary)]'>
            카테고리·구독자·참여율로 딱 맞는 인플루언서를 30초 안에
            찾아드립니다.
            <br />
            가짜 구독자 신뢰도 점수, 봇 댓글 탐지로 예산 낭비 제로!
            <br />
            채널 성과 대시보드로 협업 전후를 데이터로 증명합니다.
          </p>
          <Button
            color='primary'
            size='lg'
            style='filled'
            leftIcon={<IconSearch />}
            className='mt-[var(--spacing-xl)]'>
            인플루언서 검색하기
          </Button>
        </div>
      </section>
    </>
  )
}

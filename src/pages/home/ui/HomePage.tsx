'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/model/useAuth'

import { FeatureSection, HeroMain, PlansSection } from '@/widgets/home'

export default function HomePage() {
  /* 유저가 로그인 한 후라면 해당 페이지가 아닌
   * main 페이지를 렌더링함
   */
  const router = useRouter()

  const { isLoggedIn, isInitializing } = useAuth()

  useEffect(() => {
    if (!isInitializing && isLoggedIn) {
      router.replace('/main')
    }
  }, [isInitializing, isLoggedIn, router])

  /* auth 초기화 완료 후 snap 클래스를 추가하도록 함
   * isInitializing 중에 snap을 활성화하면 컨텐츠 렌더 시점에 snap-start로 강제 스크롤됨
   * 로딩 중 스클롤을 인식해 화면 최하단으로 랜더링 되는 것을 방지함.
   */
  useEffect(() => {
    if (isInitializing) return
    document.documentElement.classList.add('snap-landing')
    const footer = document.querySelector('footer')
    footer?.classList.add('snap-start')
    return () => {
      document.documentElement.classList.remove('snap-landing')
      footer?.classList.remove('snap-start')
    }
  }, [isInitializing])

  if (isInitializing || isLoggedIn) return null

  return (
    <>
      <HeroMain />
      <div className='snap-start'>
        <section className='grid grid-cols-1 gap-(--spacing-md) px-(--spacing-md) py-56 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureSection />
        </section>
        <section className='px-(--spacing-md) py-56'>
          <PlansSection />
        </section>
      </div>
    </>
  )
}

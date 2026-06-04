'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/features/auth/model/useAuth'
import { useLoginModal } from '@/features/auth/model/useLoginModal'

import { FeatureSection, HeroMain, PlansSection } from '@/widgets/home'

function SearchParamsHandler({
  isInitializing,
  isLoggedIn,
}: {
  isInitializing: boolean
  isLoggedIn: boolean
}) {
  const searchParams = useSearchParams()
  const openLoginModal = useLoginModal((s) => s.open)

  // proxy.ts가 보호 경로 접근을 /?from=protected로 리다이렉트하면 로그인 모달 오픈
  useEffect(() => {
    if (
      !isInitializing &&
      !isLoggedIn &&
      searchParams?.get('from') === 'protected'
    ) {
      openLoginModal()
    }
  }, [isInitializing, isLoggedIn, searchParams, openLoginModal])

  return null
}

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
    if (isInitializing || isLoggedIn) return
    document.documentElement.classList.add('snap-landing')
    const footer = document.querySelector('footer')
    footer?.classList.add('snap-start')
    return () => {
      document.documentElement.classList.remove('snap-landing')
      footer?.classList.remove('snap-start')
    }
  }, [isInitializing, isLoggedIn])

  if (isInitializing || isLoggedIn) return null

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler isInitializing={isInitializing} isLoggedIn={isLoggedIn} />
      </Suspense>
      <HeroMain />
      <div className='snap-start'>
        <section className='grid grid-cols-1 gap-md px-md py-56 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureSection />
        </section>
        <section className='px-md py-56'>
          <PlansSection />
        </section>
      </div>
    </>
  )
}

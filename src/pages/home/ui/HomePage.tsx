'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/model/useAuth'
import { FeatureSection, HeroMain, PlansSection } from '@/widgets/landing'

export default function HomePage() {
  /* 유저가 로그인 한 후라면 해당 페이지가 아닌
   * landingAfterLogin 페이지를 렌더링함
   */
  const router = useRouter()
  const { isAuthenticated, isInitializing, user } = useAuth()

  useEffect(() => {
    if (!isInitializing && isAuthenticated && user?.id) {
      router.replace(`/${user.id}`)
    }
  }, [isInitializing, isAuthenticated, user?.id, router])

  useEffect(() => {
    document.documentElement.classList.add('snap-landing')
    const footer = document.querySelector('footer')
    footer?.classList.add('snap-start')
    return () => {
      document.documentElement.classList.remove('snap-landing')
      footer?.classList.remove('snap-start')
    }
  }, [])

  if (isInitializing || (isAuthenticated && user?.id)) return null

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

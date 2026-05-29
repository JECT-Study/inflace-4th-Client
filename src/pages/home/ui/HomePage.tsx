import { FeatureSection, HeroMain, PlansSection } from '@/widgets/home'
import HomeAuthGuard from './HomeAuthGuard'

export default function HomePage() {
  return (
    <HomeAuthGuard>
      <HeroMain />
      <div className='snap-start'>
        <section className='grid grid-cols-1 gap-(--spacing-md) px-(--spacing-md) py-56 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureSection />
        </section>
        <section className='px-(--spacing-md) py-56'>
          <PlansSection />
        </section>
      </div>
    </HomeAuthGuard>
  )
}

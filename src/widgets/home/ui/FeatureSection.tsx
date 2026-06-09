import { FEATURE_CARD_ITEM } from '@/entities/home/featureCard/config/featureCardItem'
import { FeatureCard } from '@/entities/home/featureCard/FeatureCard'

export function FeatureSection() {
  return (
    <>
      {FEATURE_CARD_ITEM.map((item, idx) => (
        <FeatureCard
          key={idx}
          icon={item.icon}
          title={item.title}
          description={item.description}
          imgSrc={item.imgSrc}
        />
      ))}
    </>
  )
}

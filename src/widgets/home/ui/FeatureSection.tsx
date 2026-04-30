import { FEATURE_CARD_ITEM } from '@/entities/home/featureCard/config/featureCardItem'
import { FeatureCard } from '@/entities/home/featureCard/FeatureCard'

export function FeatureSection() {
  return (
    <>
      {FEATURE_CARD_ITEM.map((item, idx) => (
        <FeatureCard
          key={idx}
          title={item.title}
          subTitle={item.subTitle}
          description={item.description}
          imgSrc={item.imgSrc}
          url={item.url}
        />
      ))}
    </>
  )
}

import { StaticImageData } from 'next/image'

export interface FeatureCardItem {
  title: string
  subTitle: string
  description: string
  imgSrc: StaticImageData
  url: string
}

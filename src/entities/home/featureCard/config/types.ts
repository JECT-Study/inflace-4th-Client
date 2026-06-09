import { StaticImageData } from 'next/image'
import React from 'react'

export interface FeatureCardItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  imgSrc: StaticImageData
}

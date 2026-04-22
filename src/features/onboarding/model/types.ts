import { StaticImageData } from 'next/image'

export type UserRole =
  | 'YOUTUBER'
  | 'MARKETER'
  | 'BRAND_MANAGER'
  | 'MCN_AGENCY'
  | 'CONTENT_PLANNER'
  | 'ETC'

export type Need =
  | 'CHANNEL_ANALYSIS'
  | 'INFLUENCER_SEARCH'
  | 'YOUTUBE_CONTENT_SEARCH'
  | 'FAKE_SUBSCRIBER_DETECT'
  | 'COMPETITOR_BENCHMARK'
  | 'COLLAB_PROPOSAL'
  | 'INSIGHT_MAGAZINE'

export interface OnboardingModalState {
  isOpen: boolean
  step: number
  featureIndex: number
  selections: Record<number, string | string[]>
  open: () => void
  close: () => void
  nextStep: () => void
  prevStep: () => void
  nextFeature: () => void
  setSelection: (step: number, value: string | string[]) => void
}
export interface OptionItem {
  value: string
  imgSrc: StaticImageData
  label: string
}

export interface FeatureSlide {
  title: string
  desc: string
  image: StaticImageData
}

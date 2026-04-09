import { StaticImageData } from 'next/image'

export interface OnboardingModalState {
  isOpen: boolean
  step: number
  selections: Record<number, string | string[]>
  open: () => void
  close: () => void
  nextStep: () => void
  prevStep: () => void
  setSelection: (step: number, value: string | string[]) => void
}
export interface OptionItem {
  value: string
  imgSrc: StaticImageData
  label: string
}

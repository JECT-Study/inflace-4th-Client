export interface DistributionItem {
  label: string
  percentage: number
}

export interface SubscriberDistributionsResponseDto {
  gender: DistributionItem[]
  age: DistributionItem[]
  country: DistributionItem[]
}
export interface SubscriberRatioDto {
  count: number
  ratio: number
}

export type DistributionsFilter = 'countries' | 'ages' | 'genders'

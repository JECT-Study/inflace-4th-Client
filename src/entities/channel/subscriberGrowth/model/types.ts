export interface SubscriberGrowthPoint {
  date: string
  subscriberCount: number
}

export interface SubscriberGrowthDto {
  points: SubscriberGrowthPoint[]
}

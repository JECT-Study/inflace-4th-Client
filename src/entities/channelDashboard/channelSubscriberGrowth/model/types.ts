export interface SubscriberGrowthPoint {
  date: string
  subscriberCount: number
}

export interface ChannelSubscriberGrowthDto {
  points: SubscriberGrowthPoint[]
}

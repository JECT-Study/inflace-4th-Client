import type { StaticImageData } from 'next/image'
export type Plan = 'free' | 'starter' | 'growth'

export interface UserStatusData {
  name: string
  imageUrl: string | StaticImageData
  plan: Plan
  isChannelConnected: boolean
}

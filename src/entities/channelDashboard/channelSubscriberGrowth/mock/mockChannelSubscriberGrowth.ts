import type { ChannelSubscriberGrowthDto } from '../model/types'

export const mockSubscriberGrowth1Week: ChannelSubscriberGrowthDto = {
  points: [
    { date: '2026-04-11', subscriberCount: 27800 },
    { date: '2026-04-12', subscriberCount: 27850 },
    { date: '2026-04-13', subscriberCount: 27900 },
    { date: '2026-04-14', subscriberCount: 27950 },
    { date: '2026-04-15', subscriberCount: 28000 },
    { date: '2026-04-16', subscriberCount: 28060 },
    { date: '2026-04-17', subscriberCount: 28120 },
  ],
}

export const mockSubscriberGrowth1Month: ChannelSubscriberGrowthDto = {
  points: [
    { date: '2026-03-18', subscriberCount: 25000 },
    { date: '2026-03-23', subscriberCount: 25600 },
    { date: '2026-03-28', subscriberCount: 26200 },
    { date: '2026-04-02', subscriberCount: 26800 },
    { date: '2026-04-07', subscriberCount: 27400 },
    { date: '2026-04-12', subscriberCount: 27800 },
    { date: '2026-04-17', subscriberCount: 28120 },
  ],
}

export const mockSubscriberGrowth3Months: ChannelSubscriberGrowthDto = {
  points: [
    { date: '2026-01-17', subscriberCount: 20000 },
    { date: '2026-02-01', subscriberCount: 21500 },
    { date: '2026-02-16', subscriberCount: 23000 },
    { date: '2026-03-03', subscriberCount: 24500 },
    { date: '2026-03-18', subscriberCount: 26000 },
    { date: '2026-04-02', subscriberCount: 27300 },
    { date: '2026-04-17', subscriberCount: 28120 },
  ],
}

export const mockSubscriberGrowth6Months: ChannelSubscriberGrowthDto = {
  points: [
    { date: '2025-10-19', subscriberCount: 14000 },
    { date: '2025-11-19', subscriberCount: 16500 },
    { date: '2025-12-19', subscriberCount: 19000 },
    { date: '2026-01-19', subscriberCount: 21500 },
    { date: '2026-02-19', subscriberCount: 23800 },
    { date: '2026-03-19', subscriberCount: 26000 },
    { date: '2026-04-19', subscriberCount: 28120 },
  ],
}

export const mockSubscriberGrowth1Year: ChannelSubscriberGrowthDto = {
  points: [
    { date: '2025-04-22', subscriberCount: 8000 },
    { date: '2025-06-22', subscriberCount: 12000 },
    { date: '2025-08-22', subscriberCount: 16000 },
    { date: '2025-10-22', subscriberCount: 20000 },
    { date: '2025-12-22', subscriberCount: 23500 },
    { date: '2026-02-22', subscriberCount: 26500 },
    { date: '2026-04-22', subscriberCount: 28120 },
  ],
}

// 기본값 (fallback)
export const mockChannelSubscriberGrowth = mockSubscriberGrowth1Month

import type { SubscriberGrowthDto } from '../model/types'

export const mockSubscriberGrowth1Week: SubscriberGrowthDto = {
  points: [
    { date: '2026-06-05', subscriberCount: 1273 },
    { date: '2026-06-06', subscriberCount: 1275 },
    { date: '2026-06-07', subscriberCount: 1276 },
    { date: '2026-06-08', subscriberCount: 1278 },
    { date: '2026-06-09', subscriberCount: 1280 },
    { date: '2026-06-10', subscriberCount: 1281 },
    { date: '2026-06-11', subscriberCount: 1282 },
    { date: '2026-06-12', subscriberCount: 1284 },
  ],
}

export const mockSubscriberGrowth1Month: SubscriberGrowthDto = {
  points: [
    { date: '2026-05-12', subscriberCount: 1241 },
    { date: '2026-05-19', subscriberCount: 1252 },
    { date: '2026-05-26', subscriberCount: 1262 },
    { date: '2026-06-02', subscriberCount: 1271 },
    { date: '2026-06-09', subscriberCount: 1280 },
    { date: '2026-06-12', subscriberCount: 1284 },
  ],
}

export const mockSubscriberGrowth3Months: SubscriberGrowthDto = {
  points: [
    { date: '2026-03-12', subscriberCount: 1080 },
    { date: '2026-03-26', subscriberCount: 1130 },
    { date: '2026-04-09', subscriberCount: 1165 },
    { date: '2026-04-23', subscriberCount: 1200 },
    { date: '2026-05-07', subscriberCount: 1225 },
    { date: '2026-05-21', subscriberCount: 1255 },
    { date: '2026-06-12', subscriberCount: 1284 },
  ],
}

export const mockSubscriberGrowth6Months: SubscriberGrowthDto = {
  points: [
    { date: '2025-12-12', subscriberCount: 812 },
    { date: '2026-01-12', subscriberCount: 902 },
    { date: '2026-02-12', subscriberCount: 1006 },
    { date: '2026-03-12', subscriberCount: 1080 },
    { date: '2026-04-12', subscriberCount: 1171 },
    { date: '2026-05-12', subscriberCount: 1241 },
    { date: '2026-06-12', subscriberCount: 1284 },
  ],
}

export const mockSubscriberGrowth1Year: SubscriberGrowthDto = {
  points: [
    { date: '2025-06-12', subscriberCount: 356 },
    { date: '2025-07-12', subscriberCount: 421 },
    { date: '2025-08-12', subscriberCount: 492 },
    { date: '2025-09-12', subscriberCount: 572 },
    { date: '2025-10-12', subscriberCount: 651 },
    { date: '2025-11-12', subscriberCount: 731 },
    { date: '2025-12-12', subscriberCount: 812 },
    { date: '2026-01-12', subscriberCount: 902 },
    { date: '2026-02-12', subscriberCount: 1006 },
    { date: '2026-03-12', subscriberCount: 1080 },
    { date: '2026-04-12', subscriberCount: 1171 },
    { date: '2026-05-12', subscriberCount: 1241 },
    { date: '2026-06-12', subscriberCount: 1284 },
  ],
}

// 기본값 (fallback)
export const mockSubscriberGrowth = mockSubscriberGrowth1Month

import type { AdvertisementFilterResponseDto } from '../model/types'

export const mockAdvertisementFilter: AdvertisementFilterResponseDto = {
  videoCount: 23,
  avgViewsByContentType: [
    { format: 'LONG_FORM', avgViewCount: 380000, avgEngagementRate: 5.05 },
    { format: 'SHORT_FORM', avgViewCount: 147000, avgEngagementRate: 6.24 },
  ],
  categoryDistribution: [
    { category: '노하우/스타일', count: 15, percentage: 65 },
    { category: '엔터테인먼트', count: 8, percentage: 35 },
  ],
  contentTypeDistribution: [
    { format: 'LONG_FORM', count: 20, percentage: 87 },
    { format: 'SHORT_FORM', count: 3, percentage: 13 },
  ],
  adScore: {
    score: 87,
    label: '높음',
    viewStability: '높음',
    viewStabilityCv: 0.82,
    subscriptionHealth: '높음',
    subscriptionHealthRate: 15.2,
    collaborationExperience: '높음',
    collaborationRate: 22.0,
  },
}

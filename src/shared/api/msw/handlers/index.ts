import { authHandlers } from './authHandlers'
import { channelProfileHandlers } from './channelProfileHandlers'
import { onboardingHandlers } from './onboardingHandlers'
import { trendMagazineHandlers } from './trendMagazineHandlers'
import { trendingVideosHandlers } from './trendingVideosHandlers'
import { channelKpiHandlers } from './channelKpiHandlers'
import { subscriberGrowthHandlers } from './subscriberGrowthHandlers'
import { channelTrendingVideoHandlers } from './channelTrendingVideoHandlers'
import { newInflowHandlers } from './newInflowHandlers'

export const handlers = [
  ...authHandlers,
  ...channelProfileHandlers,
  ...trendingVideosHandlers,
  ...trendMagazineHandlers,
  ...onboardingHandlers,
  ...channelKpiHandlers,
  ...subscriberGrowthHandlers,
  ...channelTrendingVideoHandlers,
  ...newInflowHandlers,
]

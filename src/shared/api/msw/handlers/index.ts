import { authHandlers } from './authHandlers'
import { channelProfileHandlers } from './channelProfileHandlers'
import { onboardingHandlers } from './onboardingHandlers'
import { trendMagazineHandlers } from './trendMagazineHandlers'
import { trendingVideosHandlers } from './trendingVideosHandlers'
import { videosHandlers } from './videosHandlers'
import { videoDetailHandlers } from './videoDetailHandlers'
import { kpiHandlers } from './kpiHandlers'
import { subscriberGrowthHandlers } from './subscriberGrowthHandlers'
import { videoStatsHandlers } from './videoStatsHandlers'
import { channelTrendingVideoHandlers } from './channelTrendingVideoHandlers'
import { newInflowHandlers } from './newInflowHandlers'
import { typeEngagementHandlers } from './typeEngagementHandlers'
import { distributionChartHandlers } from './distributionChartHandlers'
import { subscriberChartHandlers } from './subscriberChartHandlers'

export const handlers = [
  ...authHandlers,
  ...channelProfileHandlers,
  ...trendingVideosHandlers,
  ...trendMagazineHandlers,
  ...onboardingHandlers,
  ...videosHandlers,
  ...videoDetailHandlers,
  ...kpiHandlers,
  ...subscriberGrowthHandlers,
  ...videoStatsHandlers,
  ...channelTrendingVideoHandlers,
  ...newInflowHandlers,
  ...typeEngagementHandlers,
  ...subscriberChartHandlers,
  ...distributionChartHandlers,
]

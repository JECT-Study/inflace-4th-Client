import { authHandlers } from './authHandlers'
import { brandCollaborationsHandlers } from './brandCollaborationsHandlers'
import { channelConnectHandlers } from './channelConnectHandlers'
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
import { influencerDetailHandlers } from './influencerDetailHandlers'
import { retentionHandlers } from './retentionHandlers'
import { influencerHandlers } from './influencerHandlers'
import { typeEngagementHandlers } from './typeEngagementHandlers'
import { distributionChartHandlers } from './distributionChartHandlers'
import { subscriberChartHandlers } from './subscriberChartHandlers'
import { influencerSummaryHandlers } from './influencerSummaryHandlers'

export const handlers = [
  ...authHandlers,
  ...brandCollaborationsHandlers,
  ...channelConnectHandlers,
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
  ...influencerDetailHandlers,
  ...retentionHandlers,
  ...influencerHandlers,
  ...typeEngagementHandlers,
  ...distributionChartHandlers,
  ...subscriberChartHandlers,
  ...influencerSummaryHandlers,
]

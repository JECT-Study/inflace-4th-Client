// 실제 백엔드 사용: authHandlers, influencerHandlers, myProfileHandlers, myAlarmHandlers, onboardingHandlers, influencerDetailHandlers, influencerSummaryHandlers
import { brandCollaborationsHandlers } from './brandCollaborationsHandlers'
import { channelConnectHandlers } from './channelConnectHandlers'
import { channelProfileHandlers } from './channelProfileHandlers'
import { trendMagazineHandlers } from './trendMagazineHandlers'
import { trendingVideosHandlers } from './trendingVideosHandlers'
import { videosHandlers } from './videosHandlers'
import { videoDetailHandlers } from './videoDetailHandlers'
import { kpiHandlers } from './kpiHandlers'
import { subscriberGrowthHandlers } from './subscriberGrowthHandlers'
import { videoStatsHandlers } from './videoStatsHandlers'
import { channelTrendingVideoHandlers } from './channelTrendingVideoHandlers'
import { newInflowHandlers } from './newInflowHandlers'
import { retentionHandlers } from './retentionHandlers'
import { typeEngagementHandlers } from './typeEngagementHandlers'
import { distributionChartHandlers } from './distributionChartHandlers'
import { subscriberChartHandlers } from './subscriberChartHandlers'
import { influencerBrandHandlers } from './influencerBrandHandlers'
import { brandAnalysisHandlers } from './brandAnalysisHandlers'

export const handlers = [
  ...brandCollaborationsHandlers,
  ...channelConnectHandlers,
  ...channelProfileHandlers,
  ...trendingVideosHandlers,
  ...trendMagazineHandlers,
  ...videosHandlers,
  ...videoDetailHandlers,
  ...kpiHandlers,
  ...subscriberGrowthHandlers,
  ...videoStatsHandlers,
  ...channelTrendingVideoHandlers,
  ...newInflowHandlers,
  ...retentionHandlers,
  ...typeEngagementHandlers,
  ...distributionChartHandlers,
  ...subscriberChartHandlers,
  ...influencerBrandHandlers,
  ...brandAnalysisHandlers,
]

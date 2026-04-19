import { authHandlers } from './authHandlers'
import { channelProfileHandlers } from './channelProfileHandlers'
import { onboardingHandlers } from './onboardingHandlers'
import { trendMagazineHandlers } from './trendMagazineHandlers'
import { trendingVideosHandlers } from './trendingVideosHandlers'
import { videoDetailHandlers } from './videoDetailHandlers'
import { channelKpiHandlers } from './channelKpiHandlers'
import { videoStatsHandlers } from './videoStatsHandlers'

export const handlers = [
  ...authHandlers,
  ...channelProfileHandlers,
  ...trendingVideosHandlers,
  ...trendMagazineHandlers,
  ...onboardingHandlers,
  ...videoDetailHandlers,
  ...channelKpiHandlers,
  ...videoStatsHandlers,
]

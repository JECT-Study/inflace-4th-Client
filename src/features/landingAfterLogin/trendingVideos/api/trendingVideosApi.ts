import type { VideoCardItem } from '@/entities/landingAfterLogin/videoCard'
import { trendingVideosMock } from '../mock/trendingVideosMock'

export async function fetchTrendingVideos(
  _channelId: string
): Promise<VideoCardItem[]> {
  return trendingVideosMock
}

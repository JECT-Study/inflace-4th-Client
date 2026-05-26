import { useQuery } from '@tanstack/react-query'
import { fetchInfluencerBrandAnalysisApi } from '../api/influencerBrandAnalysisApi'
import { AdvertisementFilterQueryParams } from './types'

export function useInfluencerBrandAnalysis(
  channelId: string,
  filter: AdvertisementFilterQueryParams | null
) {
  return useQuery({
    queryKey: ['influencerBrandAnalysis', channelId, filter],
    queryFn: () =>
      fetchInfluencerBrandAnalysisApi(
        {
          categoryId: filter!.categoryId,
          startDate: filter!.startDate,
          endDate: filter!.endDate,
          videoFormat: filter!.videoFormat,
        },
        channelId
      ),
    enabled: !!channelId && filter !== null,
  })
}

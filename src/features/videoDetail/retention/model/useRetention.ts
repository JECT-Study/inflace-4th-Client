import { useQuery } from '@tanstack/react-query'
import {
  fetchRetention,
  fetchRetentionSummary,
  fetchRetentionDropPoints,
} from '../api/retentionApi'

export function useRetention(videoId: string) {
  return useQuery({
    queryKey: ['retention', videoId],
    queryFn: () => fetchRetention(videoId),
    enabled: !!videoId,
  })
}

export function useRetentionSummary(videoId: string) {
  return useQuery({
    queryKey: ['retentionSummary', videoId],
    queryFn: () => fetchRetentionSummary(videoId),
    enabled: !!videoId,
  })
}

export function useRetentionDropPoints(videoId: string) {
  return useQuery({
    queryKey: ['retentionDropPoints', videoId],
    queryFn: () => fetchRetentionDropPoints(videoId),
    enabled: !!videoId,
  })
}

'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchYoutubeCategories } from '../api/youtubeCategoryApi'

const YOUTUBE_CATEGORIES_QUERY_KEY = ['youtube-categories']

/* YouTube 카테고리는 거의 변하지 않는 고정 데이터라 staleTime을 길게 둠 */
export function useYoutubeCategories() {
  return useQuery({
    queryKey: YOUTUBE_CATEGORIES_QUERY_KEY,
    queryFn: fetchYoutubeCategories,
    staleTime: 1000 * 60 * 60 * 24,
  })
}

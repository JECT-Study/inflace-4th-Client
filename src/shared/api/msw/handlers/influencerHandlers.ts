import { http, HttpResponse } from 'msw'

import { mockInfluencers } from '@/features/influencer/mock/mockInfluencers'
import { mockYoutubeCategories } from '@/entities/youtubeCategory'

export const influencerHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/youtube-categories`, () => {
    return HttpResponse.json({
      responseDto: {
        youtubeCategories: mockYoutubeCategories,
      },
      error: null,
      success: true,
    })
  }),

  http.get(`${process.env.NEXT_PUBLIC_API_URL}/influencers`, ({ request }) => {
    const url = new URL(request.url)
    const categoryIdParams = url.searchParams.getAll('categoryIds').map(Number)

    const filtered =
      categoryIdParams.length > 0
        ? mockInfluencers.filter((influencer) =>
            influencer.categories.some((cat) =>
              categoryIdParams.some(
                (id) =>
                  mockYoutubeCategories.find((mc) => mc.id === id)?.title === cat
              )
            )
          )
        : mockInfluencers

    return HttpResponse.json({
      success: true,
      responseDto: {
        content: filtered,
        pageInfo: {
          size: filtered.length,
          numberOfElements: filtered.length,
          nextCursor: null,
          hasNext: false,
        },
        sort: {
          sorted: true,
          sortCriteria: 'engagement_rate',
          sortOrder: 'DESC',
        },
      },
      error: null,
    })
  }),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/bookmark`,
    ({ params }) => {
      const { channelId } = params
      const influencer = mockInfluencers.find((i) => String(i.channelId) === channelId)
      if (!influencer) {
        return HttpResponse.json(
          { responseDto: '', error: { code: 'NOT_FOUND', message: '인플루언서를 찾을 수 없습니다.' }, success: false },
          { status: 404 }
        )
      }
      influencer.bookmarked = true
      return HttpResponse.json({ responseDto: '북마크가 추가되었습니다.', error: null, success: true })
    }
  ),

  http.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/bookmark`,
    ({ params }) => {
      const { channelId } = params
      const influencer = mockInfluencers.find((i) => String(i.channelId) === channelId)
      if (!influencer) {
        return HttpResponse.json(
          { responseDto: '', error: { code: 'NOT_FOUND', message: '인플루언서를 찾을 수 없습니다.' }, success: false },
          { status: 404 }
        )
      }
      influencer.bookmarked = false
      return HttpResponse.json({ responseDto: '북마크가 해제되었습니다.', error: null, success: true })
    }
  ),
]

import { http, HttpResponse } from 'msw'

import { mockBrandCollaborations } from '@/features/competitor/mock/mockBrandCollaborations'

const PAGE_SIZE = 9

export const brandCollaborationsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations`,
    ({ request }) => {
      const url = new URL(request.url)
      const cursor = url.searchParams.get('cursor')
      const pageSize =
        Number(url.searchParams.get('pageSize')) || PAGE_SIZE
      const sortCriteria = url.searchParams.get('sortCriteria') ?? 'LATEST'
      const sortOrder = url.searchParams.get('sortOrder') ?? 'DESC'

      /* cursor는 단순히 다음 페이지 인덱스를 문자열로 표현 — 첫 요청은 null */
      const pageIndex = cursor ? Number(cursor) : 0
      const start = pageIndex * pageSize
      const end = start + pageSize
      const slice = mockBrandCollaborations.slice(start, end)
      const hasNext = end < mockBrandCollaborations.length
      const nextCursor = hasNext ? String(pageIndex + 1) : null

      return HttpResponse.json({
        success: true,
        responseDto: {
          content: slice,
          pageInfo: {
            size: pageSize,
            numberOfElements: slice.length,
            nextCursor,
            hasNext,
          },
          sort: {
            sorted: true,
            sortCriteria,
            sortOrder,
          },
        },
        error: null,
      })
    }
  ),
]

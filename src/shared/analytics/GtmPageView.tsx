'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { sendGTMEvent } from '@next/third-parties/google'

// App Router는 클라이언트 라우팅 시 전체 페이지를 재로드하지 않으므로
// 라우트가 바뀔 때마다 page_view 이벤트를 dataLayer로 직접 전송한다.
export function GtmPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams?.toString()
    sendGTMEvent({
      event: 'page_view',
      page_path: query ? `${pathname}?${query}` : pathname,
    })
  }, [pathname, searchParams])

  return null
}

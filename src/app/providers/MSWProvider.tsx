'use client'

import { useEffect, useState } from 'react'

// NEXT_PUBLIC_MOCK_ENABLED가 'true'가 아닌 경우 즉시 ready → 배포 환경에서 블로킹 없음
const isMockEnabled = process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true'

async function enableMocking() {
  if (!isMockEnabled) return
  // 배포 번들에 MSW 코드가 포함되지 않도록 동적 import 사용
  const { worker } = await import('@/shared/api/msw/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  // mock 비활성화 시 ready=true로 초기화 → 배포 환경에서 렌더 블로킹 없음
  const [ready, setReady] = useState(!isMockEnabled)

  useEffect(() => {
    enableMocking().then(() => setReady(true))
  }, [])

  if (!ready) return null

  return <>{children}</>
}

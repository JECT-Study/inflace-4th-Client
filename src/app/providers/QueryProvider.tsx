'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'

import { queryClient } from '@/shared/lib/queryClient'

interface QueryProviderProps {
  children: ReactNode
}

/* tanstack query를 사용하기 위한 provider
 * API 데이터를 캐싱하고 로딩/에러 상태 관리
 * src/app/layouts/index.tsx에서 사용됩니다.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

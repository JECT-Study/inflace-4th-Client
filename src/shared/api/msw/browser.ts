import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

// 브라우저 Service Worker 인스턴스
// MSWProvider에서 동적 import로 불러와 worker.start()를 호출
export const worker = setupWorker(...handlers)

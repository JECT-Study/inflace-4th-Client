import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// Node.js(서버) 인터셉터 인스턴스
// instrumentation.ts에서 동적 import로 불러와 server.listen()을 호출
export const server = setupServer(...handlers)

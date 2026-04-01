import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'

import { middleware, config } from './middleware'

function makeRequest(pathname: string, cookies: Record<string, string> = {}) {
  const url = new URL(`http://localhost:3000${pathname}`)
  const req = new NextRequest(url.toString())
  Object.entries(cookies).forEach(([name, value]) => {
    req.cookies.set(name, value)
  })
  return req
}

describe('middleware', () => {
  describe('비보호 경로', () => {
    it('/ 경로는 NextResponse.next()를 반환한다', () => {
      const req = makeRequest('/')
      const res = middleware(req)
      expect(res.status).toBe(200)
      expect(res.headers.get('location')).toBeNull()
    })

    it('/magazine 경로는 NextResponse.next()를 반환한다', () => {
      const req = makeRequest('/magazine')
      const res = middleware(req)
      expect(res.status).toBe(200)
      expect(res.headers.get('location')).toBeNull()
    })

    it('/login 경로는 보호되지 않는다', () => {
      const req = makeRequest('/login')
      const res = middleware(req)
      expect(res.headers.get('location')).toBeNull()
    })
  })

  describe('보호 경로 — RT 쿠키 없음', () => {
    it('/dashboard 경로에서 RT 없으면 /?login=true로 리다이렉트한다', () => {
      const req = makeRequest('/dashboard')
      const res = middleware(req)

      expect(res.status).toBe(307)
      const location = res.headers.get('location')!
      expect(location).toContain('login=true')
      expect(new URL(location).pathname).toBe('/')
    })

    it('/analytics 경로에서 RT 없으면 리다이렉트한다', () => {
      const req = makeRequest('/analytics')
      const res = middleware(req)

      expect(res.status).toBe(307)
    })
  })

  describe('보호 경로 — RT 쿠키 있음', () => {
    it('/dashboard 경로에서 RT 있으면 NextResponse.next()를 반환한다', () => {
      const req = makeRequest('/dashboard', { '__Host-refresh-token': 'valid-rt' })
      const res = middleware(req)

      expect(res.headers.get('location')).toBeNull()
    })

    it('/analytics 경로에서 RT 있으면 NextResponse.next()를 반환한다', () => {
      const req = makeRequest('/analytics', { '__Host-refresh-token': 'valid-rt' })
      const res = middleware(req)

      expect(res.headers.get('location')).toBeNull()
    })
  })

  describe('중첩 보호 경로', () => {
    it('/dashboard/stats 경로도 보호 적용된다 (RT 없음)', () => {
      const req = makeRequest('/dashboard/stats')
      const res = middleware(req)

      expect(res.status).toBe(307)
    })

    it('/dashboard/stats 경로도 RT 있으면 통과한다', () => {
      const req = makeRequest('/dashboard/stats', { '__Host-refresh-token': 'valid-rt' })
      const res = middleware(req)

      expect(res.headers.get('location')).toBeNull()
    })

    it('/analytics/channels 경로도 보호 적용된다 (RT 없음)', () => {
      const req = makeRequest('/analytics/channels')
      const res = middleware(req)

      expect(res.status).toBe(307)
    })
  })

  describe('config.matcher', () => {
    it('matcher가 /dashboard/:path* 패턴을 포함한다', () => {
      expect(config.matcher).toContain('/dashboard/:path*')
    })

    it('matcher가 /analytics/:path* 패턴을 포함한다', () => {
      expect(config.matcher).toContain('/analytics/:path*')
    })
  })
})

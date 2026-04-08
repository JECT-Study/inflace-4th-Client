export async function register() {
  if (process.env.NEXT_PUBLIC_MOCK_ENABLED !== 'true') return

  // Edge Runtime에서는 msw/node가 동작하지 않으므로 Node.js 런타임에서만 실행
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./src/shared/api/msw/server')
    server.listen({ onUnhandledRequest: 'bypass' })
  }
}

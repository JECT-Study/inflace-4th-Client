import type { NextConfig } from 'next'

//라우팅 가드
const PROTECTED_PATHS = ['/dashboard', '/analytics', '/me']

const nextConfig: NextConfig = {
  /* PROTECTED_PATHS에 해당되는 주소에 접근 시 리프레시 토큰 확인
   * 리프레시 토큰이 없다면 /?login=true로 리다이렉트 (로그인 진행)
   */
  async redirects() {
    return PROTECTED_PATHS.map((path) => ({
      source: `${path}/:path*`,
      missing: [
        {
          type: 'cookie',
          key: 'refreshToken',
        },
      ],
      destination: '/login',
      permanent: false,
    }))
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (s: string) => boolean } }) =>
        rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig

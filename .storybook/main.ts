import type { StorybookConfig } from '@storybook/nextjs-vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? []

    config.plugins.unshift(
      svgr({
        include: '**/*.svg?react', // 쿼리 스트링이 붙은 경우만 타겟팅
        svgrOptions: {
          icon: true, // 크기 조절 등을 위해 아이콘 모드 활성화
          exportType: 'default',
        },
      }),
      // SVG 파일을 React 컴포넌트로 처리 (일반 import 방식, ?ignore 전에 캐치)
      {
        name: 'svg-component-mock',
        enforce: 'pre',
        transform(_code: string, id: string) {
          if (/\.svg(\?.*)?$/.test(id) && !id.includes('?react')) {
            return {
              code: `
                import { createElement } from 'react';
                const SvgMock = (props) => createElement('svg', props);
                export default SvgMock;
              `,
              map: null,
            }
          }
        },
      },
      // 테스트 환경에서 PNG/이미지 파일을 빈 객체로 mock 처리
      {
        name: 'image-mock',
        enforce: 'pre',
        transform(_code: string, id: string) {
          if (/\.(png|jpg|jpeg|gif|webp)(\?.*)?$/.test(id)) {
            return {
              code: `export default { src: '/mock-image.png', height: 100, width: 100 };`,
              map: null,
            }
          }
        },
      }
    )

    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },
}
export default config

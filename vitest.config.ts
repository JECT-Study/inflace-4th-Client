import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      // 단위 테스트 프로젝트 (jsdom + @testing-library/react)
      {
        plugins: [
          {
            name: 'svg-mock',
            transform(_code, id) {
              if (id.endsWith('.svg')) {
                return {
                  code: `
                    import { createElement } from 'react';
                    const SvgMock = (props) => createElement('svg', props);
                    SvgMock.displayName = 'SvgMock';
                    export default SvgMock;
                  `,
                  map: null,
                };
              }
            },
          },
        ],
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
          },
        },
        esbuild: {
          jsx: 'automatic',
        },
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      // Storybook 테스트 프로젝트
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});

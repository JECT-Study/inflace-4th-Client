import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/styles'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Pages', 'Widgets', 'Features', 'Entities', 'Shared'],
      },
    },
  },
}

export default preview

import type { Preview } from '@storybook/html';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#09090b' },
        { name: 'light', value: '#fafafa' },
      ],
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Getting Started', ['Introduction'], 'Icons'],
      },
    },
  },
};

export default preview;

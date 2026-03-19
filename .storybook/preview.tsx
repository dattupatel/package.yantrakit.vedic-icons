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
  decorators: [
    (Story) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = (Story() as string) + `
        <div style="position:fixed;bottom:0;left:0;right:0;height:40px;background:#18181b;border-top:1px solid #3f3f46;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;color:#a1a1aa;z-index:9999;">
          <a href="https://vedic-icons.yantrakit.com" style="color:#dc2626;text-decoration:none;font-weight:500;">Vedic Icons</a>
          <span style="color:#52525b">•</span>
          <a href="https://www.npmjs.com/package/@yantrakit/vedic-icons" target="_blank" style="color:#cb3837;text-decoration:none;font-weight:500;">npm</a>
          <span style="color:#52525b">•</span>
          <span>Part of</span>
          <a href="https://yantrakit.com" style="color:#10b981;text-decoration:none;font-weight:500;">Yantrakit</a>
        </div>
      `;
      return wrapper;
    },
  ],
};

export default preview;

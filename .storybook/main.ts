import type { StorybookConfig } from '@storybook/html-vite';
const basePath = process.env.STORYBOOK_BASE || '/';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.base = basePath;
    config.css = {
      postcss: {
        plugins: [
          (await import('@tailwindcss/postcss')).default,
          (await import('autoprefixer')).default,
        ],
      },
    };
    return config;
  },
  managerHead: (head) => {
    if (basePath === '/') return head;
    return `${head}<base href="${basePath}">`;
  },
};
export default config;

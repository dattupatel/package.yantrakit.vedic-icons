import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'dark',
  brandTitle: 'Vedic Icons - Storybook',
  brandUrl: 'https://vedic-icons.yantrakit.com',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});

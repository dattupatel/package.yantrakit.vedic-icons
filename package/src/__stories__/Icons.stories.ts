import type { Meta, StoryObj } from '@storybook/html';
import '../../dist/vedic-icons.css';

const AVAILABLE_ICONS = ['diya'];

interface iIconArgs {
  icon: string;
  size: string;
  color: string;
  spin: boolean;
  rotate: string;
  flip: string;
}

const meta: Meta<iIconArgs> = {
  title: 'Icons/Playground',
  argTypes: {
    icon: {
      control: 'select',
      options: AVAILABLE_ICONS,
      description: 'Icon name',
    },
    size: {
      control: 'select',
      options: ['(default)', 'vi-xs', 'vi-sm', 'vi-lg', 'vi-xl', 'vi-2x', 'vi-3x', 'vi-4x', 'vi-5x'],
      description: 'Size class',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
    spin: {
      control: 'boolean',
      description: 'Spin animation',
    },
    rotate: {
      control: 'select',
      options: ['none', 'vi-rotate-90', 'vi-rotate-180', 'vi-rotate-270'],
      description: 'Rotation',
    },
    flip: {
      control: 'select',
      options: ['none', 'vi-flip-h', 'vi-flip-v'],
      description: 'Flip',
    },
  },
  args: {
    icon: 'diya',
    size: '(default)',
    color: '#ffffff',
    spin: false,
    rotate: 'none',
    flip: 'none',
  },
};

export default meta;
type iStory = StoryObj<iIconArgs>;

export const Playground: iStory = {
  render: (args) => {
    const sizeClass = args.size === '(default)' ? '' : args.size;
    const spinClass = args.spin ? 'vi-spin' : '';
    const rotateClass = args.rotate === 'none' ? '' : args.rotate;
    const flipClass = args.flip === 'none' ? '' : args.flip;
    const classes = ['vi', `vi-${args.icon}`, sizeClass, spinClass, rotateClass, flipClass]
      .filter(Boolean)
      .join(' ');

    const code = `&lt;i class="${classes}"&gt;&lt;/i&gt;`;

    return `
      <div class="flex flex-col items-center gap-6 p-8">
        <i class="${classes}" style="color: ${args.color};"></i>
        <code class="text-xs text-zinc-400 font-mono bg-zinc-800 px-3 py-1.5 rounded">${code}</code>
      </div>
    `;
  },
};

export const AllIcons: iStory = {
  render: () => {
    const grid = AVAILABLE_ICONS
      .map(
        (name) => `
      <div class="flex flex-col items-center gap-2 p-4">
        <i class="vi vi-${name} text-4xl text-white"></i>
        <span class="text-xs text-zinc-400 font-mono">vi-${name}</span>
      </div>
    `
      )
      .join('');

    return `<div class="flex flex-wrap gap-4 p-8">${grid}</div>`;
  },
};

export const Sizes: iStory = {
  render: () => {
    const sizes = ['vi-xs', 'vi-sm', '', 'vi-lg', 'vi-xl', 'vi-2x', 'vi-3x', 'vi-4x', 'vi-5x'];

    const items = sizes
      .map((size) => {
        const label = size || '(default)';
        return `
        <div class="flex items-center gap-4 text-white">
          <i class="vi vi-diya ${size}"></i>
          <span class="text-xs text-zinc-400 font-mono">${label}</span>
        </div>
      `;
      })
      .join('');

    return `<div class="flex flex-col gap-4 p-8">${items}</div>`;
  },
};

export const Colors: iStory = {
  render: () => {
    const colors = [
      { class: 'text-red-500', label: 'text-red-500' },
      { class: 'text-amber-400', label: 'text-amber-400' },
      { class: 'text-green-500', label: 'text-green-500' },
      { class: 'text-blue-500', label: 'text-blue-500' },
      { class: 'text-purple-500', label: 'text-purple-500' },
      { class: 'text-white', label: 'text-white' },
    ];

    const items = colors
      .map(
        ({ class: cls, label }) => `
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x ${cls}"></i>
          <span class="text-xs text-zinc-400 font-mono">${label}</span>
        </div>
      `
      )
      .join('');

    return `<div class="flex flex-col gap-4 p-8">${items}</div>`;
  },
};

export const Utilities: iStory = {
  render: () => {
    return `
      <div class="flex flex-col gap-6 p-8 text-white">
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x vi-spin"></i>
          <span class="text-xs text-zinc-400 font-mono">vi-spin</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x vi-rotate-90"></i>
          <span class="text-xs text-zinc-400 font-mono">vi-rotate-90</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x vi-rotate-180"></i>
          <span class="text-xs text-zinc-400 font-mono">vi-rotate-180</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x vi-flip-h"></i>
          <span class="text-xs text-zinc-400 font-mono">vi-flip-h</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-diya vi-2x vi-flip-v"></i>
          <span class="text-xs text-zinc-400 font-mono">vi-flip-v</span>
        </div>
      </div>
    `;
  },
};

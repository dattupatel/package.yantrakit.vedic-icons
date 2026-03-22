import type { Meta, StoryObj } from '@storybook/html';
import '../../dist/vedic-icons.css';

const AVAILABLE_ICONS = ['agni-dev','ashoka-chakra','brahma','calendar-holi','calendar-pongol','calendar-swastika','chandra','coin','conch-shell','diya','durga','face-male-sikh','family-gathering','female','firecracker','firecracker-02','ganesha','golden-temple','granth-swastika','hand-holding-rupee','hanumaan','hanumaan-02','havan-fire','india-map','indian-flag','kalash-swastika','kali','kartikeya','konark-sun-temple','krishna','krishna-02','krishna-with-cow','kurma','lakshmi','lingam','lotus','male-sikh','male-sikh02','mandala','mandala-02','matsya','meenakshi-temple','namaste','narasimha','om','parvati','peacock','qutub-minar','radha','rama','rangoli','red-fort','saraswati','scroll','scroll-02','scroll-03','scroll-rolled','scroll-rolled02','shiva','trishul','tilak','sita','surya','taj-mahal','temple','vamana','varaha'];
const AVAILABLE_STYLES = ['vi-solid', 'vi-outlined', 'vi-color'];

interface iIconArgs {
  icon: string;
  style: string;
  size: string;
  color: string;
  spin: boolean;
  rotate: number;
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
    style: {
      control: 'select',
      options: AVAILABLE_STYLES,
      description: 'Icon style',
    },
    size: {
      control: 'select',
      options: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'],
      description: 'Tailwind text size',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
    spin: {
      control: 'boolean',
      description: 'Tailwind animate-spin',
    },
    rotate: {
      control: 'number',
      description: 'Rotation in degrees',
    },
    flip: {
      control: 'select',
      options: ['none', 'scale-x-[-1]', 'scale-y-[-1]'],
      description: 'Flip',
    },
  },
  args: {
    icon: 'diya',
    style: 'vi-solid',
    size: 'text-4xl',
    color: '#ffffff',
    spin: false,
    rotate: 0,
    flip: 'none',
  },
};

export default meta;
type iStory = StoryObj<iIconArgs>;

export const Playground: iStory = {
  render: (args) => {
    const spinClass = args.spin ? 'animate-spin' : '';
    const flipClass = args.flip === 'none' ? '' : args.flip;
    const classes = ['vi', args.style, `vi-${args.icon}`, args.size, spinClass, flipClass]
      .filter(Boolean)
      .join(' ');

    const rotateStyle = args.rotate ? `transform: rotate(${args.rotate}deg);` : '';
    const code = `&lt;i class="${classes}"&gt;&lt;/i&gt;`;

    return `
      <div class="flex flex-col items-center gap-6 p-8">
        <i class="${classes}" style="color: ${args.color}; ${rotateStyle}"></i>
        <code class="text-xs text-zinc-400 font-mono bg-zinc-800 px-3 py-1.5 rounded">${code}</code>
      </div>
    `;
  },
};

export const AllIcons: iStory = {
  argTypes: {
    icon: { table: { disable: true } },
    style: { table: { disable: true } },
    spin: { table: { disable: true } },
    rotate: { table: { disable: true } },
    flip: { table: { disable: true } },
  },
  render: (args) => {
    const styles = ['solid', 'outlined'];

    const grid = styles
      .map((style) => {
        const icons = AVAILABLE_ICONS.map(
          (name) => `
          <div class="flex flex-col items-center gap-2 p-4">
            <i class="vi vi-${style} vi-${name} ${args.size}" style="color: ${args.color};"></i>
            <span class="text-xs text-zinc-400 font-mono">vi-${style} vi-${name}</span>
          </div>
        `
        ).join('');

        return `
          <div class="mb-8">
            <h3 class="text-sm font-bold text-zinc-300 mb-4 uppercase tracking-wider">${style}</h3>
            <div class="flex flex-wrap gap-4">${icons}</div>
          </div>
        `;
      })
      .join('');

    return `<div class="p-8">${grid}</div>`;
  },
};

export const Sizes: iStory = {
  render: () => {
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];

    const items = sizes
      .map((size) => `
        <div class="flex items-center gap-4 text-white">
          <i class="vi vi-solid vi-diya ${size}"></i>
          <i class="vi vi-outlined vi-diya ${size}"></i>
          <span class="text-xs text-zinc-400 font-mono">${size}</span>
        </div>
      `)
      .join('');

    return `<div class="flex flex-col gap-4 p-8">${items}</div>`;
  },
};

export const Colors: iStory = {
  render: () => {
    const colors = [
      'text-red-500',
      'text-amber-400',
      'text-green-500',
      'text-blue-500',
      'text-purple-500',
      'text-white',
    ];

    const items = colors
      .map((cls) => `
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl ${cls}"></i>
          <i class="vi vi-outlined vi-diya text-3xl ${cls}"></i>
          <span class="text-xs text-zinc-400 font-mono">${cls}</span>
        </div>
      `)
      .join('');

    return `<div class="flex flex-col gap-4 p-8">${items}</div>`;
  },
};

export const Utilities: iStory = {
  render: () => {
    return `
      <div class="flex flex-col gap-6 p-8 text-white">
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl animate-spin"></i>
          <i class="vi vi-outlined vi-diya text-3xl animate-spin"></i>
          <span class="text-xs text-zinc-400 font-mono">animate-spin</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl rotate-90"></i>
          <i class="vi vi-outlined vi-diya text-3xl rotate-90"></i>
          <span class="text-xs text-zinc-400 font-mono">rotate-90</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl rotate-180"></i>
          <i class="vi vi-outlined vi-diya text-3xl rotate-180"></i>
          <span class="text-xs text-zinc-400 font-mono">rotate-180</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl scale-x-[-1]"></i>
          <i class="vi vi-outlined vi-diya text-3xl scale-x-[-1]"></i>
          <span class="text-xs text-zinc-400 font-mono">scale-x-[-1] (flip horizontal)</span>
        </div>
        <div class="flex items-center gap-4">
          <i class="vi vi-solid vi-diya text-3xl scale-y-[-1]"></i>
          <i class="vi vi-outlined vi-diya text-3xl scale-y-[-1]"></i>
          <span class="text-xs text-zinc-400 font-mono">scale-y-[-1] (flip vertical)</span>
        </div>
      </div>
    `;
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
        'link',
        'outline',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['wide', 'block', 'circle', 'square'],
    },
    disabled: {
      control: 'boolean',
    },
    glass: {
      control: 'boolean',
    },
    animation: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base story
export const Default: Story = {
  args: {
    variant: 'neutral',
    size: 'md',
    children: 'Button',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Animation: Story = {
  args: {
    variant: 'primary',
    animation: false,
    children: 'Animation Disabled Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Glass: Story = {
  args: {
    variant: 'primary',
    glass: true,
    children: 'Glass Button',
  },
};

// // Size stories
// export const Sizes: Story = {
//   render: () => (
//     <div className="flex gap-2">
//       <Button size="xs">Extra Small</Button>
//       <Button size="sm">Small</Button>
//       <Button size="md">Medium</Button>
//       <Button size="lg">Large</Button>
//     </div>
//   ),
// };

// // Shape stories
// export const Shapes: Story = {
//   render: () => (
//     <div className="flex gap-2">
//       <Button shape="wide">Wide</Button>
//       <Button shape="square">□</Button>
//       <Button shape="circle">○</Button>
//     </div>
//   ),
// };

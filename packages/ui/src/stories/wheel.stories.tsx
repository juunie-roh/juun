import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Check,
  Home,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Wheel } from '../components/wheel';

const meta: Meta<typeof Wheel> = {
  title: 'shadcn/Wheel',
  component: Wheel,
  parameters: {
    layout: 'centered',
    docs: {
      subtitle: 'A circular menu that provides an object oriented navigation.',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    num: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'The number of wheel menus',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant',
    },
    radius: {
      control: { type: 'range', min: 60, max: 85, step: 1 },
      description: 'Outer radius of the wheel',
    },
    innerRadius: {
      control: { type: 'range', min: 0, max: 60, step: 1 },
      description: 'Inner radius of the wheel',
    },
    onSelect: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof Wheel>;

// Basic examples
export const Default: Story = {
  args: {
    num: 5,
    variant: 'primary',
  },
};

export const ConfirmType: Story = {
  args: {
    num: 2,
    variant: 'primary',
    icons: [Check, X],
    titles: ['Confirm', 'Cancel'],
  },
};

export const FourType: Story = {
  args: {
    num: 4,
    variant: 'primary',
    icons: [ArrowUp, ArrowRight, ArrowDown, ArrowLeft],
    titles: ['Up', 'Right', 'Down', 'Left'],
  },
};

export const FiveType: Story = {
  args: {
    num: 5,
    variant: 'primary',
    icons: [Home, Search, Bell, Settings, User],
    titles: ['Home', 'Search', 'Notifications', 'Settings', 'Profile'],
  },
};

// Variant examples
export const PrimaryVariant: Story = {
  args: {
    num: 5,
    variant: 'primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    num: 5,
    variant: 'secondary',
  },
};

export const DestructiveVariant: Story = {
  args: {
    num: 5,
    variant: 'destructive',
  },
};

export const OutlineVariant: Story = {
  args: {
    num: 5,
    variant: 'outline',
  },
};

// Customized examples
export const CustomSized: Story = {
  args: {
    num: 5,
    variant: 'primary',
    radius: 100,
    innerRadius: 50,
  },
};

const RenderInteractive = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setTimeout(() => setSelectedOption(null), 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Wheel
        num={5}
        variant="primary"
        icons={[Home, Search, Bell, Settings, User]}
        titles={['Home', 'Search', 'Notifications', 'Settings', 'Profile']}
        onSelect={handleSelect}
      />
      {selectedOption !== null && (
        <div className="bg-primary text-primary-foreground mt-4 rounded p-2">
          Selected option: {selectedOption}
        </div>
      )}
    </div>
  );
};

// Interactive examples
export const Interactive: Story = {
  render: RenderInteractive,
};

// Combined examples
export const WheelShowcase: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Confirm Wheel</h3>
          <Wheel
            num={2}
            variant="primary"
            icons={[Check, X]}
            titles={['Confirm', 'Cancel']}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Four-Option Wheel</h3>
          <Wheel
            num={4}
            variant="secondary"
            icons={[ArrowUp, ArrowRight, ArrowDown, ArrowLeft]}
            titles={['Up', 'Right', 'Down', 'Left']}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Five-Option Wheel</h3>
          <Wheel
            num={5}
            variant="outline"
            icons={[Home, Search, Bell, Settings, User]}
            titles={['Home', 'Search', 'Notifications', 'Settings', 'Profile']}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Destructive Wheel</h3>
          <Wheel num={5} variant="destructive" radius={90} innerRadius={40} />
        </div>
      </div>
    );
  },
};

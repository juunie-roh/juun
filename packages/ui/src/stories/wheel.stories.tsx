import type { Meta, StoryObj } from "@storybook/react-vite";
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
} from "lucide-react";
import { useState } from "react";

import { Wheel, WheelContent } from "../components/wheel";

const meta: Meta<typeof Wheel> = {
  title: "shadcn/Wheel",
  component: Wheel,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "A circular menu that provides an object oriented navigation.",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline"],
      description: "The visual style variant",
    },
    radius: {
      control: { type: "range", min: 60, max: 85, step: 1 },
      description: "Outer radius of the wheel",
    },
    innerRadius: {
      control: { type: "range", min: 0, max: 60, step: 1 },
      description: "Inner radius of the wheel",
    },
    size: {
      control: { type: "range", min: 150, max: 300, step: 10 },
      description: "Size of the wheel container",
    },
    onSelect: { action: "selected" },
  },
};

export default meta;
type Story = StoryObj<typeof Wheel>;

// Basic examples
export const Default: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

export const ConfirmType: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Confirm">
        <Check />
      </WheelContent>
      <WheelContent title="Cancel">
        <X />
      </WheelContent>
    </Wheel>
  ),
};

export const FourType: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Up">
        <ArrowUp />
      </WheelContent>
      <WheelContent title="Right">
        <ArrowRight />
      </WheelContent>
      <WheelContent title="Down">
        <ArrowDown />
      </WheelContent>
      <WheelContent title="Left">
        <ArrowLeft />
      </WheelContent>
    </Wheel>
  ),
};

export const FiveType: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

// Variant examples
export const PrimaryVariant: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

export const SecondaryVariant: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

export const DestructiveVariant: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

export const OutlineVariant: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

// Disabled items example
export const WithDisabledItems: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Available">
        <Home />
      </WheelContent>
      <WheelContent title="Disabled" disabled>
        <Search />
      </WheelContent>
      <WheelContent title="Available">
        <Bell />
      </WheelContent>
      <WheelContent title="Disabled" disabled>
        <Settings />
      </WheelContent>
      <WheelContent title="Available">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

// Customized examples
export const CustomSized: Story = {
  args: {
    variant: "primary",
    radius: 85,
    innerRadius: 50,
    size: 200,
  },
  render: (args) => (
    <Wheel {...args}>
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Search">
        <Search />
      </WheelContent>
      <WheelContent title="Notifications">
        <Bell />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
      <WheelContent title="Profile">
        <User />
      </WheelContent>
    </Wheel>
  ),
};

const RenderInteractive = () => {
  const [selectedOption, setSelectedOption] = useState<{
    index: number;
    title?: string;
  } | null>(null);

  const handleSelect = (index: number, title?: string) => {
    setSelectedOption({ index, title });
    setTimeout(() => setSelectedOption(null), 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Wheel variant="primary" onSelect={handleSelect}>
        <WheelContent title="Home">
          <Home />
        </WheelContent>
        <WheelContent title="Search">
          <Search />
        </WheelContent>
        <WheelContent title="Notifications">
          <Bell />
        </WheelContent>
        <WheelContent title="Settings">
          <Settings />
        </WheelContent>
        <WheelContent title="Profile">
          <User />
        </WheelContent>
      </Wheel>
      {selectedOption !== null && (
        <div className="mt-4 rounded bg-primary p-2 text-primary-foreground">
          Selected:{" "}
          {selectedOption.title || `Option ${selectedOption.index + 1}`}
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
          <Wheel variant="primary">
            <WheelContent title="Confirm">
              <Check />
            </WheelContent>
            <WheelContent title="Cancel">
              <X />
            </WheelContent>
          </Wheel>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Four-Option Wheel</h3>
          <Wheel variant="secondary">
            <WheelContent title="Up">
              <ArrowUp />
            </WheelContent>
            <WheelContent title="Right">
              <ArrowRight />
            </WheelContent>
            <WheelContent title="Down">
              <ArrowDown />
            </WheelContent>
            <WheelContent title="Left">
              <ArrowLeft />
            </WheelContent>
          </Wheel>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Five-Option Wheel</h3>
          <Wheel variant="outline">
            <WheelContent title="Home">
              <Home />
            </WheelContent>
            <WheelContent title="Search">
              <Search />
            </WheelContent>
            <WheelContent title="Notifications">
              <Bell />
            </WheelContent>
            <WheelContent title="Settings">
              <Settings />
            </WheelContent>
            <WheelContent title="Profile">
              <User />
            </WheelContent>
          </Wheel>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold">Destructive Wheel</h3>
          <Wheel variant="destructive" radius={90} innerRadius={40}>
            <WheelContent title="Delete">
              <X />
            </WheelContent>
            <WheelContent title="Archive">
              <Settings />
            </WheelContent>
            <WheelContent title="Move">
              <ArrowRight />
            </WheelContent>
            <WheelContent title="Copy">
              <Bell />
            </WheelContent>
            <WheelContent title="Share">
              <User />
            </WheelContent>
          </Wheel>
        </div>
      </div>
    );
  },
};

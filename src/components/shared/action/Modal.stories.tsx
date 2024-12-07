import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useRef } from 'react';

import type { ModalRef } from '@/types/ui.types';

import Button from './Button';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Actions/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Modal Title',
    content: 'Modal Content',
    backdrop: undefined,
    onClose: fn(),
  },
  argTypes: {
    title: {
      control: 'object',
      description: 'a title of modal',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode | string | undefined' },
      },
    },
    content: {
      control: 'object',
      description: 'content of modal',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode | string | undefined' },
      },
    },
    footer: {
      control: 'object',
      description: 'footer of modal',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ReactNode | string | undefined' },
      },
    },
    backdrop: {
      control: 'boolean',
      description: 'make modal closable by clicking background area',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      description: 'callback function to execute on close modal',
      type: 'function',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'function' },
      },
    },
  },
  render: (args) => {
    const modal = useRef<ModalRef>(null);
    return (
      <>
        <Button variant="neutral" onClick={() => modal.current?.open()}>
          open
        </Button>
        <Modal ref={modal} {...args} />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Base story
export const Default: Story = {
  args: {
    title: 'Modal Title',
    content: 'Modal Content',
    backdrop: undefined,
    onClose: fn(),
  },
};

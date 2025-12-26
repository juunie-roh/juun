/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertTriangle, Bell, Save, Settings, User, X } from "lucide-react";
import { useState } from "react";

import { Button } from "./button";
import { Dialog, DialogDescription, DialogFooter, DialogTitle } from "./dialog";
import {
  DraggableDialogContent,
  DraggableDialogHeader,
} from "./draggable-dialog";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

const meta: Meta<typeof DraggableDialogContent> = {
  title: "UI/Custom/DraggableDialog",
  component: DraggableDialogContent,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "A draggable dialog component that extends the standard dialog with drag-and-drop functionality.",
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the dialog is open",
    },
    interactive: {
      control: "boolean",
      description: "Whether to allow interaction outside the dialog",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic draggable dialog
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Draggable Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DraggableDialogContent open={open} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Draggable Dialog</DialogTitle>
              <DialogDescription>
                This dialog can be dragged around the screen. Try clicking and
                dragging the header to move it.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You can interact with content outside this dialog since it's
                non-modal and interactive.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </>
    );
  },
};

// With handle for dragging
export const WithDragHandle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open with Drag Handle</Button>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DraggableDialogContent open={open} interactive>
            <DraggableDialogHeader handle>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings Dialog
              </DialogTitle>
              <DialogDescription>
                Drag using the grip handle in the top-right corner.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </>
    );
  },
};

// Modal vs Non-modal comparison
export const ModalComparison: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [nonModalOpen, setNonModalOpen] = useState(false);

    return (
      <div className="space-x-4">
        <Button onClick={() => setModalOpen(true)}>Modal Dialog</Button>
        <Button onClick={() => setNonModalOpen(true)}>
          Non-Modal Interactive
        </Button>

        {/* Modal dialog */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen} modal={true}>
          <DraggableDialogContent open={modalOpen}>
            <DraggableDialogHeader>
              <DialogTitle>Modal Draggable Dialog</DialogTitle>
              <DialogDescription>
                This is modal - you cannot interact with content behind it.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">
                Modal dialogs block interaction with the background.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>

        {/* Non-modal dialog */}
        <Dialog
          open={nonModalOpen}
          onOpenChange={setNonModalOpen}
          modal={false}
        >
          <DraggableDialogContent open={nonModalOpen} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Non-Modal Interactive Dialog</DialogTitle>
              <DialogDescription>
                This is non-modal - you can click outside to interact with other
                elements.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">
                Try clicking the other button while this dialog is open!
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setNonModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </div>
    );
  },
};

// User profile form example
export const UserProfileForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <User className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DraggableDialogContent open={open} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Edit User Profile</DialogTitle>
              <DialogDescription>
                Update your profile information. Drag this dialog to reposition
                it.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Software developer passionate about creating amazing user experiences."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </>
    );
  },
};

// Notification dialog
export const NotificationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          <Bell className="mr-2 h-4 w-4" />
          Show Notification
        </Button>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DraggableDialogContent open={open} interactive>
            <DraggableDialogHeader handle>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                New Notification
              </DialogTitle>
              <DialogDescription>
                You have received a new message.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Hey! Just wanted to let you know that the project is ready
                      for review. Please check it out when you have a chance.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Mark as Read
              </Button>
              <Button onClick={() => setOpen(false)}>Reply</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </>
    );
  },
};

// Confirmation dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <X className="mr-2 h-4 w-4" />
          Delete Item
        </Button>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DraggableDialogContent open={open}>
            <DraggableDialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                selected item.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm">
                  <strong>Item:</strong> Project Report.pdf
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Size:</strong> 2.4 MB
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Created:</strong> 2 days ago
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </>
    );
  },
};

// Multiple dialogs showcase
export const MultipleDialogs: Story = {
  render: () => {
    const [dialog1Open, setDialog1Open] = useState(false);
    const [dialog2Open, setDialog2Open] = useState(false);
    const [dialog3Open, setDialog3Open] = useState(false);

    return (
      <div className="space-x-4">
        <Button onClick={() => setDialog1Open(true)}>Open Dialog 1</Button>
        <Button onClick={() => setDialog2Open(true)}>Open Dialog 2</Button>
        <Button onClick={() => setDialog3Open(true)}>Open Dialog 3</Button>

        {/* Dialog 1 */}
        <Dialog open={dialog1Open} onOpenChange={setDialog1Open} modal={false}>
          <DraggableDialogContent open={dialog1Open} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Dialog 1</DialogTitle>
              <DialogDescription>
                First draggable dialog. You can open multiple dialogs and drag
                them around.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">This is the first dialog content.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDialog1Open(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>

        {/* Dialog 2 */}
        <Dialog open={dialog2Open} onOpenChange={setDialog2Open} modal={false}>
          <DraggableDialogContent open={dialog2Open} interactive>
            <DraggableDialogHeader handle>
              <DialogTitle>Dialog 2</DialogTitle>
              <DialogDescription>
                Second draggable dialog with a handle.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">This is the second dialog content.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDialog2Open(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>

        {/* Dialog 3 */}
        <Dialog open={dialog3Open} onOpenChange={setDialog3Open} modal={false}>
          <DraggableDialogContent open={dialog3Open} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Dialog 3</DialogTitle>
              <DialogDescription>
                Third draggable dialog. All dialogs are independent.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">This is the third dialog content.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDialog3Open(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </div>
    );
  },
};

// Showcase of all variants
export const DialogShowcase: Story = {
  render: () => {
    const [basicOpen, setBasicOpen] = useState(false);
    const [handleOpen, setHandleOpen] = useState(false);
    const [interactiveOpen, setInteractiveOpen] = useState(false);

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold">Basic Draggable</h3>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setBasicOpen(true)}
            >
              Open Basic
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">With Handle</h3>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setHandleOpen(true)}
            >
              Open with Handle
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Interactive</h3>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setInteractiveOpen(true)}
            >
              Open Interactive
            </Button>
          </div>
        </div>

        {/* Basic Dialog */}
        <Dialog open={basicOpen} onOpenChange={setBasicOpen} modal={false}>
          <DraggableDialogContent open={basicOpen}>
            <DraggableDialogHeader>
              <DialogTitle>Basic Draggable Dialog</DialogTitle>
              <DialogDescription>
                Drag from anywhere in the header area.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">Basic draggable functionality.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setBasicOpen(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>

        {/* Handle Dialog */}
        <Dialog open={handleOpen} onOpenChange={setHandleOpen} modal={false}>
          <DraggableDialogContent open={handleOpen}>
            <DraggableDialogHeader handle>
              <DialogTitle>Dialog with Handle</DialogTitle>
              <DialogDescription>
                Drag using the grip icon in the top-right.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">Draggable with dedicated handle.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setHandleOpen(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>

        {/* Interactive Dialog */}
        <Dialog
          open={interactiveOpen}
          onOpenChange={setInteractiveOpen}
          modal={false}
        >
          <DraggableDialogContent open={interactiveOpen} interactive>
            <DraggableDialogHeader>
              <DialogTitle>Interactive Dialog</DialogTitle>
              <DialogDescription>
                You can interact with elements outside this dialog.
              </DialogDescription>
            </DraggableDialogHeader>
            <div className="py-4">
              <p className="text-sm">
                Interactive mode allows clicking outside the dialog.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setInteractiveOpen(false)}>Close</Button>
            </DialogFooter>
          </DraggableDialogContent>
        </Dialog>
      </div>
    );
  },
};

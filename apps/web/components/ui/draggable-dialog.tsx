"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Grip } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { DialogContent, DialogHeader } from "./dialog";

function DraggableDialogContent({
  children,
  className,
  interactive,
  open,
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  /** dialog open state */
  open: boolean;
  /** Whether to allow interact outside the dialog */
  interactive?: boolean;
}) {
  // drag target element ref
  const ref = React.useRef<HTMLDivElement>(null);
  // element position ref
  const position = React.useRef({ x: 0, y: 0 });
  // request animation frame id ref
  const rafId = React.useRef<number>(null);

  // Configure sensors with activation constraints
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 6,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  // Track previous open state to detect when dialog opens
  const prevOpen = React.useRef(open);

  // Reset position when dialog opens
  React.useEffect(() => {
    if (open && !prevOpen.current) {
      // Dialog just opened - reset position
      position.current = { x: 0, y: 0 };
      if (ref.current) {
        ref.current.style.transform = "translate3d(0px, 0px, 0)";
      }
    }
    prevOpen.current = open;
  }, [open]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragMove={(e) => {
        if (!ref.current) return;

        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
          if (!ref.current) return;
          ref.current.style.transform = `translate3d(${position.current.x + e.delta.x}px, ${position.current.y + e.delta.y}px, 0)`;
        });
      }}
      onDragEnd={(e) => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }

        position.current = {
          x: position.current.x + e.delta.x,
          y: position.current.y + e.delta.y,
        };

        if (ref.current)
          ref.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }}
      modifiers={[restrictToWindowEdges]}
    >
      <DialogContent
        {...props}
        className={cn(className, "transition-none")}
        ref={ref}
        onInteractOutside={interactive ? (e) => e.preventDefault() : undefined}
        style={{
          transform: `translate3d(0px, 0px, 0)`,
        }}
      >
        {children}
      </DialogContent>
    </DndContext>
  );
}

function DraggableDialogHeader({
  children,
  handle,
  ...props
}: React.ComponentProps<typeof DialogHeader> & {
  handle?: boolean;
}) {
  const id = React.useId();
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return handle ? (
    <DialogHeader {...props}>
      <Button
        size="icon"
        variant="link"
        ref={setNodeRef}
        className="absolute top-1.5 right-10 cursor-move rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        {...attributes}
        {...listeners}
      >
        <Grip />
      </Button>
      {children}
    </DialogHeader>
  ) : (
    <DialogHeader
      className="cursor-move select-none"
      {...props}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </DialogHeader>
  );
}

export { DraggableDialogContent, DraggableDialogHeader };

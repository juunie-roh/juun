import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@pkg/ui/accordion";

export default function ViewerDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="size-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Clone Viewer</AccordionTrigger>
        <AccordionContent>
          <div className="text-muted-foreground flex size-full items-center justify-center">
            Viewer Demo
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Mouse Event</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@pkg/ui';

import MouseEventHighlight from './mouse-event';
import PolygonHighlight from './polygon';

export default function HighlightDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="size-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Polygon Entity</AccordionTrigger>
        <AccordionContent>
          <PolygonHighlight />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Mouse Event</AccordionTrigger>
        <AccordionContent>
          <MouseEventHighlight />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

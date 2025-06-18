import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@pkg/ui';

import GeojsonHighlight from './geojson';
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
        <AccordionTrigger>GeoJSON</AccordionTrigger>
        <AccordionContent>
          <GeojsonHighlight />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

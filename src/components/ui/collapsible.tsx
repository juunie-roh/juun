'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const CollapsibleRoot = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

// export interface CollapsibleProps
//   extends CollapsiblePrimitive.CollapsibleProps {
//   trigger?: React.ReactNode;
//   'collapsible-content'?: React.ReactNode;
// }

// const Collapsible: React.FC<CollapsibleProps> = ({
//   trigger,
//   'collapsible-content': collapsibleContent,
//   ...props
// }) => (
//   <CollapsibleRoot {...props}>
//     <CollapsibleTrigger asChild={typeof trigger !== 'string'}>
//       {trigger}
//     </CollapsibleTrigger>
//     <CollapsibleContent>{collapsibleContent}</CollapsibleContent>
//   </CollapsibleRoot>
// );

// export default Collapsible;

export { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger };

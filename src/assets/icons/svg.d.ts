declare module '*.svg' {
  import type { ComponentProps, ReactElement } from 'react';

  /**
   * SVG type definition for custom icon system
   */
  const ReactComponent: (props: ComponentProps<'svg'>) => ReactElement;

  export { ReactComponent };
  export default ReactComponent;
}

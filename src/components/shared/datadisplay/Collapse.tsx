import clsx from 'clsx';

import type { CollapseProps } from '@/types/ui.types';

const Collapse = (props: CollapseProps) => {
  const {
    'collapse-title': title,
    'collapse-title-className': titleClassName,
    'collapse-content': content,
    icon,
    open,
    className,
  } = props;

  return (
    <div
      tabIndex={0}
      className={clsx([
        'collapse',
        {
          'collapse-arrow': icon === 'arrow',
          'collapse-plus': icon === 'plus',
        },
        { 'collapse-open': open },
        { 'collapse-close': open !== undefined && !open },
        className,
      ])}
    >
      <div
        className={clsx([
          'collapse-title',
          titleClassName || 'text-xl font-medium',
        ])}
      >
        {typeof title === 'string' ? <p>title</p> : title}
      </div>
      <div className="collapse-content">
        {typeof content === 'string' ? <p>content</p> : content}
      </div>
    </div>
  );
};

export default Collapse;

import clsx from 'clsx';
import { useMemo } from 'react';

import type { AlertProps } from '@/types/ui.types';

const Alert = (props: AlertProps) => {
  const {
    variant,
    className,
    children,
    'alert-title': title,
    'alert-description': desc,
    icon,
  } = props;

  const alertIcon = useMemo(() => {
    const defaultClasses = 'h-6 w-6 shrink-0';
    switch (variant) {
      case undefined:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${defaultClasses} stroke-info`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
        );
      case 'info':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${defaultClasses} stroke-current`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
        );
      case 'success':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${defaultClasses} stroke-current`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${defaultClasses} stroke-current`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 9v4" />
            <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
            <path d="M12 16h.01" />
          </svg>
        );
      case 'error':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${defaultClasses} stroke-current`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        );
    }
  }, [variant]);

  return (
    <div
      role="alert"
      className={clsx([
        'alert',
        {
          'alert-info': variant === 'info',
          'alert-success': variant === 'success',
          'alert-warning': variant === 'warning',
          'alert-error': variant === 'error',
        },
        className,
      ])}
    >
      {icon || alertIcon}
      {children ? (
        typeof children === 'string' ? (
          <span>{children}</span>
        ) : (
          children
        )
      ) : (
        <div>
          {title &&
            (typeof title === 'string' ? (
              <h3 className="font-bold">{title}</h3>
            ) : (
              title
            ))}
          {desc &&
            (typeof desc === 'string' ? (
              <div className="text-xs">{desc}</div>
            ) : (
              desc
            ))}
        </div>
      )}
    </div>
  );
};

export default Alert;

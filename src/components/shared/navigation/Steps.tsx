import clsx from 'clsx';

import type { Step, StepsProps } from '@/types/ui.types';

const Step = (props: Step) => {
  const { variant, children, 'data-content': dataContent, className } = props;

  const stepClasses = clsx([
    'step',
    {
      'step-neutral': variant === 'neutral',
      'step-primary': variant === 'primary',
      'step-secondary': variant === 'secondary',
      'step-accent': variant === 'accent',
      'step-info': variant === 'info',
      'step-success': variant === 'success',
      'step-warning': variant === 'warning',
      'step-error': variant === 'error',
    },
    className,
  ]);

  return (
    <li className={stepClasses} data-content={dataContent}>
      {children}
    </li>
  );
};

const Steps = (props: StepsProps) => {
  const { steps, direction = 'horizontal', className } = props;
  const stepsClasses = clsx([
    'steps',
    {
      'steps-horizontal': direction === 'horizontal',
      'steps-vertical': direction === 'vertical',
    },
    className,
  ]);

  return (
    <ul className={stepsClasses}>
      {steps.map((step, index) => (
        <Step {...step} key={index} />
      ))}
    </ul>
  );
};

export default Steps;
import { render, screen } from '@testing-library/react';
import type { IconNode } from 'lucide-react';
import { AlertCircle, createLucideIcon } from 'lucide-react';

describe('Lucide Icons', () => {
  it('renders predefined mock icon', () => {
    render(<AlertCircle />);
    expect(screen.getByTestId('lucide-alert-circle')).toBeInTheDocument();
  });

  it('creates custom icon using createLucideIcon', () => {
    const mockIconNode = [
      ['path', { d: 'M12 2L2 7l10 5 10-5-10-5z', key: '1' }],
    ];
    const CustomIcon = createLucideIcon('CustomIcon', mockIconNode as IconNode);
    render(<CustomIcon />);
    expect(screen.getByTestId('lucide-custom-icon')).toBeInTheDocument();
  });

  it('applies custom props correctly', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<AlertCircle size={32} color="red" className="custom-class" />);
    const icon = screen.getByTestId('lucide-alert-circle');

    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveAttribute('stroke', 'red');
    expect(icon).toHaveClass('custom-class');
  });
});

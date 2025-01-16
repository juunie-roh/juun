import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps } from 'react';

import createIcon from '@/components/icons/createIcon';
import { Icon } from '@/components/icons/Icon';

// First, let's create a mock SVG component that we can use across our tests
const MockSvg: React.FC<ComponentProps<'svg'>> = (props) => (
  <svg data-testid="mock-svg" {...props}>
    <path d="M1 1 L20 20" />
  </svg>
);
MockSvg.displayName = 'MockSvg';

const MockSvgWithoutDisplayName: React.FC<ComponentProps<'svg'>> = (props) => (
  <svg data-testid="mock-svg" {...props}>
    <path d="M1 1 L20 20" />
  </svg>
);

// Create a test icon using our createIcon helper
const TestIcon = createIcon(MockSvg, {
  label: 'Test Icon',
  decorative: false,
});

const TestIconWithoutDisplayName = createIcon(MockSvgWithoutDisplayName, {
  label: undefined,
  decorative: true,
});

describe('Icon Component', () => {
  // Test basic rendering
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Icon svg={MockSvg} />);
      expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
    });

    it('forwards refs correctly', () => {
      // Create a ref to test with
      const ref = jest.fn();
      render(<Icon svg={MockSvg} ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  // Test size prop functionality
  describe('Size Handling', () => {
    it('applies correct dimensions for preset sizes', () => {
      const { rerender } = render(<Icon svg={MockSvg} size="sm" />);
      const wrapper = screen.getByTestId('mock-svg').parentElement;

      // Test small size
      expect(wrapper).toHaveStyle({ width: '16px', height: '16px' });

      // Test medium size
      rerender(<Icon svg={MockSvg} size="md" />);
      expect(wrapper).toHaveStyle({ width: '24px', height: '24px' });

      // Test large size
      rerender(<Icon svg={MockSvg} size="lg" />);
      expect(wrapper).toHaveStyle({ width: '32px', height: '32px' });
    });

    it('handles custom numeric sizes', () => {
      render(<Icon svg={MockSvg} size={40} />);
      const wrapper = screen.getByTestId('mock-svg').parentElement;
      expect(wrapper).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('maintains aspect ratio when size changes', () => {
      const { rerender } = render(<Icon svg={MockSvg} size={24} />);
      const svg = screen.getByTestId('mock-svg');
      const initialRatio = svg.clientWidth / svg.clientHeight;

      rerender(<Icon svg={MockSvg} size={48} />);
      const newRatio = svg.clientWidth / svg.clientHeight;

      expect(initialRatio).toBe(newRatio);
    });
  });

  // Test accessibility features
  describe('Accessibility', () => {
    it('applies correct attributes for decorative icons', () => {
      render(<Icon svg={MockSvg} decorative />);
      const svg = screen.getByTestId('mock-svg');

      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('role', 'presentation');
    });

    it('applies correct attributes for meaningful icons', () => {
      const label = 'Test Icon Label';
      render(<Icon svg={MockSvg} label={label} />);
      const svg = screen.getByTestId('mock-svg');

      expect(svg).toHaveAttribute('aria-label', label);
      expect(svg).toHaveAttribute('role', 'img');
      expect(svg).not.toHaveAttribute('aria-hidden');
    });
  });

  // Test style and className handling
  describe('Styling', () => {
    it('applies custom className correctly', () => {
      render(<Icon svg={MockSvg} className="test-class" />);
      const wrapper = screen.getByTestId('mock-svg').parentElement;
      expect(wrapper).toHaveClass('test-class');
    });

    it('combines custom classes with default classes', () => {
      render(<Icon svg={MockSvg} className="custom-class" />);
      const wrapper = screen.getByTestId('mock-svg').parentElement;

      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveClass('inline-block');
      expect(wrapper).toHaveClass('shrink-0');
    });

    it('handles stroke color and width', () => {
      render(<Icon svg={MockSvg} color="red" strokeWidth={3} />);
      const svg = screen.getByTestId('mock-svg');

      expect(svg).toHaveAttribute('stroke', 'red');
      expect(svg).toHaveAttribute('stroke-width', '3');
    });
  });

  // Test event handling
  describe('Event Handling', () => {
    it('responds to click events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Icon svg={MockSvg} onClick={handleClick} />);
      const svg = screen.getByTestId('mock-svg');

      await user.click(svg);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles hover states correctly', async () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      const user = userEvent.setup();

      render(
        <Icon
          svg={MockSvg}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />,
      );
      const svg = screen.getByTestId('mock-svg');

      await user.hover(svg);
      expect(handleMouseEnter).toHaveBeenCalled();

      await user.unhover(svg);
      expect(handleMouseLeave).toHaveBeenCalled();
    });
  });

  // Test created icons using createIcon
  describe('Created Icons', () => {
    it('maintains proper display name', () => {
      expect(TestIcon.displayName).toBe('IconMockSvg');
    });

    it('preserves accessibility props from creation', () => {
      render(<TestIcon />);
      const svg = screen.getByTestId('mock-svg');

      expect(svg).toHaveAttribute('aria-label', 'Test Icon');
      expect(svg).toHaveAttribute('role', 'img');
    });

    it('allows overriding default props', () => {
      render(<TestIcon label="Override Label" decorative />);
      const svg = screen.getByTestId('mock-svg');

      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('role', 'presentation');
    });

    it('creates icon component with default IconComponent name when no display name', () => {
      expect(TestIconWithoutDisplayName.displayName).toBe('IconComponent');
    });
  });
});

type BaseVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type ButtonVariant = BaseVariant | ('ghost' | 'link' | 'outline');
type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
type ButtonShape = 'wide' | 'block' | 'circle' | 'square';
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  glass?: boolean;
  'no-animation'?: boolean;
  shape?: ButtonShape;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export interface ModalProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  backdrop?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface DropdownProps {
  items?: React.ReactNode[];
}

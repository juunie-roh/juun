type BaseVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
type Size = 'lg' | 'md' | 'sm' | 'xs';

type ButtonVariant = BaseVariant | ('ghost' | 'link' | 'outline');
type ButtonShape = 'wide' | 'block' | 'circle' | 'square';
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  disabled?: boolean;
  glass?: boolean;
  'no-animation'?: boolean;
  shape?: ButtonShape;
}

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  'collapse-title': React.ReactNode;
  'collapse-title-className'?: string;
  'collapse-content': React.ReactNode;
  icon?: 'arrow' | 'plus';
  open?: boolean;
}

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  'menu-title'?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  focus?: boolean;
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

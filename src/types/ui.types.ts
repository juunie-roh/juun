import type { LinkProps as NLinkProps } from 'next/link';

type ColorVariant = 'neutral' | 'primary' | 'secondary' | 'accent';
type Direction = 'vertical' | 'horizontal';
type StatusVariant = 'info' | 'success' | 'warning' | 'error';
type BaseVariant = ColorVariant | StatusVariant;
type Size = 'lg' | 'md' | 'sm' | 'xs';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusVariant;
  'alert-title'?: React.ReactNode;
  'alert-description'?: React.ReactNode;
  icon?: React.ReactNode;
}

type BadgeVariant = BaseVariant | 'ghost';
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  outline?: boolean;
  size?: Size;
}

type ButtonVariant = BaseVariant | 'ghost' | 'link';
type ButtonShape = 'wide' | 'circle' | 'square';
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  outline?: boolean;
  size?: Size;
  shape?: ButtonShape;
  block?: boolean;
  'no-animation'?: boolean;
  disabled?: boolean;
  glass?: boolean;
}

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  'collapse-title': React.ReactNode;
  'collapse-title-className'?: string;
  'collapse-content': React.ReactNode;
  icon?: 'arrow' | 'plus';
  open?: boolean;
}

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BaseVariant;
  direction?: Direction;
  position?: 'start' | 'end';
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
}

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NLinkProps>,
    NLinkProps,
    React.RefAttributes<HTMLAnchorElement> {
  variant?: BaseVariant;
  'hover-only'?: boolean;
}

export type MenuItem = {
  value: React.ReactNode;
  key: React.Key;
  href: string;
  title?: boolean;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  dropdown?: boolean;
  children?: MenuItem[];
};
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  'menu-items'?: MenuItem[];
  size?: Size;
  direction?: Direction;
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

export interface Step extends React.HTMLAttributes<HTMLLIElement> {
  variant?: BaseVariant;
  'data-content'?: string;
}
export interface StepsProps extends React.HTMLAttributes<HTMLUListElement> {
  steps: Step[];
  direction?: Direction;
}

export type TableData<T> = T & {
  rowKey: React.Key;
};
export interface TableColumn<T> {
  header: string;
  accessorKey: keyof T;
  /**
   * The render method of the column
   * @param value a row item of the table
   */
  render?: <K extends keyof T>(value: T[K]) => React.ReactNode;
  className?: string;
  pin?: boolean;
}
export interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  className?: string;
  // Pagination props
  pageSize?: number;
  /**
   * When you set the pagination as `server`, you should specify the `totalPages` and `onPageChange` props.
   */
  pagination?: 'client' | 'server' | false;
  totalPages?: number;
  onPageChange?: () => void;
  // Sorting props
  onSort?: (by: keyof T, order: any) => T[];
  // Selection props
  selectable?: boolean;
  selectedRows?: T[];
  onRowSelect?: (row: T) => void;
  onSelectAll?: (rows: T[]) => void;
  // Style props
  zebra?: boolean;
  /**
   * For `<table>` to make all the rows inside `<thead>` and `<tfoot>` sticky
   */
  'pin-rows'?: boolean;
  /**
   * For `<table>` to make all the `<th>` columns sticky
   */
  'pin-cols'?: boolean;
  size?: Size;
}

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-tip': string;
  variant?: BaseVariant;
  position?: 'top' | 'bottom' | 'left' | 'right';
  open?: boolean;
}

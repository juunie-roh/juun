type ColorVariant = 'neutral' | 'primary' | 'secondary' | 'accent';
type StatusVariant = 'info' | 'success' | 'warning' | 'error';
type BaseVariant = ColorVariant | StatusVariant;
type Size = 'lg' | 'md' | 'sm' | 'xs';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusVariant;
  'alert-title'?: React.ReactNode;
  'alert-description'?: React.ReactNode;
  icon?: React.ReactNode;
}

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

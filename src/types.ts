export interface Column<T> {
  header: string;
  accessor: keyof T;
  renderer?: (value: T[keyof T], row?: T) => string;
  className?: string;
}

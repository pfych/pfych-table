declare module 'simple-table' {
  interface Column<T> {
    header: string;
    accessor: keyof T;
    renderer?: (value: T[keyof T], row?: T) => string;
    className?: string;
  }

  const createSortableTable: (table: Element) => void;

  const renderTable: <T>(args: {
    columns: Column<T>[];
    data: T[];
    sortable?: boolean;
  }) => Element;

  export { renderTable, createSortableTable, Column };
}

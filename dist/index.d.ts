declare module 'simple-table/index' {
  import { Column } from 'simple-table/types';
  const renderTable: <T>(args: {
      columns: Column<T>[];
      data: T[];
      sortable?: boolean;
  }) => Element;
  export { renderTable, Column };

}
declare module 'simple-table/types' {
  export interface Column<T> {
      header: string;
      accessor: keyof T;
      renderer?: (value: T[keyof T], row?: T) => string;
      className?: string;
  }

}
declare module 'simple-table' {
  import main = require('simple-table/src/index');
  export = main;
}
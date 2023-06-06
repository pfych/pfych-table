import { Column } from './types';

const renderTable = <T>(args: {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
}): Element => {
  const { columns, data, sortable } = args;
  const wrapper = document.createElement('div');
  wrapper.className = sortable ? 'sortable' : '';

  const table = document.createElement('table');
  const header = document.createElement('thead');
  const body = document.createElement('tbody');

  wrapper.append(table);
  table.append(header);
  table.append(body);

  const headerRow = document.createElement('tr');
  headerRow.className = 'header';
  header.append(headerRow);

  columns.forEach((cell) => {
    const columnHeader = document.createElement('th');
    columnHeader.innerText = cell.header;
    headerRow.append(columnHeader);
  });

  data.forEach((cell) => {
    const row = document.createElement('tr');

    columns.forEach((parentColumn) => {
      const newCell = document.createElement('td');
      if (parentColumn.className) {
        newCell.setAttribute('class', parentColumn.className);
      }

      newCell.innerText = `${
        parentColumn.renderer
          ? parentColumn.renderer(cell[parentColumn.accessor], cell)
          : cell[parentColumn.accessor]
      }`;

      row.append(newCell);
    });

    body.append(row);
  });

  return wrapper;
};

export { renderTable, Column };

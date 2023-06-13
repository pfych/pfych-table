import { Column } from './types';

export const createSortableTable = (table: Element): void => {
  let lastClicked = '';

  const sortRows = (sortBy: string, header: Element, rows: Element[]) => {
    const allHeaders = [...(header.querySelectorAll('th') || [])];
    const indexOfSortBy = allHeaders
      .map((header) => header.innerText)
      .indexOf(sortBy);

    allHeaders.forEach((header) => {
      header.style.textDecoration = 'none';
      header.style.userSelect = 'none';
    });
    allHeaders[indexOfSortBy].style.textDecoration = 'underline';

    const sortedRows = rows.sort((rowA, rowB) => {
      const rowAValue =
        rowA.querySelectorAll('td')[indexOfSortBy].innerText || 'z';
      const rowBValue =
        rowB.querySelectorAll('td')[indexOfSortBy].innerText || 'z';

      const rowAValueSortable = /^[0-9,.:]*$/.test(rowAValue)
        ? parseInt(rowAValue.replace(/[,:]/g, ''))
        : rowAValue;

      const rowBValueSortable = /^[0-9,.:]*$/.test(rowBValue)
        ? parseInt(rowBValue.replace(/[,;]/g, ''))
        : rowBValue;

      if (rowAValueSortable > rowBValueSortable) {
        return lastClicked === sortBy ? -1 : 1;
      }

      if (rowAValueSortable < rowBValueSortable) {
        return lastClicked === sortBy ? 1 : -1;
      }

      return 0;
    });

    lastClicked = lastClicked === sortBy ? '' : sortBy;

    const tableBody = rows[0].parentElement;

    tableBody.innerHTML = '';
    tableBody.append(...sortedRows);
  };

  const header = table.querySelector('thead tr');
  const rows = [...(table.querySelectorAll('tbody tr') || [])];

  header.querySelectorAll('th').forEach((node) => {
    node.style.setProperty('cursor', 'pointer');
    node.addEventListener('click', () =>
      sortRows(node.innerText, header, rows),
    );
  });
};

export const renderTable = <T>(args: {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
}): Element => {
  const { columns, data, sortable } = args;
  const wrapper = document.createElement('div');

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

  if (sortable) {
    createSortableTable(table);
  }

  return wrapper;
};

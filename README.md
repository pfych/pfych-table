# Simple Table Renderer `pfych-table`

Taking an input of data and options, return a html `Element` which can then be inserted into the DOM. This is a tool used on [my website](https://pfy.ch) to generate certain tables.

## Example

```ts
const renderTarget = document.getElementsByClassName('renderTarget')[0];

const myData = [
  { complete: false, description: "Foo" },
  { complete: true, description: "Bar" }
]

renderTarget.append(
  renderTable<{complete: boolean, description: string}>({
    sortable: true,
    data: myData, 
    columns: [
      {
        header: '?',
        accessor: 'complete',
        renderer: (value) => (value ? 'X' : ''),
      },

      {
        header: 'Description',
        accessor: 'description',
      },
    ],
  }),
);

/** Renders the following HTML Table:
 * |  ?  | Description |
 * | --- | ----------- |
 * |     | Foo         |
 * |  X  | Bar         |
 */
```

## Optional Properties

### Table: `sortable?: boolean`

Allows the table to be sortable, will auto-wrap the table in a `createSortableTable()` call. This is exported for other tables, it takes an input of `Element` and returns `void`. Calling will add click handlers & functions to the table.

### Column: `className?: string`

Apply a class to every cell in the column

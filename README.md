# Simple Table Renderer

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

Stub for later, applies a className to the entire table to allow for sorting target

### Column: `className?: string`

Apply a class to every cell in the column

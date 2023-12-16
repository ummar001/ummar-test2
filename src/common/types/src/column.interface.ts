export interface IColumn<T> {
  title?: string
  render: (value: T, index: number) => React.ReactNode
  accessor?: (data: T) => string | number;
  sortable?: boolean
}

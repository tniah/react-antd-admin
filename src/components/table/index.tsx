import type { TableProps as AntdTableProps } from 'antd';
import { Table as AntdTable } from 'antd';

interface TableProps<T extends object> extends AntdTableProps<T> {
  height?: string;
}

const Table = <T extends object = object>(props: TableProps<T>) => {
  const { height, pagination, ...rest } = props;
  const defaultPagination = {
    size: 'default',
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [ '10', '20', '50', '100' ],
    defaultPageSize: 10,
  };
  const combinedPagination = typeof pagination === 'object' ? { ...defaultPagination, ...pagination } : {};

  return (
    <div style={ { height } }>
      <AntdTable<T> { ...rest } scroll={ { x: 'max-content', y: '100%' } } pagination={ combinedPagination } />
    </div>
  );
};

Table.defaultProps = {
  size: 'middle',
  height: 'auto',
} as TableProps<any>;

export default Table;

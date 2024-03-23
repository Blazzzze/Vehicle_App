import { Table } from "antd/lib";

const AntdTable = ({ data, columns }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="overflow-x-auto"
      rowKey="Name"
    />
  );
};

export default AntdTable;

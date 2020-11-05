import { Table, Empty } from "antd";
import { ColumnProps, CompareFn } from "antd/es/table";
import logo from "assets/images/fbrocketlogo.png";
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import s from "./CreatorsHub.module.scss";
import { getFormattedDate } from "utilities";

interface Props {
  results: Array<Object>;
  tableDataType: string;
}

const CreatorsHubContentTable: React.FC<Props> = (props: Props) => {
  const onChange = (pagination, filters, sorter) => {
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      filters: [],
      render: (value, row, index) => (
        <Image
          src={value ? value : logo}
          size={"tiny"}
          className={s.contentTableThumbnailImage}
        />
      ),
      width: 110,
    },
    {
      title: "Title",
      dataIndex: "title",
      defaultSortOrder: "ascend",
      sorter: (((a, b) => a.title > b.title) as unknown) as CompareFn<any>,
      render: (value, row, index) => <Link to={row.redirectURL}>{value}</Link>,
      width: 200,
    },
    {
      title: "Date Uploaded",
      dataIndex: "dateCreated",
      defaultSortOrder: "ascend",
      sorter: (((a, b) =>
        a.dateCreated._seconds >
        b.dateCreated._seconds) as unknown) as CompareFn<any>,
      render: (value, row, index) => getFormattedDate(value._seconds),
      width: 140,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      defaultSortOrder: "ascend",
      sorter: (((a, b) =>
        a.lastUpdated._seconds >
        b.lastUpdated._seconds) as unknown) as CompareFn<any>,
      render: (value, row, index) => getFormattedDate(value._seconds),
      width: 140,
    },
  ];

  const data = React.useMemo(() => props.results, [props.results]);
  const noDataText = "No content";

  return (
    <Table
      columns={columns}
      dataSource={data}
      footer={null}
      onChange={onChange}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={noDataText}
          />
        ),
      }}
      scroll={{ y: 300 }}
    />
  );
};

export default CreatorsHubContentTable;

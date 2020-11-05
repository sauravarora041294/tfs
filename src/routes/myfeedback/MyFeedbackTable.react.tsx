import { Rate, Table, Empty } from "antd";
import { ColumnProps, CompareFn } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import {
  getFormattedDate,
  compareNumericValues,
  compareAlphanumericValues,
} from "utilities";
import { ResourceFilterItem } from "./MyFeedbackReducer";
import PaginationItemRender from "components/PaginationItemRender";

interface Props {
  ratings: Array<Object>;
  resourceFilters: Array<ResourceFilterItem>;
}

const MyFeedbackTable: React.FC<Props> = (props: Props) => {
  const onChange = (pagination, filters, sorter) => {};

  const columns: Array<ColumnProps<any>> = [
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (((a, b) =>
        compareNumericValues(a.rating, b.rating)) as unknown) as CompareFn<any>,
      render: (value, row, index) => <Rate disabled allowHalf value={value} />,
      width: 140,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      width: 200,
    },
    {
      title: "Video",
      dataIndex: "metadata",
      sorter: (((a, b) =>
        compareAlphanumericValues(
          a.metadata.resource.title,
          b.metadata.resource.title,
        )) as unknown) as CompareFn<any>,
      filters: props.resourceFilters,
      onFilter: (value, record) => record.resourceId === value,
      render: (value, row, index) => (
        <Link to={row.redirectURL}>{value.resource.title}</Link>
      ),
      width: 200,
    },
    {
      title: "Date Submitted",
      dataIndex: "dateCreated",
      sorter: (((a, b) =>
        compareNumericValues(
          a.dateCreated._seconds,
          b.dateCreated._seconds,
        )) as unknown) as CompareFn<any>,
      render: (value, row, index) => getFormattedDate(value._seconds),
      width: 140,
    },
  ];

  const data = React.useMemo(() => props.ratings, [props.ratings]);

  const noDataText = "No ratings to show yet";

  return (
    <Table
      columns={columns}
      dataSource={data}
      footer={null}
      onChange={onChange}
      locale={{ emptyText: noDataText }}
      pagination={{
        pageSize: 10,
        size: "small",
        hideOnSinglePage: true,
        itemRender: PaginationItemRender,
      }}
    />
  );
};

export default MyFeedbackTable;

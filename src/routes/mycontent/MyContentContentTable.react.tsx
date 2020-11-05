import { Table, Menu, Dropdown, Icon, Button, Empty } from "antd";
import { ColumnProps } from "antd/es/table";
import { CompareFn } from "antd/lib/table";
import logo from "assets/images/fbrocketlogo.png";
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import s from "./MyContent.module.scss";
import {
  getFormattedDate,
  compareNumericValues,
  compareAlphanumericValues,
} from "utilities";
import * as DataTypes from "data/types";
import PaginationItemRender from "components/PaginationItemRender";

interface Props {
  results: Array<DataTypes.Content>;
  tableDataType?: string;
  didClickEditContent: (contentType: string, objectID: string) => void;
  didClickDeleteContent: (content: DataTypes.Content) => void;
  didClickViewContent: (contentType: string, objectID: string) => void;
  currentUser: DataTypes.Creator;
}
const paginationConfig = {
  pageSize: 10,
  size: "small",
  hideOnSinglePage: true,
  itemRender: PaginationItemRender,
};

const MyContentContentTable: React.FC<Props> = (props: Props) => {
  const actionCellRenderer = (content: DataTypes.Content, row, index) => {
    const handleMoreButtonMenuClick = e => {
      switch (e.key) {
        case "view":
          props.didClickViewContent(row.contentType, row.objectID);
          return;
        case "edit":
          props.didClickEditContent(row.contentType, row.objectID);
          return;
        case "remove":
          props.didClickDeleteContent(row as DataTypes.Content);
          return;
        default:
          return;
      }
    };

    const viewContentMenuItem = (
      <Menu.Item key="view">
        <Icon type="eye" /> View
      </Menu.Item>
    );

    const userCanEditContent = !(
      (row.contentType === "mission" || row.contentType === "playlist") &&
      row.creatorUserId !== props.currentUser.objectID
    );

    const editContentMenuItem = (
      <Menu.Item key="edit">
        <Icon type="edit" /> {userCanEditContent ? "Edit" : "Contribute"}
      </Menu.Item>
    );

    const removeContentMenuItem = (
      <Menu.Item key="remove">
        <Icon type="delete" /> Delete
      </Menu.Item>
    );

    const moreButtonMenuItems =
      props.currentUser.userId === content.creatorUserId
        ? [viewContentMenuItem, editContentMenuItem, removeContentMenuItem]
        : [viewContentMenuItem, editContentMenuItem];

    const moreButtonMenu = (
      <Menu onClick={handleMoreButtonMenuClick}>{moreButtonMenuItems}</Menu>
    );

    const moreButton = (
      <Dropdown overlay={moreButtonMenu}>
        <Button>
          <Icon type="more" />
        </Button>
      </Dropdown>
    );

    return moreButton;
  };

  const columns: Array<ColumnProps<any>> = [
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
      width: 160,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (((a, b) =>
        compareAlphanumericValues(a.title, b.title)) as unknown) as CompareFn<
        any
      >,
      render: (value, row, index) => <Link to={row.redirectURL}>{value}</Link>,
      width: 350,
    },
    {
      title: "Date Uploaded",
      dataIndex: "dateCreated",
      defaultSortOrder: "descend",
      sorter: (((a, b) =>
        compareNumericValues(
          a.dateCreated._seconds,
          b.dateCreated._seconds,
        )) as unknown) as CompareFn<any>,
      render: (value, row, index) => getFormattedDate(value._seconds),
      width: 300,
    },
    {
      title: "Views",
      dataIndex: "totalViews",
      sorter: (((a, b) =>
        compareNumericValues(
          a.totalViews,
          b.totalViews,
        )) as unknown) as CompareFn<any>,
      render: (value, row, index) => (value ? value : "--"),
    },
    {
      title: "Users Helped",
      dataIndex: "totalUniqueViews",
      sorter: (((a, b) =>
        compareNumericValues(
          a.totalUniqueViews,
          b.totalUniqueViews,
        )) as unknown) as CompareFn<any>,
      render: (value, row, index) => (value ? value : "--"),
    },
    {
      title: "Rating",
      dataIndex: "avgRating",
      sorter: (((a, b) =>
        compareNumericValues(
          a.avgRating,
          b.avgRating,
        )) as unknown) as CompareFn<any>,
      render: (value, row, index) =>
        value ? Math.round(value * 100) / 100 + "/5" : "--",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: actionCellRenderer,
    },
  ];

  const data = React.useMemo(() => {
    return props.results;
  }, [props.results]);

  const noDataText = "No content";

  return (
    <Table
      columns={columns}
      dataSource={data}
      footer={null}
      onChange={null}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={noDataText}
          />
        ),
      }}
      pagination={paginationConfig}
      className={s.myContentTable}
    />
  );
};

export default MyContentContentTable;

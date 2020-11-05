import {
  Button,
  Card,
  Typography,
  Empty,
  Menu,
  Icon,
  Dropdown,
  Tabs,
} from "antd";
import { Image } from "semantic-ui-react";
import * as DataTypes from "data/types";
import React from "react";
import s from "./EditMission.module.scss";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { CompareFn } from "antd/lib/table";
import logo from "assets/images/fbrocketlogo.png";
import { Link } from "react-router-dom";
import {
  getFormattedDate,
  compareNumericValues,
  compareAlphanumericValues,
} from "utilities";
import PaginationItemRender from "components/PaginationItemRender";
import WhiteCard from "components/WhiteCard";
interface Props {
  mission: DataTypes.Mission;
  myContent: Array<DataTypes.Content>;
  openAddContentToMissionModal: () => void;
  didClickEditContent: (contentType: string, objectID: string) => void;
  didClickRemoveContent: (contentType: string, objectID: string) => void;
  didClickViewContent: (contentType: string, objectID: string) => void;
  isApprovedContributor?: boolean;
}

const tabList = [
  {
    key: "all",
    tab: "All",
  },
  {
    key: "playlists",
    tab: "Playlists",
  },
  {
    key: "resources",
    tab: "Videos",
  },
];

const EditMissionContentCard: React.FC<Props> = (props: Props) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>("all");

  const actionCellRenderer = (value, row, index) => {
    const handleMoreButtonMenuClick = e => {
      switch (e.key) {
        case "view":
          props.didClickViewContent(row.contentType, row.objectID);
          return;
        case "edit":
          props.didClickEditContent(row.contentType, row.objectID);
          return;
        case "remove":
          props.didClickRemoveContent(row.contentType, row.objectID);
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

    const editContentMenuItem = (
      <Menu.Item key="edit">
        <Icon type="edit" /> Edit
      </Menu.Item>
    );

    const removeContentMenuItem = (
      <Menu.Item key="remove">
        <Icon type="delete" /> Remove from Collection
      </Menu.Item>
    );

    const moreButtonMenuItems = [
      viewContentMenuItem,
      editContentMenuItem,
      removeContentMenuItem,
    ];

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

  const onChange = (pagination, filters, sorter) => {};
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
      width: 110,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (((a, b) =>
        compareAlphanumericValues(a.title, b.title)) as unknown) as CompareFn<
        any
      >,
      render: (value, row, index) => <Link to={row.redirectURL}>{value}</Link>,
      width: 500,
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
      title: "Actions",
      dataIndex: "",
      render: actionCellRenderer,
    },
  ];

  const noDataText = "No content";

  const addContentButton = (
    <Button
      key={"addcontent"}
      icon={"file-add"}
      disabled={!props.isApprovedContributor}
      onClick={() => props.openAddContentToMissionModal()}
    >
      Add Content
    </Button>
  );

  const playlists = React.useMemo(() => {
    return props.myContent
      .filter(c => c.contentType === "playlist")
      .map(p => ({
        ...p,
        contentType: "playlist",
        redirectURL: `/editplaylist/${p.objectID}`,
        key: p.objectID,
      }));
  }, [props.myContent]);

  const resources = React.useMemo(() => {
    return props.myContent
      .filter(c => c.contentType === "resource")
      .map(r => ({
        ...r,
        contentType: "resource",
        redirectURL: `/editvideo/${r.objectID}`,
        key: r.objectID,
      }));
  }, [props.myContent]);

  const allContent = React.useMemo(() => {
    return playlists.concat(resources);
  }, [playlists, resources]);

  const contentResults = React.useMemo(() => {
    switch (activeTabKey) {
      case "all":
        return allContent;
      case "playlists":
        return playlists;
      case "resources":
        return resources;
      default:
        return [];
    }
  }, [activeTabKey, props.myContent, allContent]);

  const tableElement = React.useMemo(
    () => (
      <Table
        columns={columns}
        dataSource={contentResults}
        footer={null}
        onChange={onChange}
        pagination={{ itemRender: PaginationItemRender }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={noDataText}
            />
          ),
        }}
      />
    ),

    [contentResults, columns],
  );
  return (
    <WhiteCard
      smallSizeTitleAndSubtitle
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>{"My Content in this Collection"}</div>
          {addContentButton}
        </div>
      }
      subTitle=""
    >
      <Tabs defaultActiveKey="all" onChange={key => setActiveTabKey(key)}>
        <Tabs.TabPane tab={tabList[0].tab} key={tabList[0].key}>
          {tableElement}
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabList[1].tab} key={tabList[1].key}>
          {tableElement}
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabList[2].tab} key={tabList[2].key}>
          {tableElement}
        </Tabs.TabPane>
      </Tabs>
    </WhiteCard>
    //     <Card
    //   title={
    //     <Typography.Text className={s.contentTableHeaderText}>
    //       {"My Content in this Collection"}
    //     </Typography.Text>
    //   }
    //   activeTabKey={activeTabKey}
    //   tabList={tabList}
    //   onTabChange={key => setActiveTabKey(key)}
    //   extra={addContentButton}
    //   className={s.missionContentCard}
    // >
    //   <Table
    //     columns={columns}
    //     dataSource={contentResults}
    //     footer={null}
    //     onChange={onChange}
    //     pagination={{ itemRender: PaginationItemRender }}
    //     locale={{
    //       emptyText: (
    //         <Empty
    //           image={Empty.PRESENTED_IMAGE_SIMPLE}
    //           description={noDataText}
    //         />
    //       ),
    //     }}
    //   />
    // </Card>
  );
};

export default EditMissionContentCard;

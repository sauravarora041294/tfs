import { Button, Card, List, Tag, Typography, Table, Empty, Tabs } from "antd";
import { SortOrder } from "antd/lib/table";
import * as DataTypes from "data/types";
import { CONTENT_REQUEST_STATUS } from "data/types/enums";
import React from "react";
import Avatar from "components/Avatar";
import s from "./EditMission.module.scss";
import { getFormattedDate } from "utilities";
import PaginationItemRender from "components/PaginationItemRender";
import ClippedText from "components/ClippedText/index.react";
import CreatorAvatar from "components/CreatorAvatar";
import WhiteCard from "components/WhiteCard";

interface Props {
  mission: DataTypes.Mission;
  missionResources: Array<DataTypes.Resource>;
  missionPlaylists: Array<DataTypes.Playlist>;
  missionContentRequests: Array<DataTypes.ContentRequest>;
  showResolveContentRequestModal: (event: Object) => void;
  hideResolveContentRequestModal: (shouldReload: boolean) => void;
}

const EditMissionContentRequestsCard: React.FC<Props> = (props: Props) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>(
    CONTENT_REQUEST_STATUS.PENDING,
  );
  const tabList = [
    {
      key: CONTENT_REQUEST_STATUS.PENDING,
      tab: "Pending",
    },
    {
      key: CONTENT_REQUEST_STATUS.RESOLVED,
      tab: "Resolved",
    },
  ];

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      render: value => (
        <Avatar
          nameStyle={{ marginLeft: "15px" }}
          user={value}
          includeName
          fitParent
        />
      ),
    },
    {
      title: "Request",
      dataIndex: "description",
      width: 300,
      render: value => <ClippedText maxLines={2} text={value} />,
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
      defaultSortOrder: "descend" as SortOrder,
      sorter: (a, b) => a.upvotes - b.upvotes,
    },
    {
      title: "Date Requested",
      dataIndex: "dateCreated",
      defaultSortOrder: "descend" as SortOrder,
      sorter: (a, b) => a.dateCreated._seconds - b.dateCreated._seconds,
      render: value => getFormattedDate(value._seconds),
    },
    {
      title: "Action",
      render: value => (
        <Button
          onClick={() =>
            props.showResolveContentRequestModal(value.contentRequest)
          }
        >
          Resolve
        </Button>
      ),
    },
  ];

  const pendingContentRequests = React.useMemo(
    () =>
      props.missionContentRequests &&
      props.missionContentRequests.filter(
        contentRequest =>
          contentRequest.status === CONTENT_REQUEST_STATUS.PENDING,
      ),
    [props.missionContentRequests],
  );

  const resolvedContentRequests = React.useMemo(
    () =>
      props.missionContentRequests &&
      props.missionContentRequests.filter(
        contentRequest =>
          contentRequest.status === CONTENT_REQUEST_STATUS.RESOLVED,
      ),
    [props.missionContentRequests],
  );

  const pendingContentRequestsRows = React.useMemo(
    () =>
      pendingContentRequests &&
      pendingContentRequests.map(contentRequest => ({
        user: contentRequest.metadata.requester,
        description: contentRequest.description,
        upvotes: contentRequest.upvotes,
        dateCreated: contentRequest.dateCreated,
        contentRequest,
      })),
    [pendingContentRequests],
  );

  const missionContent = (props.missionResources as Array<
    DataTypes.Content
  >).concat(props.missionPlaylists);

  const resolvedContentRequestsRows = React.useMemo(
    () =>
      resolvedContentRequests &&
      resolvedContentRequests.map(contentRequest => ({
        resolver: contentRequest.metadata.resolver,
        requester: contentRequest.metadata.requester,
        contentRequest: contentRequest,
        contentList: contentRequest.contentIds.map(id =>
          missionContent.find(content => content.objectID === id),
        ),
      })),
    [
      resolvedContentRequests,
      props.missionResources,
      props.missionPlaylists,
      missionContent,
    ],
  );

  const pendingSection = React.useMemo(() => {
    return (
      activeTabKey === CONTENT_REQUEST_STATUS.PENDING && (
        <Table
          columns={columns}
          dataSource={pendingContentRequestsRows}
          pagination={{ pageSize: 5, itemRender: PaginationItemRender }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No pending content requests found"
              />
            ),
          }}
        />
      )
    );
  }, [activeTabKey, columns, pendingContentRequestsRows]);

  const subdomain = process.env.NODE_ENV === "production" ? "www." : "";

  const resolvedSection = React.useMemo(() => {
    return (
      activeTabKey === CONTENT_REQUEST_STATUS.RESOLVED && (
        <React.Fragment>
          <List
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No resolved content requests found"
                />
              ),
            }}
            bordered
            itemLayout="vertical"
            dataSource={resolvedContentRequestsRows}
            pagination={{ pageSize: 5, itemRender: PaginationItemRender }}
            renderItem={item => (
              <List.Item>
                {/* Resolver Name */}
                <div
                  className={s.resolvedRequestInfoSection}
                  style={{ display: "inline-block" }}
                >
                  <span className={s.resolvedRequestInfoSectionTitle}>
                    Resolved by :
                  </span>{" "}
                  &nbsp;
                  <CreatorAvatar creator={item.resolver}></CreatorAvatar>
                </div>
                <br />

                {/* Request Description */}
                <div className={s.resolvedRequestInfoSection}>
                  <span className={s.resolvedRequestInfoSectionTitle}>
                    Request :
                  </span>{" "}
                  &nbsp;
                  {item.requester.firstName} {item.requester.lastName}'s request
                  for "{item.contentRequest.description}".
                </div>
                {/* Resolution Explanation*/}
                <div className={s.resolvedRequestInfoSection}>
                  <span className={s.resolvedRequestInfoSectionTitle}>
                    Reason given :
                  </span>{" "}
                  &nbsp; {item.contentRequest.reviewDetails}
                </div>
                {/* Resolved with*/}
                <div className={s.resolvedRequestInfoSection}>
                  <span className={s.resolvedRequestInfoSectionTitle}>
                    {" "}
                    Resolved with:{" "}
                  </span>
                  &nbsp;
                  {item.contentList &&
                    item.contentList.map(content => (
                      <Tag color="blue">
                        {content.contentType === "resource" ? (
                          <a
                            href={`${window.origin.replace(
                              "creators.",
                              subdomain,
                            )}/resource/${content.objectID}`}
                          >
                            {content.title}
                          </a>
                        ) : (
                          <a
                            href={`${window.origin.replace(
                              "creators.",
                              subdomain,
                            )}/playlist/${content.objectID}`}
                            target={"_blank"}
                          >
                            {content.title}
                          </a>
                        )}
                      </Tag>
                    ))}
                </div>
              </List.Item>
            )}
          />
        </React.Fragment>
      )
    );
  }, [activeTabKey, resolvedContentRequestsRows]);

  return (
    <WhiteCard
      title={"Top Requests"}
      subTitle="These are the top videos & playlists users are requesting in this mission. Add a video or playlist that addresses a request, then mark it as resolved!"
      customBodyPaddingValues={{
        top: "1rem",
        left: "1rem",
        bottom: "1rem",
        right: "1rem",
      }}
      smallSizeTitleAndSubtitle
    >
      <Tabs defaultActiveKey="Pending" onChange={key => setActiveTabKey(key)}>
        <Tabs.TabPane tab={tabList[0].tab} key={tabList[0].key}>
          {pendingSection}
        </Tabs.TabPane>
        <Tabs.TabPane tab={tabList[1].tab} key={tabList[1].key}>
          {resolvedSection}
        </Tabs.TabPane>
      </Tabs>
    </WhiteCard>
  );
};

export default EditMissionContentRequestsCard;

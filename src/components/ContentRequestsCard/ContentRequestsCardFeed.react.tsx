import { Icon, Table, Button } from "antd";
import { Image } from "semantic-ui-react";
import * as DataTypes from "data/types";
import React from "react";
import s from "./ContentRequestsCard.module.scss";

import upvoteSVG from "assets/upvoteIconNew.svg";
import upvoteSVGBlue from "assets/images/upvoteIconBlue.svg";
import PaginationItemRender from "components/PaginationItemRender/index";
import ClippedText from "components/ClippedText/index.react";

interface Props {
  currentUser: DataTypes.User;
  contentRequestFormRef: React.MutableRefObject<any>;
  contentRequests: Array<DataTypes.ContentRequest>;
  handleSubmit: (e: Object) => void;
  handleUpvote: (contentRequest: DataTypes.ContentRequest) => void;
  isLoading: boolean;
  activeTab: string;
  windowWidth: number;
}

const components = {
  header: {
    wrapper: React.Fragment,
    row: React.Fragment,
    cell: React.Fragment,
  },
};

const paginationConfig = {
  pageSize: 40000,
  size: "small",
  hideOnSinglePage: true,
  itemRender: PaginationItemRender,
};
const upVoteSVG = () => {
  return <Image style={{ height: "33px", width: "36px" }} src={upvoteSVG} />;
};
const upVoteSVGBlue = () => {
  return (
    <Image style={{ height: "33px", width: "36px" }} src={upvoteSVGBlue} />
  );
};
const ContentRequestsCardView: React.FC<Props> = (props: Props) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>("topVoted");
  const tabList = [
    {
      key: "topVoted",
      tab: "Top Voted",
    },
    {
      key: "recent",
      tab: "Recent",
    },
  ];

  const getUpvoteButtonStyle = (
    contentRequest: DataTypes.ContentRequest,
  ): string =>
    props.currentUser &&
    contentRequest.upvoterUserIds &&
    contentRequest.upvoterUserIds.includes(props.currentUser.userId)
      ? s.contentRequestsCardHighlightedUpvoteButton
      : s.contentRequestsCardUpvoteButton;

  const columns = [
    {
      dataIndex: "upvotes",
      className: s.contentRequestsCardTableColumn,
      render: value => (
        <div className={s.upVoteBtnContainer}>
          <Button
            className={getUpvoteButtonStyle(value)}
            onClick={() => props.handleUpvote(value)}
          >
            <Icon
              component={
                value.upvoterUserIds &&
                value.upvoterUserIds.includes(props.currentUser.objectID)
                  ? upVoteSVGBlue
                  : upVoteSVG
              }
              style={{
                width: "36px",
                height: "33px",
                margin: "0 auto",
              }}
              className={s.contentRequestsCardUpvoteIcon}
            />
            <span className={s.upvoteText}>{value.upvotes} upvotes&nbsp;</span>
          </Button>
        </div>
      ),
    },
    {
      dataIndex: "description",
      className: s.contentRequestsCardTableColumn,
    },
  ];

  const topVotedContentRequestsRows = React.useMemo(
    () =>
      props.contentRequests &&
      props.contentRequests
        .sort((a, b) => b.upvotes - a.upvotes)
        .map(contentRequest => ({
          upvotes: contentRequest,
          description: (
            <ClippedText
              width={props.windowWidth === 400 ? 240 : props.windowWidth - 155}
              text={contentRequest.description}
              maxLines={2}
            />
          ),
        })),
    [props.contentRequests],
  );

  const recentContentRequestsRows = React.useMemo(
    () =>
      props.contentRequests &&
      props.contentRequests
        .sort((a, b) => b.dateCreated._seconds - a.dateCreated._seconds)
        .map(contentRequest => ({
          upvotes: contentRequest,
          description: (
            <ClippedText
              width={props.windowWidth === 400 ? 240 : props.windowWidth - 155}
              text={contentRequest.description}
              maxLines={2}
            />
          ),
        })),
    [props.contentRequests],
  );

  const topVotedSection = React.useMemo(() => {
    return (
      <Table
        className="topVotedTable"
        rowClassName={() => s.contentRequestsCardTableRow}
        components={components}
        columns={columns}
        dataSource={topVotedContentRequestsRows}
        pagination={paginationConfig}
      />
    );
  }, [columns, topVotedContentRequestsRows]);

  const recentSection = React.useMemo(
    () => (
      <Table
        className="recentTable"
        rowClassName={() => s.contentRequestsCardTableRow}
        components={components}
        columns={columns}
        dataSource={recentContentRequestsRows}
        pagination={paginationConfig}
      />
    ),
    [activeTabKey, columns, recentContentRequestsRows, props.contentRequests],
  );

  return (
    <React.Fragment>
      {props.activeTab == "topVoted" ? topVotedSection : recentSection}
    </React.Fragment>
  );
};

export default ContentRequestsCardView;

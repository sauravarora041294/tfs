import { Button, PageHeader, Typography, Dropdown, Menu, Icon } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./EditVideo.module.scss";

interface Props {
  currentUser: DataTypes.Creator;
  resource: DataTypes.Resource;
  history?: History;
  openDeleteVideoModal: () => void;
}

const EditVideoPageHeader: React.FC<Props> = (props: Props) => {
  const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
  const viewVideoButton = (
    <Button
      key={"view"}
      href={`${window.location.origin.replace(
        "creators.",
        subdomain,
      )}/resource/${props.resource.objectID}`}
      target={"_blank"}
    >
      {"View Video"}
    </Button>
  );

  const handleMoreButtonMenuClick = e => {
    switch (e.key) {
      case "delete":
        props.openDeleteVideoModal();
        return;
      default:
        return;
    }
  };

  const deleteMenuItem = (
    <Menu.Item key="delete">
      <Icon type="delete" /> Delete Video
    </Menu.Item>
  );

  const moreButtonMenuItems = [deleteMenuItem];

  const moreButtonMenu = (
    <Menu onClick={handleMoreButtonMenuClick}>{moreButtonMenuItems}</Menu>
  );

  const moreButton = (
    <Dropdown overlay={moreButtonMenu}>
      <Button>
        <Icon type="setting" />
      </Button>
    </Dropdown>
  );

  const actions = React.useMemo(() => {
    if (props.currentUser.objectID !== props.resource.creatorUserId) {
      return [viewVideoButton];
    } else {
      return [viewVideoButton, moreButton];
    }
  }, [props.currentUser.objectID, props.resource.creatorUserId]);

  const subtitleMessage = React.useMemo(() => {
    if (props.currentUser.objectID !== props.resource.creatorUserId) {
      return "You are not the creator of this video. Click the view video button to view it.";
    } else if (props.resource.creatorUserId === props.currentUser.objectID) {
      return "You are the creator of this video. Use this page to edit it.";
    } else {
      return null;
    }
  }, [props.currentUser.objectID, props.resource.creatorUserId]);

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title={
        <Typography.Title level={3} className={s.pageHeaderTitle}>
          {`Edit Video: ${props.resource.title}`}
        </Typography.Title>
      }
      subTitle={""}
      className={s.pageHeader}
      extra={actions}
    >
      <Typography.Paragraph className={s.pageHeaderSubtitleText}>
        {subtitleMessage}
      </Typography.Paragraph>
    </PageHeader>
  );
};

export default compose<Props, Props>(withRouter)(EditVideoPageHeader);

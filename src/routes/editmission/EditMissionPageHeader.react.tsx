import { Button, PageHeader, Typography, Dropdown, Menu, Icon } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./EditMission.module.scss";

interface Props {
  isApprovedContributor: boolean;
  hasMissionOwnerPermissions: boolean;
  hasRequestedContributorPermission: boolean;
  mission: DataTypes.Mission;
  currentUser: DataTypes.Creator;
  openJoinMissionModal: () => void;
  openAddContentModal: () => void;
  openEditMissionInfoModal: () => void;
  openDeleteMissionModal: () => void;
  history?: History;
}

const EditMissionPageHeader: React.FC<Props> = (props: Props) => {
  const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
  const viewCollectionButton = (
    <Button
      href={`${window.origin.replace("creators.", subdomain)}/collection/${
        props.mission.objectID
      }`}
      key={"view"}
      target={"_blank"}
    >
      <Icon type={"eye"} />
      View Collection
    </Button>
  );

  const requestContributorPermissionButton = (
    <Button
      onClick={props.openJoinMissionModal}
      disabled={props.hasRequestedContributorPermission}
      key={"requestpermission"}
    >
      {!props.hasRequestedContributorPermission
        ? "Become a Contributor"
        : "Contributor Permission Requested"}
    </Button>
  );

  const addContentButton = (
    <Button
      key={"addcontent"}
      icon={"folder-add"}
      onClick={() => props.openAddContentModal()}
      disabled={!props.isApprovedContributor}
    >
      Add Content
    </Button>
  );

  const handleMoreButtonMenuClick = e => {
    switch (e.key) {
      case "edit":
        props.openEditMissionInfoModal();
        return;
      case "delete":
        props.openDeleteMissionModal();
        return;
      default:
        return;
    }
  };

  const editInfoMenuItem = (
    <Menu.Item key="edit">
      <Icon type="edit" /> Edit Collection Details
    </Menu.Item>
  );

  const deleteMenuItem = (
    <Menu.Item key="delete">
      <Icon type="delete" /> Delete Collection
    </Menu.Item>
  );

  const moreButtonMenuItems = [editInfoMenuItem, deleteMenuItem];

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
    if (!props.isApprovedContributor) {
      return [requestContributorPermissionButton, viewCollectionButton];
    } else if (props.currentUser.objectID === props.mission.creatorUserId) {
      return [viewCollectionButton, addContentButton, moreButton];
    } else {
      return [viewCollectionButton, addContentButton];
    }
  }, [
    props.isApprovedContributor,
    props.currentUser.objectID,
    props.mission.creatorUserId,
  ]);

  const subtitleMessage = React.useMemo(() => {
    if (!props.isApprovedContributor) {
      return "You are not a contributor for this collection. Request contributor permission if you would like to add content to it.";
    } else if (props.mission.creatorUserId === props.currentUser.objectID) {
      return "You are the creator of this collection. Use this page to edit it, manage contributors, view content requests, or add content.";
    } else if (props.isApprovedContributor) {
      return "You are an approved contributor for this collection. Use this page to add content and manage content requests.";
    } else {
      return null;
    }
  }, [
    props.isApprovedContributor,
    props.currentUser.objectID,
    props.mission.creatorUserId,
  ]);

  const pageHeaderTitle = props.hasMissionOwnerPermissions
    ? `Edit Collection: ${props.mission.title}`
    : `Contribute to Collection: ${props.mission.title}`;

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title={
        <Typography.Title level={3} className={s.pageHeaderTitle}>
          {pageHeaderTitle}
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

export default compose<Props, Props>(withRouter)(EditMissionPageHeader);

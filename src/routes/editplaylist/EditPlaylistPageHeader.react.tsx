import { Button, PageHeader, Typography, Icon, Menu, Dropdown } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./EditPlaylist.module.scss";
import { getEditPlaylistUrlLocation, getPlaylistUrlLocation } from "utilities";

interface Props {
  directToCreatorsHubRoutes?: any;
  isApprovedContributor: boolean;
  hasRequestedContributorPermission: boolean;
  playlist: DataTypes.Playlist;
  currentUser: DataTypes.Creator;
  openJoinPlaylistModal: () => void;
  openEditPlaylistInfoModal: () => void;
  openReorderSectionsModal: () => void;
  openAddPlaylistSectionModal: () => void;
  openDeletePlaylistModal: () => void;
  history?: History;
  userLatestViewLogs?: DataTypes.UserLatestViewlogs;
}

const EditPlaylistPageHeader: React.FC<Props> = (props: Props) => {
  const sections = props.playlist.sections || [];
  const playlistResourceIds = sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), []);

  const resourceIdToLatestViewlog = props.userLatestViewLogs
    ? props.userLatestViewLogs.resourceIdToLatestViewlog
    : {};

  const viewlogs = resourceIdToLatestViewlog
    ? playlistResourceIds.map(
        resourceId => resourceIdToLatestViewlog[resourceId],
      )
    : [];

  const playlistLocation = props.directToCreatorsHubRoutes
    ? getEditPlaylistUrlLocation(props.playlist)
    : getPlaylistUrlLocation(props.playlist, viewlogs);

  const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
  const viewPlaylistButton =
    !props.isApprovedContributor && !props.playlist.isCollaborative ? null : (
      <Button
        href={`${window.origin.replace(
          "creators.",
          subdomain,
        )}${playlistLocation}`}
        key={"view"}
        target={"_blank"}
      >
        <Icon type={"eye"} />
        View Playlist
      </Button>
    );

  const requestContributorPermissionButton = (
    <Button
      onClick={props.openJoinPlaylistModal}
      disabled={props.hasRequestedContributorPermission}
      key={"requestpermission"}
    >
      {!props.hasRequestedContributorPermission
        ? "Become a Contributor"
        : "Contributor Permission Requested"}
    </Button>
  );

  const addSectionButton = (
    <Button
      key={"addsection"}
      icon={"folder-add"}
      onClick={() => props.openAddPlaylistSectionModal()}
      disabled={!props.isApprovedContributor}
    >
      Add Section
    </Button>
  );

  const handleMoreButtonMenuClick = e => {
    switch (e.key) {
      case "edit":
        props.openEditPlaylistInfoModal();
        return;
      case "reorder":
        props.openReorderSectionsModal();
        return;
      case "delete":
        props.openDeletePlaylistModal();
        return;
      default:
        return;
    }
  };

  const editInfoMenuItem = (
    <Menu.Item key="edit">
      <Icon type="edit" /> Edit Playlist Details
    </Menu.Item>
  );

  const reorderSectionsMenuItem = (
    <Menu.Item key="reorder">
      <Icon type="menu" /> Reorder Sections
    </Menu.Item>
  );

  const deleteMenuItem = (
    <Menu.Item key="delete">
      <Icon type="delete" /> Delete Playlist
    </Menu.Item>
  );

  const moreButtonMenuItems = [
    editInfoMenuItem,
    reorderSectionsMenuItem,
    deleteMenuItem,
  ];

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
    if (!props.isApprovedContributor && props.playlist.isCollaborative) {
      return [requestContributorPermissionButton, viewPlaylistButton];
    } else if (props.currentUser.objectID === props.playlist.creatorUserId) {
      return [viewPlaylistButton, addSectionButton, moreButton];
    } else {
      return [viewPlaylistButton];
    }
  }, [
    props.isApprovedContributor,
    props.playlist.isCollaborative,
    props.currentUser.objectID,
    props.playlist.creatorUserId,
  ]);

  const subtitleMessage = React.useMemo(() => {
    if (!props.isApprovedContributor) {
      return null; // This case is handled by the access alert.
    } else if (!props.isApprovedContributor) {
      return "You are not a contributor for this playlist so you cannot edit it.";
    } else if (props.playlist.creatorUserId === props.currentUser.objectID) {
      return "You are the owner of this playlist. Use this page to edit it or add content to it.";
    } else {
      return null;
    }
  }, [
    props.isApprovedContributor,
    props.playlist.isCollaborative,
    props.currentUser.objectID,
    props.playlist.creatorUserId,
  ]);

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title={
        <Typography.Title level={3} className={s.pageHeaderTitle}>
          {`Edit Playlist: ${props.playlist.title}`}
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

export default compose<Props, Props>(withRouter)(EditPlaylistPageHeader);

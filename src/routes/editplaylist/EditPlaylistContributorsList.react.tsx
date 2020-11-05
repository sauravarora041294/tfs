import { List, Typography, Button, Card } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./EditPlaylist.module.scss";
import EditPlaylistContributorListItem from "./EditPlaylistContributorListItem.react";
import WhiteCard from "components/WhiteCard";

interface Props {
  currentUser: DataTypes.Creator;
  contributors: Array<DataTypes.Creator>;
  playlist: DataTypes.Playlist;
  isApprovedContributor: boolean;
  hasPlaylistOwnerPermissions: boolean;
  openRemoveContributorModal: (contributor: DataTypes.Creator) => void;
  didClickBeginEditingContributors: () => void;
  didClickCancelEditingContributors: () => void;
  isEditingContributors: boolean;
}

const EditPlaylistContributorsList: React.FC<Props> = (props: Props) => {
  const sectionHeader = (
    <Typography.Text className={s.contributorsTitleText}>
      {"Playlist Contributors"}
    </Typography.Text>
  );

  const cancelEditingButton = (
    <Button
      onClick={() => props.didClickCancelEditingContributors()}
      className={s.cancelEditingButton}
    >
      Done
    </Button>
  );

  const manageContributorsButton = (
    <Button
      icon={"edit"}
      onClick={() => props.didClickBeginEditingContributors()}
    >
      Manage
    </Button>
  );

  const extra = React.useMemo(() => {
    const showManageContributorsButton =
      props.playlist.isCollaborative &&
      props.contributors.length > 1 &&
      props.currentUser.objectID === props.playlist.creatorUserId;
    if (props.isEditingContributors) {
      return cancelEditingButton;
    }
    if (showManageContributorsButton) {
      return manageContributorsButton;
    }
  }, [
    props.isEditingContributors,
    cancelEditingButton,
    manageContributorsButton,
  ]);

  return (
    <WhiteCard
      className={s.playlistContributorsListCard}
      title={
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {sectionHeader}
          {extra}
        </div>
      }
      smallSizeTitleAndSubtitle
      customBodyPaddingValues={{
        top: "1rem",
        bottom: "1rem",
        left: "1rem",
        right: "1rem",
      }}
    >
      <List
        loading={false}
        itemLayout="horizontal"
        loadMore={<div />}
        dataSource={props.contributors}
        locale={{ emptyText: "No one has added a video to this playlist yet." }}
        renderItem={contributor => (
          <EditPlaylistContributorListItem
            contributor={contributor}
            contributorIsPlaylistCreator={
              contributor.objectID === props.playlist.creatorUserId
            }
            hasPlaylistOwnerPermissions={props.hasPlaylistOwnerPermissions}
            openRemoveContributorModal={props.openRemoveContributorModal}
            currentUser={props.currentUser}
            isEditingContributors={props.isEditingContributors}
          />
        )}
      />
    </WhiteCard>
  );
};

export default EditPlaylistContributorsList;

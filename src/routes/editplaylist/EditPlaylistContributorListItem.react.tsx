import { List, Button, Typography } from "antd";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import s from "./EditPlaylist.module.scss";
import CreatorProfilePopover from "components/CreatorProfilePopover";

interface Props {
  contributor: DataTypes.Creator;
  currentUser: DataTypes.Creator;
  hasPlaylistOwnerPermissions: boolean;
  isEditingContributors: boolean;
  contributorIsPlaylistCreator: boolean;
  openRemoveContributorModal: (contributor: DataTypes.Creator) => void;
}

const EditPlaylistContributorListItem: React.FC<Props> = (props: Props) => {
  const removeContributorButton = React.useMemo(() => {
    const showRemoveContributorButton =
      props.hasPlaylistOwnerPermissions &&
      props.isEditingContributors &&
      props.contributor.objectID !== props.currentUser.objectID;

    return showRemoveContributorButton && (
      <Button
        type="danger"
        onClick={() => props.openRemoveContributorModal(props.contributor)}
      >
        Remove
    </Button>
    )
  }, [props.hasPlaylistOwnerPermissions, props.isEditingContributors, props.contributor, props.currentUser])

  const creatorPopver = React.useMemo(() => {
    return props.contributorIsPlaylistCreator
      ? `${props.contributor.firstName} ${props.contributor.lastName} (Admin)`
      : `${props.contributor.firstName} ${props.contributor.lastName}`;
  }, [props.contributorIsPlaylistCreator, props.contributor])

  return (
    <List.Item className={s.listItem} extra={removeContributorButton}>
      <Avatar user={props.contributor} />
      <Typography.Paragraph className={s.resourceTitle}>
        <CreatorProfilePopover creator={props.contributor}>
          {creatorPopver}
        </CreatorProfilePopover>
      </Typography.Paragraph>
    </List.Item>
  );
};

export default EditPlaylistContributorListItem;

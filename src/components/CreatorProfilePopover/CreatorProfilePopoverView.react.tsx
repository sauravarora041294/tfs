import { Popover, Tag, Typography, Divider, Icon, Row, Col } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import Avatar from "components/Avatar";
import { Grid } from "semantic-ui-react";
import s from "./CreatorProfilePopover.module.scss";
import ContentCountMetadataLabel from "./ContentCountMetadataLabel.react";

interface Props {
  creator: DataTypes.Creator;
  creatorWithMetadata: DataTypes.CreatorWithMetadata;
  children: React.ReactNode;
  error?: Error;
}

const CreatorProfilePopoverView: React.FC<Props> = (props: Props) => {
  const creatorNameInfo = React.useMemo(
    () => (
      <div className={s.creatorProfileName}>
        {`${props.creator.firstName} ${props.creator.lastName}`}
      </div>
    ),
    [props.creator],
  );

  const showCreatorRoleInfo =
    props.creator.creatorDetails &&
    props.creator.creatorDetails.title &&
    props.creator.creatorDetails.company;
  const creatorRoleInfo = React.useMemo(
    () =>
      showCreatorRoleInfo && (
        <div className={s.creatorProfileRoleTitle}>
          {`${props.creator.creatorDetails.title} at ${props.creator.creatorDetails.company}`}
        </div>
      ),
    [showCreatorRoleInfo, props.creator],
  );

  const showCreatorProfileMetadata =
    props.creatorWithMetadata && props.creatorWithMetadata.metadata;
  const numPlaylists = showCreatorProfileMetadata
    ? props.creatorWithMetadata.metadata.createdPlaylists.length
    : 0;

  const numVideos = showCreatorProfileMetadata
    ? props.creatorWithMetadata.metadata.uploadedResources.length
    : 0;

  const numMissions = showCreatorProfileMetadata
    ? props.creatorWithMetadata.metadata.contributedMissions.length
    : 0;

  const showCreatorBio =
    props.creator.creatorDetails && props.creator.creatorDetails.bio;
  const creatorBio = React.useMemo(
    () =>
      showCreatorBio && (
        <div className={s.creatorProfileBioContainer}>
          {props.creator.creatorDetails.bio}
        </div>
      ),
    [showCreatorBio, props.creator],
  );

  const popoverContent = (
    <div className={s.popOverContent}>
      <div className={s.profileHeaderRow}>
        <div className={s.profileAvatarContainer}>
          <Avatar
            user={props.creator}
            fitParent={true}
            size={40}
            className={s.profileAvatar}
          />
        </div>

        <div className={s.profileHeaderTextContainer}>
          {creatorNameInfo}
          {creatorRoleInfo}
        </div>
      </div>
      <Row>
        <Col className={s.creatorBioWrapper} span={24}>
          {creatorBio}
        </Col>
      </Row>
      <div className={s.profileInfoRow}>
        <div className={s.creatorProfileFooter}>
          <ContentCountMetadataLabel contentType={"Video"} count={numVideos} />{" "}
          <div className={s.statsDivider}>|</div>
          <ContentCountMetadataLabel
            contentType={"Playlist"}
            count={numPlaylists}
          />{" "}
          <div className={s.statsDivider}>|</div>
          <ContentCountMetadataLabel
            contentType={"Collection"}
            count={numMissions}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      overlayStyle={{
        minWidth: "350px",
        maxWidth: "550px",
        borderRadius: "10px",
      }}
      placement="topRight"
      content={popoverContent}
    >
      <div className={`${s.profileLink} profileLink`}>{props.children}</div>
    </Popover>
  );
};

export default CreatorProfilePopoverView;

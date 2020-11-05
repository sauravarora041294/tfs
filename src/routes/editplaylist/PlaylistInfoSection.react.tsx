import { Alert, Button, Card, Typography } from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import React from "react";
import { Image } from "semantic-ui-react";
import s from "./EditPlaylist.module.scss";

interface Props {
  currentUser: DataTypes.Creator;
  playlist: DataTypes.Playlist;
  playlistCreator: DataTypes.User;
  isApprovedContributor: boolean;
}

const PlaylistInfoSection: React.FC<Props> = (props: Props) => {
  const thumbnailSrc = props.playlist.thumbnailUrl
    ? props.playlist.thumbnailUrl
    : logo;

  const missingThumbnailAlert = (
    <Alert
      message="Missing Thumbnail"
      description="Please upload a thumbnail by clicking the Edit Info button below."
      type="warning"
      showIcon
    />
  );

  const ThumbnailWrapper = () => (
    <div
      className={s.thumbnailWrapper}
      style={{
        background: `url(${thumbnailSrc})`,
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );

  return (
    <Card cover={<ThumbnailWrapper />} className={s.playlistInfoCard}>
      {props.playlist.thumbnailUrl ? null : missingThumbnailAlert}
      <Typography.Title level={4} className={s.playlistTitleText}>
        {props.playlist.title}
      </Typography.Title>
      <Typography.Paragraph className={s.playlistDescriptionText}>
        {props.playlist.description}
      </Typography.Paragraph>
      <Typography.Paragraph className={s.playlistDescriptionText}>
        {props.playlist.isCollaborative
          ? "This is a collaborative playlist."
          : "This playlist is not collaborative."}
      </Typography.Paragraph>
    </Card>
  );
};

export default PlaylistInfoSection;

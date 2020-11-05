import { Card, Icon, Progress, Tag, Typography, Badge, Rate } from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image, Label } from "semantic-ui-react";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import { getPlaylistProgress, fadeInImage } from "./ContentFeedViewUtil";
import {
  getFormattedNumVideos,
  getTimeSinceString,
  getPlaylistUrlLocation,
  getEditPlaylistUrlLocation,
} from "utilities";
import PlaylistIcon from "assets/icons/playlistIcon.svg";
import MinimalCardHeaderContainer from "./MinimalCardHeaderContainer.react";
import MinimalcardFooterContainer from "./MinimalCardFooterContainer.react";
import { Placeholder } from "semantic-ui-react";
import ThumbnailImage from "components/ThumbnailImage";

interface Playlist extends DataTypes.Playlist {
  dateCreated: any;
}

interface Props {
  history?: History;
  playlist: Playlist;
  viewlogs: Array<DataTypes.Viewlog>;
  directToCreatorsHubRoutes?: boolean;
  selectLogic?: boolean;
  selectPlaylist?: (playlistId: string) => void;
  hideCreatorAvatar?: boolean;
  showSignupModal: (redirectPath: string) => void;
  isPublic: boolean;
  minCardWidth?: number;
}

const PlaylistMinimalCard: React.FC<Props> = (props: Props) => {
  const containerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);
  const [selected, dispatch] = React.useState(false);
  const playlistLocation = props.directToCreatorsHubRoutes
    ? getEditPlaylistUrlLocation(props.playlist)
    : getPlaylistUrlLocation(props.playlist, props.viewlogs);
  const formattedNumVideos = getFormattedNumVideos(props.playlist);
  const progress = getPlaylistProgress(props.playlist, props.viewlogs);
  const showMobileView = useMediaQuery({ maxWidth: 749 });
  const timeSinceCreatedString = getTimeSinceString(
    props.playlist.dateCreated._seconds,
  );
  const creator = props.playlist.metadata && props.playlist.metadata.creator;
  const locked = props.isPublic && !props.playlist.isPubliclyPreviewable;
  const progressBar = progress > 0 && (
    <div className={s.videoMinimalProgressbar}>
      <Progress percent={progress} strokeWidth={8} showInfo={false} />
    </div>
  );
  const selectPlaylist = (playlistId: string) => {
    dispatch(!selected);
    props.selectPlaylist(playlistId);
  };

  const handleClick = () => {
    if (props.selectLogic) {
      selectPlaylist(props.playlist.objectID);
    } else if (locked) {
      props.showSignupModal(`/playlist/${props.playlist.objectID}`);
    } else {
      props.history.push(playlistLocation);
    }
  };
  return (
    <Badge
      offset={[-15, 15]}
      count={
        selected ? (
          <Icon
            type="check-circle"
            theme="filled"
            style={{ color: "#1890ff", fontSize: "22px" }}
          />
        ) : null
      }
    >
      <Card
        className={
          props.hideCreatorAvatar ? s.minimalCardWithoutCreator : s.minimalCard
        }
        onClick={handleClick}
        bordered={false}
        hoverable
        bodyStyle={{
          padding: "0",
          height: "100%",
        }}
        style={{ display: "inline-block", width: props.minCardWidth }}
      >
        <div className={s.minimalCardThumbnailContainer}>
          <div>
            {locked && (
              <div className={s.cardLockedOverlay}>
                <Icon className={s.cardLockedOverlayIcon} type="lock" />
                <Typography.Paragraph className={s.cardLockedOverlayText}>
                  Member-Only Content
                </Typography.Paragraph>
              </div>
            )}

            <ThumbnailImage src={props.playlist.thumbnailUrl} height="166px" />

            <div className={s.thumbnailTagContainer}>
              <Tag color={"black"} className={s.minimalThumbnailMetadataLabel}>
                {formattedNumVideos}
              </Tag>
            </div>

            {progressBar}
          </div>
        </div>

        <MinimalCardHeaderContainer
          content={props.playlist}
          creator={creator}
          hideCreatorAvatar={props.hideCreatorAvatar}
        />

        <MinimalcardFooterContainer
          content={props.playlist}
          timeSinceCreatedString={timeSinceCreatedString}
          icon={PlaylistIcon}
          contentType="Playlist"
        />
      </Card>
    </Badge>
  );
};

export default compose<Props, Props>(withRouter)(PlaylistMinimalCard);

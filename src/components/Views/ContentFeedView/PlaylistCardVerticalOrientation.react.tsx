import { Card, Icon, Progress, Tag, Typography, Rate, Row, Col } from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image } from "semantic-ui-react";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import { getPlaylistProgress } from "./ContentFeedViewUtil";

import Util, {
  getEditPlaylistUrlLocation,
  getPlaylistUrlLocation,
  getTimeSinceString,
  getFormattedNumVideos,
} from "utilities";
import CreatorAvatar from "components//CreatorAvatar";
import PlaylistIcon from "assets/icons/playlistIcon.svg";
import CardthumbnailContainer from "./CardThumbnailContainer.react";
import commonUtils from "utilities/common-utils";

interface Playlist extends DataTypes.Playlist {
  dateCreated: any;
}

interface Props {
  history?: History;
  playlist: Playlist;
  viewlogs: Array<DataTypes.Viewlog>;
  directToCreatorsHubRoutes?: boolean;
  hideCreatorAvatar?: boolean;
  showSignupModal: (redirectPath: string) => void;
  isPublic: boolean;
}

const PlaylistCardVerticalOrientation: React.FC<Props> = (props: Props) => {
  const playlistLocation = props.directToCreatorsHubRoutes
    ? getEditPlaylistUrlLocation(props.playlist)
    : getPlaylistUrlLocation(props.playlist, props.viewlogs);
  const numVideos = getFormattedNumVideos(props.playlist);
  const progress = getPlaylistProgress(props.playlist, props.viewlogs);
  const showMobileView = useMediaQuery({ maxWidth: 749 });
  const timeSinceCreatedString = getTimeSinceString(
    props.playlist.dateCreated._seconds,
  );
  const timeElapsedWords = React.useMemo(() => {
    return timeSinceCreatedString.split(" ");
  }, [timeSinceCreatedString]);

  const creator = props.playlist.metadata && props.playlist.metadata.creator;
  const locked = props.isPublic && !props.playlist.isPubliclyPreviewable;

  const progressBar = progress > 0 && (
    <div className={s.videoMinimalProgressbar}>
      <Progress percent={progress} showInfo={false} />
    </div>
  );

  const playlistRating = React.useMemo(() => {
    const avgRating =
      (props.playlist &&
        props.playlist.avgRating &&
        Number(props.playlist.avgRating.toFixed(2))) ||
      0;
    return avgRating ? (
      <div className={s.verticalCardRating}>
        <span className="ant-rate-text">{avgRating.toFixed(1)}</span>{" "}
        <Icon type="star" theme="filled" />
      </div>
    ) : (
        <div className={s.noRatingsText}>No Ratings Yet</div>
      );
  }, [props.playlist]);

  const handleClick = () => {
    if (locked) {
      props.showSignupModal(`/playlist/${props.playlist.objectID}`);
    } else {
      props.history.push(playlistLocation);
    }
  };

  return (
    <Card
      className={s.cardVerticalOrientation}
      onClick={handleClick}
      bordered={false}
      hoverable
      bodyStyle={{ padding: "10px" }}
    >
      <Row type="flex" className={s.cardVerticalOrientationRow}>
        <Col className={s.cardVerticalOrientationThumbnailColumn} span={7}>
          <div className={s.searchResultContentContainerVerticalOrientation}>
            {locked && (
              <div className={s.cardLockedOverlay}>
                <Icon className={s.cardLockedOverlayIcon} type="lock" />
                <Typography.Paragraph className={s.cardLockedOverlayText}>
                  Member-Only Content
                </Typography.Paragraph>
              </div>
            )}
            <CardthumbnailContainer
              content={props.playlist}
              numVideos={numVideos}
              tagIcon="video-camera"
              tagColor="#8856E9"
              contentType="Playlist"
            />
          </div>
        </Col>
        <Col offset={1} span={16}>
          <div
            className={`${s.searchResultContentContainerVerticalOrientation} ${s.searchResultsVerticalCardRightSideContent}`}
          >
            <div className={s.verticalCardAvatar}>
              {props.hideCreatorAvatar ? (
                <span />
              ) : (
                  <CreatorAvatar creator={creator} />
                )}
            </div>

            <div className={s.contentFeedViewCardTitleTextVerticalOrientation}>
              <div className={s.searchResultsText}>{props.playlist.title}</div>
            </div>

            <div className={s.cardDescriptionTextVerticalOrientation}>
              {commonUtils.truncateWithEllipses(props.playlist.description)}
            </div>

            <div className={s.verticalCardFooterContainer}>
              <div className={s.minimalCardContentTypeTag}>
                <img src={PlaylistIcon} />
                <span
                  style={{ color: "#8856E9" }}
                  className={s.minimalCardContentTypeTagLabel}
                >
                  Playlist
                </span>
              </div>

              <div className={s.verticalCardViewsDurationRatingContainer}>
                {/* Duration */}
                <>
                  <span className={s.verticalCardViewsCount}>
                    {`${timeElapsedWords[0]}${
                      timeElapsedWords[1].toLowerCase().substr(0, 2) === "mo"
                        ? timeElapsedWords[1].toLowerCase().substr(0, 2)
                        : timeElapsedWords[1].toLowerCase().charAt(0)
                      }`}
                  </span>
                  <span className={s.verticalCardViewsText}>Ago</span>
                </>

                <span className={s.verticalLine}>|</span>

                {playlistRating}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default compose<Props, Props>(withRouter)(
  PlaylistCardVerticalOrientation,
);

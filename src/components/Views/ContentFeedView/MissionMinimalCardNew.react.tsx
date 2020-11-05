import { Card, Icon, Tag, Typography, Badge } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image } from "semantic-ui-react";
import { History } from "history";
import { Link } from "react-router-dom";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import s from "./ContentFeedView.module.scss";
import {
  getEditMissionUrlLocation,
  getMissionUrlLocation,
  getTimeSinceString,
  getFormattedNumVideosInMission,
  getFormattedNumPlaylistsInMission,
} from "utilities";
import { Placeholder } from "semantic-ui-react";
import { fadeInImage } from "./ContentFeedViewUtil";
import CollectionCardIcon from "assets/icons/collectionCardIcon.svg";
import RightArrow from "assets/icons/rightArrow.svg";
import ThumbnailImage from "components/ThumbnailImage";
import commonUtils from "utilities/common-utils";

type Props = {
  history?: History;
  mission: DataTypes.Mission;
  directToCreatorsHubRoutes?: boolean;
  minCardWidth?: number;
};

const MissionMinimalCard = (props: Props) => {
  const missionLocation = props.directToCreatorsHubRoutes
    ? getEditMissionUrlLocation(props.mission)
    : getMissionUrlLocation(props.mission);

  return (
    <span>
      <Card
        className={`${s.minimalCard} ${s.minimalCardNew}`}
        onClick={() => props.history.push(missionLocation)}
        style={{ display: "inline-block", width: props.minCardWidth }}
        bordered={false}
        hoverable
        bodyStyle={{ padding: "0" }}
      >
        <ThumbnailImage src={props.mission.thumbnailUrl} height="166px" />

        <div className={s.minimalMissionDataContainer}>
          {/* Header */}
          <div className={s.missionHeader}>
            {props.mission.numVideos ? (
              <span className={s.missionHeaderCount}>
                <span>{props.mission.numVideos}</span>
                videos
              </span>
            ) : null}
            {props.mission.numVideos && props.mission.numPlaylists ? (
              <span className={s.verticalLine}>|</span>
            ) : null}
            {props.mission.numPlaylists ? (
              <span className={s.missionHeaderCount}>
                <span>{props.mission.numPlaylists}</span>
                playlists
              </span>
            ) : null}
          </div>

          <div className={s.contentFeedViewCardTitleText}>
            {props.mission.title}
          </div>

          <div className={s.contentFeedViewCardDescription}>
            {commonUtils.truncateWithEllipses(props.mission.purpose, 92)}
          </div>

          {/* Footer */}
          <div className={s.newMinimalMissionCardFooterContainer}>
            <Link to={""} className={s.learnMoreLinkNew}>
              Learn more <Image src={RightArrow}></Image>
            </Link>
          </div>
        </div>
      </Card>
    </span>
  );
};

export default compose<Props, Props>(withRouter)(MissionMinimalCard);

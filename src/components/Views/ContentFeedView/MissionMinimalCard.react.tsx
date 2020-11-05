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
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import ThumbnailImage from "components/ThumbnailImage";

type Props = {
  history?: History;
  mission: DataTypes.Mission;
  directToCreatorsHubRoutes?: boolean;
  minCardWidth?: number;
};

const MissionMinimalCard = (props: Props) => {
  const containerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);
  const missionLocation = props.directToCreatorsHubRoutes
    ? getEditMissionUrlLocation(props.mission)
    : getMissionUrlLocation(props.mission);
  const minCard = React.createRef();

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        color: "unset",
        lineHeight: 1,
      }}
    >
      <Card
        id="minCard"
        className={s.minimalCard}
        onClick={() => props.history.push(missionLocation)}
        style={{ display: "inline-block", width: props.minCardWidth }}
        bordered={false}
        hoverable
        bodyStyle={{
          padding: "0",
          height: "100%",
        }}
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

          <TypographyTitle
            type={TypographyTitleType.SECONDARY_TITLE}
            className={s.minimalCardTitle}
          >
            {props.mission.title}
          </TypographyTitle>

          {/* Footer */}
          <div className={s.minimalMissionCardFooterContainer}>
            <div className={s.minimalCardContentTypeTag}>
              <img src={CollectionCardIcon} />
              <span
                className={s.minimalCardContentTypeTagLabel}
                style={{ color: "#1890FF" }}
              >
                Collection
              </span>
            </div>

            <Link to={""} className={s.learnMoreLink}>
              Learn more <Image src={RightArrow}></Image>
            </Link>
          </div>
        </div>
      </Card>
    </span>
  );
};

export default compose<Props, Props>(withRouter)(MissionMinimalCard);

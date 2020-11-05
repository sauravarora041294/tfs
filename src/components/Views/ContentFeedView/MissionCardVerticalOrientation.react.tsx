import { Card, Icon, Tag, Typography, Row, Col } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image } from "semantic-ui-react";
import { History } from "history";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import s from "./ContentFeedView.module.scss";
import { getEditMissionUrlLocation, getMissionUrlLocation } from "utilities";
import { Link } from "react-router-dom";

import CardthumbnailContainer from "./CardThumbnailContainer.react";
import commonUtils from "utilities/common-utils";
import CollectionCardIcon from "assets/icons/collectionCardIcon.svg";
import RightArrow from "assets/icons/rightArrow.svg";

interface Mission extends DataTypes.Mission {
  dateCreated: any;
}
interface Props {
  mission: Mission;
  history?: History;
  directToCreatorsHubRoutes?: boolean;
}

const MissionCardVerticalOrientation = (props: Props) => {
  const missionLocation = props.directToCreatorsHubRoutes
    ? getEditMissionUrlLocation(props.mission)
    : getMissionUrlLocation(props.mission);

  return (
    <Card
      className={s.cardVerticalOrientation}
      onClick={() => props.history.push(missionLocation)}
      bordered={false}
      hoverable
      bodyStyle={{ padding: "10px" }}
    >
      <Row type="flex" className={s.cardVerticalOrientationRow}>
        <Col className={s.cardVerticalOrientationThumbnailColumn} span={7}>
          <div className={s.searchResultContentContainerVerticalOrientation}>
            <CardthumbnailContainer
              content={props.mission}
              tagIcon="rocket"
              tagColor="#29CB97"
              contentType="Collection"
            />
          </div>
        </Col>
        <Col offset={1} span={16}>
          <div
            className={`${s.searchResultContentContainerVerticalOrientation} ${s.searchResultsVerticalCardRightSideContent}`}
          >
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

            {/* Title */}
            <div className={s.contentFeedViewCardTitleTextVerticalOrientation}>
              <div className={s.searchResultsText}>{props.mission.title}</div>
            </div>

            {/* Description */}
            <div className={s.cardDescriptionTextVerticalOrientation}>
              {commonUtils.truncateWithEllipses(props.mission.purpose)}
            </div>

            {/* Footer */}
            <div className={s.verticalCardFooterContainer}>
              <div className={s.minimalCardContentTypeTag}>
                <img src={CollectionCardIcon} />
                <span
                  style={{ color: "#1990FF" }}
                  className={s.minimalCardContentTypeTagLabel}
                >
                  Collection
                </span>
              </div>

              <Link to={""} className={s.learnMoreLink}>
                Learn more <Image src={RightArrow}></Image>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default compose<Props, Props>(withRouter)(
  MissionCardVerticalOrientation,
);

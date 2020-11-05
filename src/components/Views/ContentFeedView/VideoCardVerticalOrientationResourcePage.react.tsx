import {
  Card,
  Icon,
  Progress,
  Tag,
  Typography,
  Rate,
  Row,
  Col,
  Badge,
} from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import {
  ContentFeedViewReducer,
  ContentFeedViewStateInit,
  ContentFeedViewStateActionTypes,
} from "./ContentFeedViewReducer";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image, Label } from "semantic-ui-react";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import { getResourceProgress } from "./ContentFeedViewUtil";
import {
  getFormattedQualityTag,
  getFormattedVideoLength,
  getTimeSinceString,
  getResourceUrlLocation,
  getEditResourceUrlLocation,
} from "utilities";
import CreatorAvatar from "components/CreatorAvatar";
import CardThumbnailContainer from "./CardThumbnailContainer.react";
import PlayIcon from "assets/icons/playIcon.svg";
import commonUtils from "utilities/common-utils";
import starIcon from "assets/icons/star-ratings.svg";
import { FirestoreRealtime } from "FirebaseClient";
import videoWatchedOverlayIcon from "assets/icons/videoWatchedOverlayIcon.svg";

interface Resource extends DataTypes.Resource {
  dateCreated?: any;
}

interface Props {
  currentUser?: DataTypes.User;
  history?: History;
  resource: Resource;
  viewlog: DataTypes.Viewlog;
  directToCreatorsHubRoutes?: boolean;
  hideCreatorAvatar?: boolean;
  showSignupModal?: (redirectPath: string) => void;
  isPublic: boolean;
  active: boolean;
  playlist?: DataTypes.Playlist;
}

const VideoCardVerticalOrientation: React.FC<Props> = (props: Props) => {
  const [videoCardState, dispatch] = React.useReducer(
    ContentFeedViewReducer,
    {
      resourceProgress: getResourceProgress(props.resource, props.viewlog),
    },
    ContentFeedViewStateInit,
  );

  const resourceLocation = props.directToCreatorsHubRoutes
    ? getEditResourceUrlLocation(props.resource)
    : props.playlist
    ? `/playlist/${props.playlist.objectID}` +
      getResourceUrlLocation(props.resource)
    : getResourceUrlLocation(props.resource);

  const formattedVideoLength = getFormattedVideoLength(props.resource);

  const timeSinceCreatedString = getTimeSinceString(
    props.resource.dateCreated._seconds,
  );
  const timeElapsedWords = React.useMemo(() => {
    return timeSinceCreatedString.split(" ");
  }, [timeSinceCreatedString]);

  const creator = props.resource.metadata && props.resource.metadata.creator;
  const locked = props.isPublic && !props.resource.isPubliclyPreviewable;

  const progressBar = videoCardState.resourceProgress &&
    videoCardState.resourceProgress > 0 && (
      <div className={s.videoMinimalProgressbar}>
        <Progress percent={videoCardState.resourceProgress} showInfo={false} />
      </div>
    );

  const avgRating =
    (props.resource &&
      props.resource.avgRating &&
      Number(props.resource.avgRating.toFixed(2))) ||
    0;
  const numRatings = (props.resource && props.resource.numRatings) || 0;

  const qualityTags = props.resource.qualityTags ? (
    <Row className={s.videoCardVerticalOrientationQualityTags}>
      {props.resource.qualityTags.map(q => (
        <Tag
          className={s.videoMinimalCardVerticalOrientationQualityTag}
          color="blue"
        >
          {getFormattedQualityTag(q)}
        </Tag>
      ))}
    </Row>
  ) : (
    ""
  );

  const handleClick = () => {
    if (locked) {
      props.showSignupModal(`/resource/${props.resource.objectID}`);
    } else {
      props.history.push(resourceLocation);
    }
  };

  const viewLogObserverCallback = (object: any) => {
    dispatch({
      type: ContentFeedViewStateActionTypes.SET_RESOURCE_PROGRESS,
      resourceProgress: getResourceProgress(props.resource, object[0]),
    });
  };

  React.useEffect(() => {
    if (props.resource && props.currentUser) {
      const viewlogObserver = FirestoreRealtime.listenToMultipleDocuments({
        query: FirestoreRealtime.collections.VIEWLOGS.where(
          "resourceId",
          "==",
          props.resource.objectID,
        )
          .where("userId", "==", props.currentUser.objectID)
          .orderBy("dateCreated", "desc"),
        callback: viewLogObserverCallback,
      });
      return () => viewlogObserver && viewlogObserver();
    }
  }, [props.resource]);

  return (
    <Card
      className={`${s.cardVerticalOrientation} ${
        s.resourceCardVerticalOrientation
      } ${props.active ? s.activeResourceCard : ""}`}
      onClick={handleClick}
      bordered={false}
      hoverable
      bodyStyle={{ padding: "12px 0" }}
    >
      <Row
        type="flex"
        className={`${s.resourcePageVerticalOrientationRow} ${s.cardVerticalOrientationRow}`}
      >
        <Col
          className={s.cardVerticalOrientationThumbnailColumn}
          span={9}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className={`${s.searchResultContentContainerVerticalOrientation} ${s.verticalResourcePageItemContainer}`}
          >
            {locked && (
              <div className={s.cardLockedOverlay}>
                <Icon className={s.cardLockedOverlayIcon} type="lock" />
                <Typography.Paragraph className={s.cardLockedOverlayText}>
                  Member-Only Content
                </Typography.Paragraph>
              </div>
            )}
            {videoCardState.resourceProgress === 100 && (
              <div className={s.cardLockedOverlay}>
                <img
                  src={videoWatchedOverlayIcon}
                  className={s.videoWatchedOverlayIcon}
                />
              </div>
            )}
            <CardThumbnailContainer
              content={props.resource}
              viewlog={props.viewlog}
              contentLength={formattedVideoLength}
              tagIcon="video-camera"
              tagColor="#FB255D"
              contentType="formattedVideoLength"
              minimal={true}
            />
          </div>
        </Col>
        <Col offset={1} span={14}>
          <div
            className={`${s.searchResultContentContainerVerticalOrientation} ${s.verticalResourcePageItemContainer}`}
          >
            <div>
              <div className={s.verticalCardAvatar}>
                {props.hideCreatorAvatar ? (
                  <span />
                ) : (
                  <CreatorAvatar creator={creator} />
                )}
              </div>

              <div
                className={s.contentFeedViewCardTitleTextVerticalOrientation}
              >
                <div className={s.searchResultsText}>
                  {props.resource.title}
                </div>
              </div>

              <div className={s.cardDescriptionTextVerticalOrientation}>
                {commonUtils.truncateWithEllipses(
                  props.resource.description,
                  128,
                )}
              </div>
            </div>

            <div className={s.verticalCardFooterContainer}>
              <div className={s.verticalCardViewsDurationRatingContainer}>
                {/* Views */}
                <>
                  <span className={s.verticalCardViewsCount}>
                    {`${props.resource.totalViews || 0}`}
                  </span>
                  <span className={s.verticalCardViewsText}>
                    View{props.resource.totalViews !== 1 ? "s" : ""}
                  </span>
                </>

                <span className={s.verticalLine}>|</span>

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

                {/* Rating */}
                {avgRating ? (
                  <div className={s.verticalCardRating}>
                    <span className="ant-rate-text">
                      {avgRating.toFixed(1)}
                    </span>
                    <img src={starIcon} />
                  </div>
                ) : (
                  <span className={s.noRatingsText}>N/A</span>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default compose<Props, Props>(withRouter)(VideoCardVerticalOrientation);

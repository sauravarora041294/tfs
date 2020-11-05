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
import React from "react";
import { ContentFeedViewReducer } from "./ContentFeedViewReducer";
import { useMediaQuery } from "react-responsive";
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
import CardthumbnailContainer from "./CardThumbnailContainer.react";
import PlayIcon from "assets/icons/playIcon.svg";
import commonUtils from "utilities/common-utils";
import starIcon from "assets/icons/star-ratings.svg";

interface Resource extends DataTypes.Resource {
  dateCreated?: any;
}

interface Props {
  history?: History;
  resource: Resource;
  viewlog: DataTypes.Viewlog;
  directToCreatorsHubRoutes?: boolean;
  hideCreatorAvatar?: boolean;
  showSignupModal?: (redirectPath: string) => void;
  isPublic: boolean;
}

const VideoCardVerticalOrientation: React.FC<Props> = (props: Props) => {
  const resourceLocation = props.directToCreatorsHubRoutes
    ? getEditResourceUrlLocation(props.resource)
    : getResourceUrlLocation(props.resource);

  const formattedVideoLength = getFormattedVideoLength(props.resource);

  const progress =
    props.viewlog && getResourceProgress(props.resource, props.viewlog);

  const showMobileView = useMediaQuery({ maxWidth: 749 });

  const timeSinceCreatedString = getTimeSinceString(
    props.resource.dateCreated._seconds,
  );

  const timeElapsedWords = React.useMemo(() => {
    return timeSinceCreatedString.split(" ");
  }, [timeSinceCreatedString]);

  const creator = props.resource.metadata && props.resource.metadata.creator;
  const locked = props.isPublic && !props.resource.isPubliclyPreviewable;

  const progressBar = progress && progress > 0 && (
    <div className={s.videoMinimalProgressbar}>
      <Progress percent={progress} showInfo={false} />
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
          <div className={s.cardVerticalOrientationThumbnailColumn}>
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
                content={props.resource}
                viewlog={props.viewlog}
                contentLength={formattedVideoLength}
                tagIcon="video-camera"
                tagColor="#FB255D"
                contentType="formattedVideoLength"
              />
            </div>
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
              <div className={s.searchResultsText}>{props.resource.title}</div>
            </div>

            <div className={s.cardDescriptionTextVerticalOrientation}>
              {commonUtils.truncateWithEllipses(props.resource.description)}
            </div>

            <div className={s.verticalCardFooterContainer}>
              <div className={s.minimalCardContentTypeTag}>
                <img src={PlayIcon} />
                <span
                  className={s.minimalCardContentTypeTagLabel}
                  style={{ color: "#FB255D" }}
                >
                  Video
                </span>
              </div>

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
                  <span className={s.noRatingsText}>No Ratings Yet</span>
                )}
              </div>
            </div>
            {/* TODO: Add quality tags again */}
            {/* {qualityTags && (
                            <div className={s.verticalCardqualityTagsContainer}>{qualityTags}</div>
                        )} */}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default compose<Props, Props>(withRouter)(VideoCardVerticalOrientation);

import { Card, Icon, Progress, Tag, Typography, Badge, Row, Rate } from "antd";
import { Placeholder } from "semantic-ui-react";

import * as DataTypes from "data/types";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image, Label } from "semantic-ui-react";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import { getResourceProgress, fadeInImage } from "./ContentFeedViewUtil";
import {
  getFormattedQualityTag,
  getFormattedVideoLength,
  getTimeSinceString,
  getResourceUrlLocation,
  getEditResourceUrlLocation,
  truncateTitle,
} from "utilities";
import MinimalCardHeaderContainer from "./MinimalCardHeaderContainer.react";
import MinimalcardFooterContainer from "./MinimalCardFooterContainer.react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PlayIcon from "assets/icons/playIcon.svg";
import ThumbnailImage from "components/ThumbnailImage";

interface Resource extends DataTypes.Resource {
  dateCreated: any;
}

interface Props {
  history?: History;
  resource: Resource;
  viewlog: DataTypes.Viewlog;
  directToCreatorsHubRoutes?: boolean;
  selectLogic?: boolean;
  selectResource?: (resourceId: string) => void;
  resourcesSelected?: Array<string>;
  hideCreatorAvatar?: boolean;
  showSignupModal: (redirectPath: string) => void;
  isPublic: boolean;
  minCardWidth?: number;
}

const VideoMinimalCard: React.FC<Props> = (props: Props) => {
  const [selected, dispatch] = React.useState(false);

  const containerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);

  const resourceLocation = props.directToCreatorsHubRoutes
    ? getEditResourceUrlLocation(props.resource)
    : getResourceUrlLocation(props.resource);
  const formattedVideoLength = getFormattedVideoLength(props.resource);
  const progress = props.viewlog
    ? getResourceProgress(props.resource, props.viewlog)
    : 0;

  const showMobileView = useMediaQuery({ maxWidth: 749 });
  const timeSinceCreatedString = getTimeSinceString(
    props.resource.dateCreated._seconds,
  );

  const creator = props.resource.metadata && props.resource.metadata.creator;
  const locked = props.isPublic && !props.resource.isPubliclyPreviewable;

  const progressBar = progress > 0 && (
    <div className={s.videoMinimalProgressbar}>
      <Progress percent={progress} strokeWidth={8} showInfo={false} />
    </div>
  );

  const selectResource = (resourceId: string) => {
    dispatch(!selected);
    props.selectResource(resourceId);
  };

  const handleClick = () => {
    if (props.selectLogic) {
      selectResource(props.resource.objectID);
    } else if (locked) {
      props.showSignupModal(`/resource/${props.resource.objectID}`);
    } else {
      props.history.push(resourceLocation);
    }
  };

  const qualityTags = (
    <div className={s.videoMinimalCardQualityTags}>
      {props.resource.qualityTags &&
        props.resource.qualityTags.map(q => (
          <div className={s.videoMinimalCardQualityTag} color="blue">
            {getFormattedQualityTag(q)}
          </div>
        ))}
    </div>
  );
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
        style={{ width: props.minCardWidth }}
      >
        <div className={s.minimalCardThumbnailContainer}>
          {locked && (
            <div className={s.cardLockedOverlay}>
              <Icon className={s.cardLockedOverlayIcon} type="lock" />
              <Typography.Paragraph className={s.cardLockedOverlayText}>
                Member-Only Content
              </Typography.Paragraph>
            </div>
          )}
          <ThumbnailImage src={props.resource.thumbnailUrl} height="166px" />
          <Tag className={s.thumbnailTagContainer}>
            <Tag color={"black"} className={s.minimalThumbnailMetadataLabel}>
              {formattedVideoLength}
            </Tag>
          </Tag>
          {progressBar}
        </div>
        {/* </div> */}
        {creator && (
          <MinimalCardHeaderContainer
            content={props.resource}
            creator={creator}
            hideCreatorAvatar={props.hideCreatorAvatar}
          />
        )}

        <MinimalcardFooterContainer
          content={props.resource}
          contentType="Video"
          icon={PlayIcon}
          timeSinceCreatedString={timeSinceCreatedString}
        />
      </Card>
    </Badge>
  );
};

export default compose<Props, Props>(withRouter)(VideoMinimalCard);

import { Card, Icon, Tag, Typography, Row, Col, Progress } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Image } from "semantic-ui-react";
import { History } from "history";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import s from "./ContentFeedView.module.scss";

import { getResourceProgress } from "./ContentFeedViewUtil";
import ThumbnailImage from "components/ThumbnailImage";

interface Props {
  history?: History;
  content: DataTypes.Playlist | DataTypes.Resource | DataTypes.Mission;
  contentLength?: string;
  numVideos?: string;
  viewlog?: DataTypes.Viewlog;
  tagIcon: string;
  tagColor: string;
  contentType: string;
  minimal?: boolean;
}

const CardThumbnailContainer = (props: Props) => {
  const progress =
    props.viewlog && getResourceProgress(props.content, props.viewlog);

  const progressBar =
    progress && progress > 0 ? (
      <div className={s.videoMinimalProgressbar}>
        <Progress percent={progress} showInfo={false} />
      </div>
    ) : (
      undefined
    );

  return (
    <React.Fragment>
      <div
        className={`${s.thumbnailContainer} thumbnail-border-radius`}
        style={{ width: "100%" }}
      >
        {/* Image */}
        <ThumbnailImage
          src={props.content.thumbnailUrl}
          className={s.thumbnailImageVerticalOrientation}
          minimal={props.minimal}
        />

        {/* Tags */}
        {(props.contentLength || props.contentLength) && (
          <div className={s.thumbnailTagContainer}>
            <Tag color={"black"} className={s.minimalThumbnailMetadataLabel}>
              {props.contentLength ? props.contentLength : props.numVideos}
            </Tag>
          </div>
        )}

        {/* Progress bar for video */}
        {progressBar}
      </div>
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(CardThumbnailContainer);

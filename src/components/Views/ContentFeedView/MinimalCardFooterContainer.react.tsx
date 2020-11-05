import { Card, Icon, Progress, Tag, Typography, Badge, Rate } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import starIcon from "assets/icons/star-ratings.svg";
import TypographyMetaData, {
  TypographyMetaDataType,
} from "components/AaspireBasicComponents/Typography/TypographyMetaData";
import { FontSize, FontColor } from "data/styleTypes";

interface Props {
  history?: History;
  content: DataTypes.Playlist | DataTypes.Resource;
  timeSinceCreatedString: string;
  icon: any;
  contentType: string;
}

const MinimalCardFooterContainer: React.FC<Props> = (props: Props) => {
  const timeElapsedWords = React.useMemo(() => {
    return props.timeSinceCreatedString.split(" ");
  }, [props.timeSinceCreatedString]);
  const contentRating = React.useMemo(() => {
    const avgRating =
      (props.content &&
        props.content.avgRating &&
        Number(props.content.avgRating.toFixed(2))) ||
      0;
    {
      return avgRating ? (
        <div className={s.verticalCardRating}>
          <TypographyMetaData
            type={TypographyMetaDataType.METADATA_VALUE}
            className="ant-rate-text"
            fontSize={FontSize.SMALL}
          >
            {avgRating.toFixed(1)}
          </TypographyMetaData>
          <span className={s.verticalCardRatingStarContainer}>
            <img src={starIcon} />
          </span>
        </div>
      ) : (
        <TypographyMetaData
          type={TypographyMetaDataType.METADATA_VALUE}
          className={s.noRatingsText}
          fontSize={FontSize.SMALL}
          color={FontColor.GREY}
        >
          N/A
        </TypographyMetaData>
      );
    }
  }, [props.content]);

  return (
    <div style={{ position: "absolute", width: "100%", bottom: "10px" }}>
      <div className={s.horizontalLine}></div>
      <div className={s.minimalCardFooterContainer}>
        <div className={s.minimalCardContentTypeTag}>
          <img src={props.icon} />
          <span
            className={s.minimalCardContentTypeTagLabel}
            style={
              props.contentType.toLowerCase() === "playlist"
                ? { color: "#6D30E5" }
                : { color: "#FF4273" }
            }
          >
            {props.contentType}
          </span>
        </div>

        <div className={s.verticalCardViewsDurationRatingContainer}>
          {/* Views */}
          <div className={s.cardViewsAndDurationContainer}>
            <TypographyMetaData
              type={TypographyMetaDataType.METADATA_VALUE}
              className={s.cardViewsCount}
              fontSize={FontSize.SMALL}
            >{`${props.content.totalViews || 0}`}</TypographyMetaData>
            <TypographyMetaData
              type={TypographyMetaDataType.METADATA_VALUE}
              className={s.cardViewsText}
              fontSize={FontSize.SMALL}
              color={FontColor.GREY}
            >
              View{props.content.totalViews !== 1 ? "s" : ""}
            </TypographyMetaData>
          </div>

          <div className={s.verticalLine}>|</div>

          {/* Duration */}
          {props.timeSinceCreatedString && (
            <>
              <div className={s.cardViewsAndDurationContainer}>
                <TypographyMetaData
                  type={TypographyMetaDataType.METADATA_VALUE}
                  className={s.cardViewsCount}
                  fontSize={FontSize.SMALL}
                >
                  {`${timeElapsedWords[0]}${
                    timeElapsedWords[1].toLowerCase().substr(0, 2) === "mo"
                      ? timeElapsedWords[1].toLowerCase().substr(0, 2)
                      : timeElapsedWords[1].toLowerCase().charAt(0)
                  }
                                    `}
                </TypographyMetaData>
                <TypographyMetaData
                  type={TypographyMetaDataType.METADATA_VALUE}
                  className={s.cardViewsText}
                  fontSize={FontSize.SMALL}
                  color={FontColor.GREY}
                >
                  Ago
                </TypographyMetaData>
              </div>
              <div className={s.verticalLine}>|</div>
            </>
          )}
          {/* Rating */}
          {contentRating}
        </div>
      </div>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(MinimalCardFooterContainer);

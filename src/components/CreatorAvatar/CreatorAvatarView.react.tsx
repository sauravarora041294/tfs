import React from "react";
import * as DataTypes from "data/types";
import { Badge, Skeleton } from "antd";
import s from "./CreatorAvatar.module.scss";
import CreatorProfilePopover from "components/CreatorProfilePopover";
import { Image, Placeholder } from "semantic-ui-react";
import checkMarkIcon from "assets/icons/checkmark-green.svg";
import ThumbnailImage from "components/ThumbnailImage";

import { fadeInImage } from "./CreatorAvatarUtil";

import TypographyMetaData, {
  TypographyMetaDataType,
} from "components/AaspireBasicComponents/Typography/TypographyMetaData";
import { FontSize } from "data/styleTypes";

interface Props {
  creator?: DataTypes.Creator;
  large?: Boolean;
  vertical?: Boolean;
  hideDetails?: Boolean;
  textClassName?: string;
  showCreatorDescription?: boolean;
}

const CreatorAvatarView: React.FC<Props> = (props: Props) => {
  const { creator } = props;
  const containerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);

  const avatarStyle = props.large
    ? {
        width: 50,
        height: 50,
      }
    : { width: 33, height: 33 };

  const creatorNameAndTitle = React.useMemo(() => {
    return props.showCreatorDescription
      ? props.creator && (
          <div
            className={`${s.creatorDetailsContainer} creatorDetailsContainer`}
          >
            <TypographyMetaData
              fontSize={props.large ? FontSize.MEDIUM : FontSize.SMALL}
              className={s.creatorName}
              type={TypographyMetaDataType.METADATA_VALUE}
            >
              {`${creator.firstName} ${creator.lastName}`}
            </TypographyMetaData>
            {props.showCreatorDescription && (
              <div
                style={props.large ? { fontSize: "14px" } : {}}
                className={s.creatorDescription}
              >
                {creator && creator.creatorDetails
                  ? ` ${creator.creatorDetails.title} @ ${creator.creatorDetails.company}`
                  : ""}
              </div>
            )}
          </div>
        )
      : props.creator && (
          <div
            className={`${s.creatorDetailsContainer} creatorDetailsContainer`}
          >
            <TypographyMetaData
              fontSize={props.large ? FontSize.MEDIUM : FontSize.SMALL}
              className={s.creatorName}
              type={TypographyMetaDataType.METADATA_VALUE}
            >
              {`${creator.firstName} ${creator.lastName}`}
            </TypographyMetaData>
          </div>
        );
  }, [props.creator, props.showCreatorDescription]);
  const placeholderRefAvatar = React.useRef(null);
  const containerRefAvatar = React.useRef(null);

  const avatar = React.useMemo(() => {
    return (
      <Badge
        offset={props.large ? [-13, 8] : [-15, 3]}
        count={
          creator && creator.creatorStatus === "APPROVED" ? (
            <img
              src={checkMarkIcon}
              style={props.large ? { height: "15px" } : {}}
              className="badgeIcon"
            />
          ) : null
        }
      >
        {props.creator ? (
          <div className={`${s.creatorImage} creatorImage`} ref={containerRef}>
            <div
              style={{
                ...avatarStyle,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <ThumbnailImage src={creator.profilePictureURL} />
            </div>
          </div>
        ) : (
          <div ref={placeholderRef} className={s.creatorImage}>
            <Placeholder
              style={{
                height: "27px",
                width: "27px",
                borderRadius: "50%",
              }}
            >
              <Placeholder.Header image style={{ height: "100%" }} />
            </Placeholder>
          </div>
        )}
      </Badge>
    );
  }, [props.creator, placeholderRef, containerRef]);

  const creatorAvatar = React.useMemo(() => {
    return props.creator ? (
      <React.Fragment>
        <CreatorProfilePopover creator={props.creator}>
          <div
            className={`${
              props.vertical
                ? s.creatorAvatarContainerVertical
                : s.creatorAvatarContainer
            } creatorAvatarView`}
          >
            {avatar}
            {props.hideDetails ? (
              <span />
            ) : (
              <div
                style={props.large ? { fontSize: "16px" } : {}}
                className={`${
                  props.large ? s.creatorDetailsLarge : s.creatorDetails
                } ${props.textClassName || ""} creatorDetails`}
              >
                {creatorNameAndTitle}
              </div>
            )}
          </div>
        </CreatorProfilePopover>
      </React.Fragment>
    ) : null;
  }, [
    props.creator,
    avatar,
    props.hideDetails,
    creatorNameAndTitle,
    props.textClassName,
    props.large,
    props.vertical,
    placeholderRef,
    containerRef,
  ]);

  return <React.Fragment>{creatorAvatar}</React.Fragment>;
};
export default CreatorAvatarView;

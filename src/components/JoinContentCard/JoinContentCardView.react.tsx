import React from "react";
import { History } from "history";
import * as DataTypes from "data/types";
import { Button, Tag, Icon, Rate, Typography } from "antd";
import logo from "assets/images/sampleCode.svg";
import * as LinesEllipsis from "react-lines-ellipsis";
import { getTimeSinceString } from "utilities";
import s from "./JoinContentCard.module.scss";
import { joinContentCardReducer, joinContentCardStateInit } from "./JoinContentCardReducer.react"
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import starIcon from "assets/icons/star-ratings.svg";

interface Props {
  history?: History;
  mission?: DataTypes.Mission;
  playlist?: DataTypes.Playlist;
  pendingMissionContributorRequests?: Array<any>;
  isPendingPlaylistRequest?: boolean;
  joinRequestInit?: (contentId: String, contentType: String) => void;
}

const JoinContentCardView: React.FC<Props> = (props: Props) => {
  const [joinContentCardState, dispatch] = React.useReducer(
    joinContentCardReducer,
    {},
    joinContentCardStateInit,
  );
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

  const content = React.useMemo(() => {
    return props.playlist || props.mission;
  }, [props.mission, props.playlist]);

  const contentTypeTag = React.useMemo(() => {
    return props.mission ? (
      <Tag color={"#29CB97"} className={s.joinContentCardContentTypeTag}>
        <Icon type={"rocket"} className={s.joinContentCardContentTypeTagIcon} />
        {"Collection"}
      </Tag>
    ) : (
        <Tag color={"#7780E8"} className={s.joinContentCardContentTypeTag}>
          <Icon
            type={"video-camera"}
            className={s.joinContentCardContentTypeTagIcon}
          />
          {"Playlist"}
        </Tag>
      );
  }, [props.mission, props.playlist]);

  const contentRating = React.useMemo(() => {
    const avgRating =
      (props.playlist && props.playlist.avgRating && Number(props.playlist.avgRating.toFixed(2))) || 0;

    return avgRating ? (
      <span className={s.joinContentCardCountText}>
        {avgRating.toFixed(1)}
        <img className={s.joinContentCardPlaylistRatingStarImg} src={starIcon} />
      </span>
    ) : (
        <span className={s.joinContentCardNumDescText}>n/a</span>
      );

  }, [props.playlist]);

  const contentStats = React.useMemo(() => {
    if (props.mission) {
      const timeElapsedWords = getTimeSinceString(props.mission.dateCreated._seconds).split(" ")
      return (
        <div>
          <span className={s.joinContentCardCountText}>
            {props.mission.numVideos || 0}{" "}
          </span>
          <span className={s.joinContentCardNumDescText}>{" videos"}</span>
          <span className={s.joinContentCardDivider}>
            |
          </span>
          <span className={s.joinContentCardCountText}>
            {props.mission.numPlaylists || 0}{" "}
          </span>
          <span className={s.joinContentCardNumDescText}>{" playlists"}</span>
          <span className={s.joinContentCardDivider}>
            |
          </span>
          <span className={s.joinContentCardCountText}>
            {
              `${timeElapsedWords[0]}${
              timeElapsedWords[1].toLowerCase().substr(0, 2) === "mo"
                ? timeElapsedWords[1].toLowerCase().substr(0, 2)
                : timeElapsedWords[1].toLowerCase().charAt(0)
              }`
            }
          </span>
          <span className={s.joinContentCardNumDescText}>{" ago"}</span>
        </div>
      );
    } else {
      const sectionCount = props.playlist.sections
        ? props.playlist.sections.length
        : 0;
      const resourceCount = props.playlist.sections
        ? props.playlist.sections
          .map(section => section.resources)
          .reduce(
            (resourceList, resourcesBySection) =>
              resourceList.concat(resourcesBySection),
            [],
          ).length
        : 0;
      return (
        <div>
          <span className={s.joinContentCardCountText}>{sectionCount} </span>
          <span className={s.joinContentCardNumDescText}>{"sections"}</span>
          <span className={s.joinContentCardDivider}>
            |
          </span>
          <span className={s.joinContentCardCountText}>{resourceCount} </span>
          <span className={s.joinContentCardNumDescText}>{"videos"}</span>
          <span className={s.joinContentCardDivider}>
            |
          </span>
          {contentRating}
        </div>
      );
    }
  }, [props.playlist, props.mission, contentRating]);

  const btnJoin = React.useMemo(() => {
    return props.mission ? (
      <Button
        type={"default"}
        className={s.joinContentCardButton}
        disabled={props.pendingMissionContributorRequests.find(
          r => r.missionId === content.objectID,
        )}
        onClick={e => props.joinRequestInit(content.objectID, "mission")}
      >
        {props.pendingMissionContributorRequests.find(
          r => r.missionId === content.objectID,
        )
          ? "Pending Approval"
          : "Request to Join"}
      </Button>
    ) : (
        <Button
          type={"default"}
          className={s.joinContentCardButton}
          disabled={props.isPendingPlaylistRequest}
          onClick={e =>
            props.joinRequestInit(props.playlist.objectID, "playlist")
          }
        >
          {props.isPendingPlaylistRequest ? "Pending Approvla" : "Request to Join"}
        </Button>
      );
  }, [props.playlist, props.mission, props.pendingMissionContributorRequests]);

  const contentDescription = React.useMemo(() => {
    return <ResponsiveEllipsis
      className={s.joinContentCardDescriptionWrapper}
      isClamped={true}
      text={props.mission ? (props.mission.description || props.mission.purpose) : props.playlist.description}
      maxLine="3"
      ellipsis="..."
      trimRight
      basedOn="letters"
    />
  }, [props.mission, props.playlist])

  return (
    <div className={s.joinContentCard}>
      <div className={s.joinContentCardWrapper}>
        <div className={s.joinContentCardThumbnailContainer}>
          {contentTypeTag}
          <img
            className={s.joinContentCardThumbnailImage}
            src={content.thumbnailUrl || logo}
          />
        </div>
        <div
          className={s.joinContentCardDetailsContainer}
          onClick={e =>
            props.history.push(
              `/${props.mission ? "editcollection" : "editplaylist"}/${
              content.objectID
              }`,
            )
          }
        >
          {content.title}
          {contentDescription}
          <div className={s.joinContentCardFooter}>
            <div className={s.joinContentStatsContainer}>{contentStats}</div>
            {btnJoin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinContentCardView;

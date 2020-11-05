import { Card, Typography } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Image } from "semantic-ui-react";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import s from "./ContentFeedView.module.scss";
import CreatorProfilePopover from "components/CreatorProfilePopover";

import {
  getFormattedCreatorTitleInformation,
  getTimeSinceString,
  getFormattedNumVideosFromCreator,
  getFormattedNumPlaylistsFromCreator,
} from "utilities";
import WhiteCard from "components/WhiteCard";

interface Props {
  creator: DataTypes.Creator;
  directToCreatorsHubRoutes?: boolean;
}

const CreatorCardVerticalOrientation = (props: Props) => {
  const formattedNumVideos = getFormattedNumVideosFromCreator(props.creator);
  const formattedNumPlaylists = getFormattedNumPlaylistsFromCreator(
    props.creator,
  );
  const formattedTitle = getFormattedCreatorTitleInformation(props.creator);
  const timeSinceCreatedString = getTimeSinceString(
    props.creator.dateCreated._seconds,
  );

  const cardContent = (
    <div
      className={s.creatorsCardVerticalOrientation}
    >
      <Image
        className={s.creatorsCardProfilePictureImage}
        src={props.creator.profilePictureURL || logo}
        onError={i => (i.target.src = logo)}
        circular
      />
      <div className={s.creatorsCardVerticalOrientationCreatorDetailsContianer}>
        <div className={s.videoMinimalCardTitleTextVerticalOrientation}>
          <CreatorProfilePopover creator={props.creator}>
            <Typography.Paragraph className={s.creatorsName}>
              {`${props.creator.firstName} ${props.creator.lastName}`}
            </Typography.Paragraph>
          </CreatorProfilePopover>
        </div>
        <div className={s.creatorCardCreatorTitle}>{formattedTitle}</div>
        <div>
          <Typography.Text className={s.contentCardMiscDataContainer}>
            {formattedNumPlaylists.split(" ")[0]}
            <span>
              {"  "}
              PLAYLIST
              {`${Number(formattedNumPlaylists.split(" ")[0]) > 1 ? "S" : ""}`}
            </span>
          </Typography.Text>
          <span className={s.creatorCardSeparator}>|</span>

          <Typography.Text className={s.contentCardMiscDataContainer}>
            {formattedNumVideos.split(" ")[0]}
            <span>
              {"  "}
              VIDEO
              {`${Number(formattedNumVideos.split(" ")[0]) > 1 ? "S" : ""}`}
            </span>
          </Typography.Text>
          <span className={s.creatorCardSeparator}>|</span>
          <Typography.Text className={s.contentCardMiscDataContainer}>
            <span>{`JOINED ${timeSinceCreatedString}`}</span>
          </Typography.Text>
        </div>
      </div>
    </div>
  );

  return (
    <WhiteCard
      title=""
      subTitle=""
      children={cardContent}
      className={s.creatorMinimalCardVerticalOrientation}
    ></WhiteCard>
  );
};

export default compose<Props, Props>(withRouter)(
  CreatorCardVerticalOrientation,
);

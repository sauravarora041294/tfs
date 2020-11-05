import * as DataTypes from "data/types";
import React, { useState, useRef } from "react";
import { Card, Divider } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";
import ResourceDetailPlaylistCardSection from "./ResourceDetailPlaylistCardSection.react";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";
import { MarginType } from "data/styleTypes";
import WhiteCard from "components/WhiteCard";
import ClippedText from "components/ClippedText/index.react";

interface Props {
  currentUser: DataTypes.User;
  currentResource: DataTypes.Resource;
  playlistResources: Array<DataTypes.Resource>;
  playlist: DataTypes.Playlist;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  selectResource: (resource: string) => void;
  openSignupModal: () => void;
  isPublic: boolean;
  setPlaylistCardSectionTextWidth: (width: number) => void;
  playlistCardSectionTextWidth: number;
}

const ResourceDetailPlaylistCard: React.FC<Props> = (props: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const playlistDescriptionRef = useRef(null);

  const playlistSections = React.useMemo(
    () =>
      props.playlist.sections.map((section, index) => (
        <ResourceDetailPlaylistCardSection
          currentUser={props.currentUser}
          key={index}
          section={section}
          index={index}
          currentResource={props.currentResource}
          userLatestViewlogs={props.userLatestViewlogs}
          playlistResources={props.playlistResources}
          selectResource={props.selectResource}
          openSignupModal={props.openSignupModal}
          isPublic={props.isPublic}
          playlist={props.playlist}
          setPlaylistCardSectionTextWidth={
            props.setPlaylistCardSectionTextWidth
          }
          playlistCardSectionTextWidth={props.playlistCardSectionTextWidth}
        />
      )),
    [
      props.playlist,
      props.currentResource,
      props.userLatestViewlogs,
      props.playlistResources,
      props.selectResource,
      props.playlistCardSectionTextWidth,
      props.setPlaylistCardSectionTextWidth,
    ],
  );

  React.useEffect(() => {
    props.setPlaylistCardSectionTextWidth(1);
    setTimeout(() => {
      props.setPlaylistCardSectionTextWidth(0);
    }, 1);
  }, []);

  const playlistTitle = React.useMemo(() => props.playlist.title, [
    props.playlist,
  ]);

  const playlistDescription = React.useMemo(() => props.playlist.description, [
    props.playlist,
  ]);

  const playlistDescriptionHeight =
    playlistDescriptionRef.current &&
    playlistDescriptionRef.current.clientHeight;

  const showMoreButton = React.useMemo(
    () =>
      playlistDescriptionHeight >= 60 &&
      !showFullDescription && (
        <div
          className={s.resourcesDetailPlaylistCardDescriptionButton}
          onClick={() => setShowFullDescription(true)}
        >
          Show more
        </div>
      ),
    [showFullDescription, playlistDescriptionHeight],
  );

  const showLessButton = React.useMemo(
    () =>
      showFullDescription && (
        <div
          className={s.resourcesDetailPlaylistCardDescriptionButton}
          onClick={() => setShowFullDescription(false)}
        >
          Show less
        </div>
      ),
    [showFullDescription],
  );
  return (
    <WhiteCard
      className={s.resourcesDetailPlaylistCard}
      withDefaultBodyPadding={false}
    >
      <div className={s.resourcesDetailPlaylistCardHeaderContent}>
        <div className={s.resourcesDetailPlaylistCardSubHeader}>
          {"Playlist"}
        </div>
        <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
          <span>{playlistTitle}</span>
        </TypographyTitle>
        <ClippedText
          width={props.playlistCardSectionTextWidth}
          text={playlistDescription}
          maxLines={2}
        />
      </div>
      <div className="horizontalLine"></div>
      <div className={s.resourcesDetailPlaylistContent}>{playlistSections}</div>
    </WhiteCard>
  );
};

export default ResourceDetailPlaylistCard;

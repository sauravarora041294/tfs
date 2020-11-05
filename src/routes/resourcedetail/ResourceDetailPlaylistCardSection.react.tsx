import * as DataTypes from "data/types";
import React from "react";
import s from "./ResourceDetail.module.scss";
import VideoCardVerticalOrientationResourcePage from "components/Views/ContentFeedView/VideoCardVerticalOrientationResourcePage.react";
import ClippedText from "components/ClippedText/index.react";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";

interface Props {
  currentUser: DataTypes.User;
  section: DataTypes.Section;
  index: number;
  currentResource: DataTypes.Resource;
  playlistResources: Array<DataTypes.Resource>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  selectResource: (resource: string) => void;
  openSignupModal: () => void;
  idToLatestViewlogMap?: Object;
  idToResourceMap?: Object;
  isPublic: boolean;
  setPlaylistCardSectionTextWidth: (width: number) => void;
  playlistCardSectionTextWidth: number;
  playlist: DataTypes.Playlist;
}

const ResourceDetailPlaylistCardSection: React.FC<Props> = (props: Props) => {
  const resourceTiles = React.useMemo(
    () =>
      props.section.resources.map(id => {
        const resource = props.playlistResources.find(
          resource => id === resource.objectID,
        );
        return (
          resource && (
            <VideoCardVerticalOrientationResourcePage
              currentUser={props.currentUser}
              active={id === props.currentResource.objectID}
              key={id}
              resource={resource}
              viewlog={
                props.userLatestViewlogs &&
                  props.userLatestViewlogs.resourceIdToLatestViewlog
                  ? props.userLatestViewlogs.resourceIdToLatestViewlog[
                  resource.objectID
                  ]
                  : null
              }
              hideCreatorAvatar={false}
              isPublic={props.isPublic}
              playlist={props.playlist}
            />
          )
        );
      }),
    [
      props.section,
      props.currentResource,
      props.playlistResources,
      props.selectResource,
      props.userLatestViewlogs,
    ],
  );

  React.useEffect(() => {
    props.setPlaylistCardSectionTextWidth(1)
    setTimeout(() => {
      props.setPlaylistCardSectionTextWidth(0)
    }, 1)
  }, [])

  return (
    <React.Fragment key={props.section.objectID}>
      <div className={s.resourcesDetailPlaylistSection}>
        {props.index !== -1 ? (
          <div className={s.resourcesDetailPlaylistSectionHeader}>
            {`Section ${props.index + 1}`}
          </div>
        ) : null}
        <TypographyTitle type={TypographyTitleType.CARD_SUB_SUB_TITLE}>
          <span>
            {props.section.title}
          </span>
        </TypographyTitle>
        <ClippedText width={props.playlistCardSectionTextWidth} text={props.section.description} maxLines={2} />
      </div>
      {resourceTiles}
    </React.Fragment>
  );
};

export default ResourceDetailPlaylistCardSection;

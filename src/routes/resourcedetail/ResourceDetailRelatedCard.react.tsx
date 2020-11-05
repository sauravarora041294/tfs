import * as DataTypes from "data/types";
import React, { useState } from "react";
import { Card, Divider } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";
import VideoCardVerticalOrientationResourcePage from "components/Views/ContentFeedView/VideoCardVerticalOrientationResourcePage.react";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import WhiteCard from "components/WhiteCard";
import VideoMinimalCardReact from "components/Views/ContentFeedView/VideoMinimalCard.react";
import { useMediaQuery } from "react-responsive";

interface Props {
  relatedResources: Array<DataTypes.Resource>;
  currentResource: DataTypes.Resource;
  selectResource: (resource: string) => void;
  openSignupModal: () => void;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  isPublic: boolean;
  currentUser: DataTypes.User;
}

interface Resource extends DataTypes.Resource {
  dateCreated: any;
}

const ResourceDetailRelatedCard: React.FC<Props> = (props: Props) => {
  // To show minimal cards on mobile screens
  const [isDeviceWidthLessThan575, setIsDeviceWidthLessThan575] = useState<
    boolean
  >(
    useMediaQuery({ maxWidth: 575 }, undefined, (matches: boolean) => {
      setIsDeviceWidthLessThan575(matches);
    }),
  );

  const resourceTiles = React.useMemo(
    () =>
      props.relatedResources.map((resource: Resource) =>
        !isDeviceWidthLessThan575 ? (
          <VideoCardVerticalOrientationResourcePage
            currentUser={props.currentUser}
            active={resource.objectID === props.currentResource.objectID}
            key={resource.objectID}
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
          />
        ) : (
          <VideoMinimalCardReact
            key={resource.objectID}
            resource={resource}
            viewlog={
              props.userLatestViewlogs &&
              props.userLatestViewlogs.resourceIdToLatestViewlog
                ? props.userLatestViewlogs.resourceIdToLatestViewlog[
                    resource.objectID
                  ]
                : null
            }
            isPublic={props.isPublic}
            showSignupModal={() => {}}
          />
        ),
      ),
    [
      props.currentResource,
      props.selectResource,
      props.userLatestViewlogs,
      props.relatedResources,
      isDeviceWidthLessThan575,
    ],
  );

  return (
    <WhiteCard className={s.resourcesDetailPlaylistCard}>
      <div className={s.resourcesDetailPlaylistCardHeaderContent}>
        <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
          Related Videos
        </TypographyTitle>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className={s.resourcesRelatedVideos}>{resourceTiles}</div>
    </WhiteCard>
  );
};

export default ResourceDetailRelatedCard;

import { Col, Row } from "antd";
import ContentFeedView from "components/Views/ContentFeedView";
import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import s from "./Mission.module.scss";
import { MissionDefaultViewTabs } from "./MissionReducer";

interface Props {
  mission: DataTypes.Mission;
  contributors: Array<DataTypes.Creator>;
  viewlogs: DataTypes.UserLatestViewlogs;
  recommendedContent: Array<DataTypes.Content>;
  recentlyAddedContent: Array<DataTypes.Content>;
  publiclyPreviewableContent: Array<DataTypes.Content>;
  topRatedContent: Array<DataTypes.Content>;
  playlists: Array<DataTypes.Playlist>;
  resources: Array<DataTypes.Resource>;
  isPublic: boolean;
  viewTab: MissionDefaultViewTabs;
  handleLoadMoreContent: (contentType: Enums.CONTENT_TYPE) => void;
  hasMorePlaylists: boolean;
  hasMoreResources: boolean;
}

const MissionDefaultView: React.FC<Props> = (props: Props) => {
  const featuredContainer = React.useMemo(
    () =>
      props.isPublic &&
      props.publiclyPreviewableContent &&
      props.publiclyPreviewableContent.length ? (
        <div className={s.featuredContainer}>
          <ContentFeedView
            title="Featured"
            results={props.publiclyPreviewableContent}
            userLatestViewlogs={props.viewlogs}
            horizontalOnMobile={true}
            isPublic
          />
        </div>
      ) : (
        undefined
      ),
    [props.isPublic, props.publiclyPreviewableContent, props.viewlogs],
  );

  const recommendedContainer = React.useMemo(() => {
    const recommendedContainerStyle = props.isPublic
      ? s.recommendedPublicContainer
      : s.recommendedContainer;
    return (
      !props.isPublic &&
      props.viewTab === MissionDefaultViewTabs.HOME && (
        <div className={recommendedContainerStyle}>
          <ContentFeedView
            title={"Recommended"}
            results={props.recommendedContent}
            userLatestViewlogs={props.viewlogs}
            horizontalOnMobile={true}
          />
        </div>
      )
    );
  }, [props.recommendedContent, props.viewlogs, props.isPublic, props.viewTab]);

  const recentlyAddedContainer = React.useMemo(
    () =>
      props.viewTab === MissionDefaultViewTabs.HOME && (
        <div className={s.recentlyAddedContainer}>
          <ContentFeedView
            title={"Recently Added"}
            results={props.recentlyAddedContent}
            userLatestViewlogs={props.viewlogs}
            isPublic={props.isPublic}
            showSignupOverlay={props.isPublic}
            horizontalOnMobile={true}
          />
        </div>
      ),
    [props.recentlyAddedContent, props.viewlogs, props.isPublic, props.viewTab],
  );

  const playlistsContainer = React.useMemo(() => {
    return (
      props.viewTab === MissionDefaultViewTabs.PLAYLIST && (
        <div className={s.recentlyAddedContainer}>
          <ContentFeedView
            title={""}
            results={props.playlists}
            userLatestViewlogs={props.viewlogs}
            isPublic={props.isPublic}
            showSignupOverlay={props.isPublic}
            hasMore={props.hasMorePlaylists}
            loadMore={() =>
              props.handleLoadMoreContent(Enums.CONTENT_TYPE.PLAYLIST)
            }
            horizontalOnMobile={true}
          />
        </div>
      )
    );
  }, [
    props.viewTab,
    props.playlists,
    props.isPublic,
    props.viewlogs,
    props.hasMorePlaylists,
  ]);

  const resourcesContainer = React.useMemo(() => {
    return (
      props.viewTab === MissionDefaultViewTabs.VIDEOS && (
        <div className={s.recentlyAddedContainer}>
          <ContentFeedView
            title={""}
            results={props.resources}
            userLatestViewlogs={props.viewlogs}
            isPublic={props.isPublic}
            showSignupOverlay={props.isPublic}
            hasMore={props.hasMoreResources}
            loadMore={() =>
              props.handleLoadMoreContent(Enums.CONTENT_TYPE.RESOURCE)
            }
            horizontalOnMobile={true}
          />
        </div>
      )
    );
  }, [
    props.viewTab,
    props.resources,
    props.isPublic,
    props.viewlogs,
    props.hasMoreResources,
  ]);

  const topRatedContainer = React.useMemo(() => {
    return (
      props.viewTab === MissionDefaultViewTabs.TOP_RATED && (
        <div className={s.recentlyAddedContainer}>
          <ContentFeedView
            title={""}
            results={props.topRatedContent}
            userLatestViewlogs={props.viewlogs}
            isPublic={props.isPublic}
            showSignupOverlay={props.isPublic}
            horizontalOnMobile={true}
          />
        </div>
      )
    );
  }, [props.topRatedContent, props.viewlogs, props.isPublic]);

  return (
    <Row className={s.missionDefaultViewContainer}>
      <Col className={s.missionDefaultViewContainerCol}>
        {featuredContainer}
        {recommendedContainer}
        {recentlyAddedContainer}
        {topRatedContainer}
        {playlistsContainer}
        {resourcesContainer}
      </Col>
    </Row>
  );
};

export default MissionDefaultView;

import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { History, Location } from "history";
import { compose } from "recompose";
import { Col, Row, Tabs, Collapse, Button } from "antd";
import s from "./Mission.module.scss";
import {
  MissionStateActionTypes,
  missionReducer,
  missionStateInit,
  MissionDefaultViewTabs,
} from "./MissionReducer";
import MissionSearchResultsView from "./MissionSearchResultsView.react";
import MissionDefaultView from "./MissionDefaultView.react";
import MissionHeader from "./MissionHeader.react";
import MissionCreatorsList from "./MissionCreatorsList.react";
import AboutThisChannel from "./AboutThisChannel.react";
import {
  getSearchRouteData,
  getPublicSearchRouteData,
  HITS_PER_PAGE,
} from "./MissionUtil";
import plusIcon from "assets/icons/plusIcon.svg";
import minusIcon from "assets/icons/minusIcon.svg";
import { useMediaQuery } from "react-responsive";
import MissionSearchBarReact from "./MissionSearchBar.react";
import ContentRequestsCard from "components/ContentRequestsCard";
import ContentTabs from "components/ContentTabs";
import WhiteCard from "components/WhiteCard";
import { MarginType } from "data/styleTypes";
import RESTAPIClient from "RESTAPIClient";
import { tabKeyToContentType } from "./MissionUtil";

interface Props {
  history?: History;
  location?: Location;
  isPublic: boolean;
  currentUser: DataTypes.User;
  mission: DataTypes.Mission;
  contributors: Array<DataTypes.Creator>;
  contentRequests: Array<DataTypes.ContentRequest>;
  searchContent: Array<DataTypes.Content>;
  searchContentPlaylists: Array<DataTypes.Content>;
  searchContentResources: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  recentlyAddedContent: Array<DataTypes.Content>;
  publiclyPreviewableContent: Array<DataTypes.Content>;
  topRatedContent: Array<DataTypes.Content>;
  viewlogs: DataTypes.UserLatestViewlogs;
  searchText?: string;
  error?: Error;
  playlists?: Array<DataTypes.Playlist>;
  resources?: Array<DataTypes.Resource>;
}

const MissionView: React.FC<Props> = (props: Props) => {
  const [missionState, dispatch] = React.useReducer(
    missionReducer,
    {
      ...props,
      paginatedContent: {
        playlist: props.playlists,
        resource: props.resources,
      },
      hasMoreContent: {
        playlist: true,
        resource: true,
      },
      currentContentPage: {
        playlist: 1,
        resource: 1,
      },
      paginatedSearchResults: {
        all: props.searchContent,
        playlist: props.searchContentPlaylists,
        resource: props.searchContentResources,
      },
      hasMoreSearchResults: {
        all: true,
        playlist: true,
        resource: true,
      },
      currentSearchResultsPage: {
        all: 1,
        playlist: 1,
        resource: 1,
      },
      activeSearchResultsTabKey: "1",
    },
    missionStateInit,
  );
  // To show Expandable view on mobile screens
  const handleMediaQueryChange = (matches: boolean) => {
    setIsShowMobileView(matches);
  };
  const showMobileView = useMediaQuery(
    { maxWidth: 575 },
    undefined,
    handleMediaQueryChange,
  );
  const [isShowMobileView, setIsShowMobileView] = useState<boolean>(
    showMobileView,
  );

  const handleLoadMoreSearchResults = async (
    contentType: Enums.CONTENT_TYPE,
  ) => {
    try {
      if (props.isPublic) {
        const fetchDataResponse = await getPublicSearchRouteData(
          missionState.searchText,
          missionState.mission.objectID,
          missionState.currentSearchResultsPage[contentType],
        );
        if (fetchDataResponse.searchContent) {
          dispatch({
            type: MissionStateActionTypes.FETCHED_NEXT_SEARCH_RESULTS,
            searchContent: fetchDataResponse.searchContent,
          });
        }
        if (
          !fetchDataResponse.searchContent ||
          fetchDataResponse.searchContent.length < HITS_PER_PAGE
        ) {
          dispatch({
            type: MissionStateActionTypes.END_FETCHING_NEXT_SEARCH_RESULTS,
          });
        }
      } else {
        const contentSearchResponse = await RESTAPIClient.Content.getContentInMissionBySearchString(
          missionState.searchText,
          props.currentUser.userId,
          missionState.mission.objectID,
          missionState.currentSearchResultsPage[contentType],
          HITS_PER_PAGE,
          contentType,
        );
        if (
          !contentSearchResponse.results ||
          contentSearchResponse.results.length === 0
        ) {
          dispatch({
            type: MissionStateActionTypes.END_FETCHING_NEXT_SEARCH_RESULTS,
            hasMoreSearchResults: {
              ...missionState.hasMoreSearchResults,
              [contentType]: false,
            },
          });
        } else {
          dispatch({
            type: MissionStateActionTypes.FETCHED_NEXT_SEARCH_RESULTS,
            paginatedSearchResults: {
              ...missionState.paginatedSearchResults,
              [contentType]: [
                ...missionState.paginatedSearchResults[contentType],
                ...contentSearchResponse.results,
              ],
            },
            currentSearchResultsPage: {
              ...missionState.currentSearchResultsPage,
              [contentType]:
                missionState.currentSearchResultsPage[contentType] + 1,
            },
          });
        }
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  const handleLoadMoreContent = async (contentType: Enums.CONTENT_TYPE) => {
    try {
      const content = await RESTAPIClient.Content.getContentInMissionBySearchString(
        "",
        props.currentUser.objectID,
        props.mission.objectID,
        missionState.currentContentPage[contentType],
        HITS_PER_PAGE,
        contentType,
      );
      if (
        !content.results ||
        (content.results && content.results.length == 0)
      ) {
        dispatch({
          type: MissionStateActionTypes.END_FETCHING_NEXT_CONTENT,
          hasMoreContent: {
            ...missionState.hasMoreContent,
            [contentType]: false,
          },
        });
      } else {
        dispatch({
          type: MissionStateActionTypes.FETCHED_NEXT_CONTENT,
          paginatedContent: {
            ...missionState.paginatedContent,
            [contentType]: [
              ...missionState.paginatedContent[contentType],
              ...content.results,
            ],
          },
          currentContentPage: {
            ...missionState.currentContentPage,
            [contentType]: missionState.currentContentPage[contentType] + 1,
          },
        });
      }
    } catch (error) {}
  };

  const viewToShow = (tab: MissionDefaultViewTabs) => {
    return (
      <MissionDefaultView
        mission={missionState.mission}
        contributors={missionState.contributors}
        recommendedContent={missionState.recommendedContent}
        recentlyAddedContent={missionState.recentlyAddedContent}
        publiclyPreviewableContent={missionState.publiclyPreviewableContent}
        topRatedContent={props.topRatedContent}
        playlists={
          missionState.paginatedContent.playlist as Array<DataTypes.Playlist>
        }
        resources={
          missionState.paginatedContent.resource as Array<DataTypes.Resource>
        }
        viewlogs={missionState.viewlogs}
        isPublic={missionState.isPublic}
        handleLoadMoreContent={handleLoadMoreContent}
        viewTab={tab}
        hasMorePlaylists={missionState.hasMoreContent.playlist}
        hasMoreResources={missionState.hasMoreContent.resource}
      />
    );
  };

  const aboutAndExpertContainerMobileVersion = (
    <div className={s.aboutAndExpertContainer}>
      <Row type="flex">
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) => {
            return isActive ? <img src={minusIcon} /> : <img src={plusIcon} />;
          }}
          style={{ border: 0 }}
        >
          <Collapse.Panel key="aboutThisChannel" header="About this Collection">
            <Col xl={13} lg={24}>
              <AboutThisChannel isShowMobileView mission={props.mission} />
            </Col>
          </Collapse.Panel>
          <Collapse.Panel key="Creators" header="12 Experts">
            <Col lg={24} className={s.missionCreatorsListContainer}>
              <MissionCreatorsList
                contributors={missionState.contributors}
                isShowMobileView={true}
              />
            </Col>
          </Collapse.Panel>
        </Collapse>
      </Row>
    </div>
  );

  const aboutAndExpertContainerDesktopVersion = (
    <div className={s.aboutAndExpertContainer}>
      <Row type="flex">
        <Col xl={13} lg={24}>
          <AboutThisChannel mission={props.mission} />
        </Col>
        <Col
          xl={{ span: 10, offset: 1 }}
          lg={24}
          className={s.missionCreatorsListContainer}
        >
          <MissionCreatorsList contributors={missionState.contributors} />
        </Col>
      </Row>
    </div>
  );

  const missionContentCountHeading = React.useMemo(() => {
    if (props.mission.numVideos && props.mission.numPlaylists) {
      return `${props.mission.numVideos} Videos & ${props.mission.numPlaylists} Playlists`;
    } else if (props.mission.numVideos) {
      return `${props.mission.numVideos} Videos`;
    } else if (props.mission.numPlaylists) {
      return `${props.mission.numPlaylists} Playlists`;
    }
  }, [props.mission]);

  const firstTabContent = (
    <Col span={24}>{viewToShow(MissionDefaultViewTabs.HOME)}</Col>
  );
  const secondTabContent = (
    <Col span={24}>{viewToShow(MissionDefaultViewTabs.VIDEOS)}</Col>
  );
  const thirdTabContent = (
    <Col span={24}>{viewToShow(MissionDefaultViewTabs.PLAYLIST)}</Col>
  );
  const fourthTabContent = (
    <Col span={24}>{viewToShow(MissionDefaultViewTabs.TOP_RATED)}</Col>
  );

  const videoTabContents =
    props.mission.numVideos > 0
      ? [{ tabName: "Videos", key: "2", children: secondTabContent }]
      : [];
  const playlistTabContents =
    props.mission.numPlaylists > 0
      ? [{ tabName: "Playlists", key: "3", children: thirdTabContent }]
      : [];
  const tabContents = [
    {
      tabName: "Home",
      key: "1",
      children: firstTabContent,
    },
    ...videoTabContents,
    ...playlistTabContents,
    {
      tabName: "Top Rated",
      key: "4",
      children: fourthTabContent,
    },
  ];

  const missionContent = missionState.isPublic ? (
    <React.Fragment>
      <MissionHeader
        mission={props.mission}
        defaultSearchedText={missionState.searchText}
      />
      {isShowMobileView
        ? aboutAndExpertContainerMobileVersion
        : aboutAndExpertContainerDesktopVersion}

      <WhiteCard
        withMargin={MarginType.ALL}
        className={`${s.missionMainContent} margin-top-0`}
      >
        {viewToShow(MissionDefaultViewTabs.HOME)}
      </WhiteCard>
    </React.Fragment>
  ) : (
    <React.Fragment>
      {/* Header */}
      <Col span={24}>
        <MissionHeader
          mission={props.mission}
          defaultSearchedText={missionState.searchText}
        />
      </Col>
      {/* About the channel & Channel experts */}
      {isShowMobileView
        ? aboutAndExpertContainerMobileVersion
        : aboutAndExpertContainerDesktopVersion}
      <WhiteCard
        title={missionContentCountHeading}
        subTitle="Top quality content for every part of your learning journey. Carefully curated playlists for each skill level. It’s time to acheive your goals."
        className={s.missionMainContent}
        withMargin={MarginType.ALL}
        titleAndSubtitleAlignCenter
      >
        <Col span={24} className="missionTabs">
          {missionState.searchText ? (
            <React.Fragment>
              <Col span={24}>
                <MissionSearchResultsView
                  results={missionState.paginatedSearchResults}
                  userLatestViewlogs={missionState.viewlogs}
                  searchText={missionState.searchText}
                  isPublic={missionState.isPublic}
                  loadMore={handleLoadMoreSearchResults}
                  hasMore={
                    missionState.hasMoreSearchResults[
                      tabKeyToContentType(
                        missionState.activeSearchResultsTabKey,
                      )
                    ]
                  }
                  mission={missionState.mission}
                  activeTabKey={missionState.activeSearchResultsTabKey}
                  onTabChange={(activeTabKey: string) => {
                    dispatch({
                      type:
                        MissionStateActionTypes.SET_ACTIVE_SEARCH_RESULTS_TAB_KEY,
                      activeSearchResultsTabKey: activeTabKey,
                    });
                  }}
                />
              </Col>
            </React.Fragment>
          ) : (
            <ContentTabs
              defaultActiveKey="1"
              style={{ background: "white" }}
              extraContent={
                <MissionSearchBarReact
                  missionId={props.mission.objectID}
                  defaultSearchedText={missionState.searchText}
                />
              }
              tabContents={tabContents}
              centered
            />
          )}
        </Col>
      </WhiteCard>
      <ContentRequestsCard
        currentUser={missionState.currentUser}
        missionId={missionState.mission.objectID}
      />
    </React.Fragment>
  );

  return <Row className={s.missionViewRoot}>{missionContent}</Row>;
};

export default compose<Props, Props>(withRouter)(MissionView);

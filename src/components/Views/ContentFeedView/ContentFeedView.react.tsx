import * as DataTypes from "data/types";
import React, { useState } from "react";
import s from "./ContentFeedView.module.scss";
import {
  ContentFeedViewStateActionTypes,
  ContentFeedViewReducer,
  ContentFeedViewStateInit,
} from "./ContentFeedViewReducer";
import CreatorCardVerticalOrientation from "./CreatorCardVerticalOrientation.react";
import MissionCardVerticalOrientation from "./MissionCardVerticalOrientation.react";
import MissionMinimalCard from "./MissionMinimalCard.react";
import MissionMinimalCardNew from "./MissionMinimalCardNew.react";
import PlaylistCardVerticalOrientation from "./PlaylistCardVerticalOrientation.react";
import PlaylistMinimalCard from "./PlaylistMinimalCard.react";
import VideoCardVerticalOrientation from "./VideoCardVerticalOrientation.react";
import VideoMinimalCard from "./VideoMinimalCard.react";
import InfiniteScroll from "../../InfiniteScroll";
import { useMediaQuery } from "react-responsive";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import { resizeContentFeedViewCard } from "utilities";
import SignupModal from "../../Modals/SignupModal";

interface Props {
  forceFlexWrap?: any;
  title: string;
  results?: Array<DataTypes.Content>;
  creators?: Array<DataTypes.Creator>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  style?: React.CSSProperties;
  maxNumberOfRowsToShow?: number;
  verticalOrientation?: boolean;
  directToCreatorsHubRoutes?: boolean;
  selectResource?: (resourceId: string) => void;
  selectPlaylist?: (playlistId: string) => void;
  selectLogic?: boolean;
  hideCreatorAvatar?: boolean;
  isPublic?: boolean;
  showSignupOverlay?: boolean;
  loadMore?: (currentPage: number) => void;
  scrollViewHeight?: number;
  isScrollable?: boolean;
  hasMore?: boolean;
  isUseNewMinimalMissionCard?: boolean;
  listClassName?: string;
  horizontalOnMobile?: boolean;
}
const MIN_WIDTH = 280;
const MAX_WIDTH = 350;

const ContentFeedView: React.FC<Props> = (props: Props) => {
  const [minCardWidth, setMinCardWidth] = React.useState(300);

  // To show minimal cards on mobile screens
  const [isShowMobileView, setIsShowMobileView] = useState<boolean>(
    useMediaQuery({ maxWidth: 767 }, undefined, (matches: boolean) => {
      setIsShowMobileView(matches);
    }),
  );

  const [contentFeedViewState, dispatch] = React.useReducer(
    ContentFeedViewReducer,
    {},
    ContentFeedViewStateInit,
  );

  const resourceIdToLatestViewlog = props.userLatestViewlogs
    ? props.userLatestViewlogs.resourceIdToLatestViewlog
    : {};

  const showSignupModal = React.useCallback(
    (redirectPath: string) => {
      dispatch({
        type: ContentFeedViewStateActionTypes.SHOW_SIGNUP_MODAL,
        redirectPath,
      });
    },
    [dispatch],
  );

  const hideSignupModal = React.useCallback(() => {
    dispatch({
      type: ContentFeedViewStateActionTypes.HIDE_SIGNUP_MODAL,
    });
  }, [dispatch]);

  const resizeCard = () => {
    const cardWidth = resizeContentFeedViewCard(MAX_WIDTH, MIN_WIDTH);
    setMinCardWidth(cardWidth);
  };

  React.useEffect(() => {
    resizeCard();
    window.addEventListener("resize", resizeCard);
    return () => window.removeEventListener("resize", resizeCard);
  }, [
    document.documentElement.clientWidth,
    window.innerWidth,
    document.getElementsByClassName("resultsRow"),
    document.getElementById("listContainer"),
  ]);

  const signupModal = React.useMemo(
    () => (
      <SignupModal
        show={contentFeedViewState.showSignupModal}
        onCancel={hideSignupModal}
      />
    ),
    [contentFeedViewState.showSignupModal, hideSignupModal],
  );

  const genPlaylistResult = React.useCallback(
    hit => {
      const sections = hit.sections || [];
      const playlistResourceIds = sections
        .map(section => section.resources)
        .reduce((a, b) => a.concat(b), []);

      const viewlogs = resourceIdToLatestViewlog
        ? playlistResourceIds.map(
          resourceId => resourceIdToLatestViewlog[resourceId],
        )
        : [];

      const PlayListCard =
        props.verticalOrientation && !isShowMobileView ? (
          <PlaylistCardVerticalOrientation
            key={hit.objectID}
            playlist={hit}
            viewlogs={viewlogs}
            directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
            hideCreatorAvatar={props.hideCreatorAvatar ? true : false}
            showSignupModal={showSignupModal}
            isPublic={props.isPublic}
          />
        ) : (
            <PlaylistMinimalCard
              key={hit.objectID}
              playlist={hit}
              viewlogs={viewlogs}
              selectLogic={props.selectLogic}
              selectPlaylist={props.selectPlaylist}
              directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
              hideCreatorAvatar={props.hideCreatorAvatar ? true : false}
              showSignupModal={showSignupModal}
              isPublic={props.isPublic}
              minCardWidth={minCardWidth}
            />
          );
      return PlayListCard;
    },
    [
      resourceIdToLatestViewlog,
      props.directToCreatorsHubRoutes,
      props.verticalOrientation,
      isShowMobileView,
      minCardWidth,
    ],
  );

  const genCreatorResult = React.useCallback(
    hit => (
      <CreatorCardVerticalOrientation
        key={hit.objectID}
        creator={hit}
        directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
      />
    ),
    [props.directToCreatorsHubRoutes],
  );

  const genVideoResult = React.useCallback(
    hit => {
      const VideoCard =
        props.verticalOrientation && !isShowMobileView ? (
          <VideoCardVerticalOrientation
            key={hit.objectID}
            resource={hit}
            viewlog={
              resourceIdToLatestViewlog &&
              resourceIdToLatestViewlog[hit.objectID]
            }
            directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
            hideCreatorAvatar={props.hideCreatorAvatar ? true : false}
            showSignupModal={showSignupModal}
            isPublic={props.isPublic}
          />
        ) : (
            <VideoMinimalCard
              key={hit.objectID}
              resource={hit}
              viewlog={
                resourceIdToLatestViewlog &&
                resourceIdToLatestViewlog[hit.objectID]
              }
              selectLogic={props.selectLogic}
              selectResource={props.selectResource}
              directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
              hideCreatorAvatar={props.hideCreatorAvatar ? true : false}
              showSignupModal={showSignupModal}
              isPublic={props.isPublic}
              minCardWidth={minCardWidth}
            />
          );

      return VideoCard;
    },
    [
      resourceIdToLatestViewlog,
      props.directToCreatorsHubRoutes,
      props.verticalOrientation,
      isShowMobileView,
      minCardWidth,
    ],
  );

  const genMissionResult = React.useCallback(
    hit => {
      if (props.verticalOrientation && !isShowMobileView) {
        return (
          <MissionCardVerticalOrientation
            key={hit.objectID}
            mission={hit}
            directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
          />
        );
      } else if (props.isUseNewMinimalMissionCard) {
        return (
          <MissionMinimalCardNew
            key={hit.objectID}
            mission={hit}
            directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
            minCardWidth={minCardWidth}
          />
        );
      } else {
        return (
          <MissionMinimalCard
            key={hit.objectID}
            mission={hit}
            directToCreatorsHubRoutes={props.directToCreatorsHubRoutes}
            minCardWidth={minCardWidth}
          />
        );
      }
    },
    [
      props.directToCreatorsHubRoutes,
      props.verticalOrientation,
      isShowMobileView,
      minCardWidth,
    ],
  );

  const creators = React.useMemo(
    () =>
      props.creators ? props.creators.map(hit => genCreatorResult(hit)) : [],
    [props.creators, genCreatorResult],
  );
  const sortedResults = React.useMemo(() => {
    return !props.results || props.results.length === 0
      ? []
      : props.results.sort((x, y) =>
        x.isPubliclyPreviewable === y.isPubliclyPreviewable
          ? 0
          : x.isPubliclyPreviewable
            ? -1
            : 1,
      );
  }, [props.results]);

  const content = React.useMemo(() => {
    return sortedResults
      ? sortedResults.map(hit => {
        switch (hit.contentType) {
          case "resource":
            return genVideoResult(hit);
          case "playlist":
            return genPlaylistResult(hit);
          case "mission":
            return genMissionResult(hit);
          default:
            return <div />;
        }
      })
      : [];
  }, [
    props.results,
    genVideoResult,
    genPlaylistResult,
    genMissionResult,
    genCreatorResult,
    minCardWidth,
  ]);

  const loadMore = () => {
    dispatch({
      type: ContentFeedViewStateActionTypes.INCREMENT_CURRENT_PAGE,
    });
    props.loadMore(contentFeedViewState.currentPage);
  };

  const resultsRowCSSClassName: string = props.verticalOrientation
    ? s.resultsRowVerticalOrientation
    : s.resultsRow;
  const rowLimiter = props.maxNumberOfRowsToShow ? s.rowLimitedContainer : "";

  return (
    <React.Fragment>
      {signupModal}
      <div
        className={s.defaultView}
        style={
          !props.horizontalOnMobile && isShowMobileView
            ? {
              ...props.style,
              paddingLeft: "0.875rem", //offset the padding on individual cards
              overflowX: "hidden",
            }
            : { ...props.style }
        }
      >
        {props.title && (
          <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
            {props.title}
          </TypographyTitle>
        )}
        <InfiniteScroll
          hasMore={props.hasMore}
          loadMore={loadMore}
          height={props.scrollViewHeight}
          isScrollable={props.isScrollable}
          displayMultiplePerLine={!props.verticalOrientation}
          horizontalOnMobile={props.horizontalOnMobile}
          className={props.listClassName}
        >
          {content.length > 0 ? content : creators}
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default ContentFeedView;

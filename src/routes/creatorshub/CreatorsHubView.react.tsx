import CreateMissionModal from "components/Modals/CreateMissionModal";
import CreatePlaylistModal from "components/Modals/CreatePlaylistModal";
import JoinMissionModal from "components/Modals/JoinMissionModal";
import UploadVideoModal from "components/Modals/UploadVideoModal";
import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History, Location } from "history";
import ActivityCard from "./ActivityCard.react";
import s from "./CreatorsHub.module.scss";
import {
  CreatorsHubDashboardStateActionTypes,
  creatorsHubReducer,
  creatorsHubStateInit,
} from "./CreatorsHubReducer";
import MissionsCard from "./MissionsCard.react";
import MyStatsCard from "./MyStatsCard.react";
import CreatorOnboardingModal from "components/Modals/CreatorOnboardingModal";
import {
  createJoinMissionRequest,
  fetchPendingRequestData,
  createJoinPlaylistRequest,
  tabKeyToContentType,
  searchContentToJoin,
  HITS_PER_PAGE
} from "./CreatorsHubUtil";
import { FirestoreRealtime } from "FirebaseClient";
import { CreatorOnboardingModalStateActionTypes } from "components/Modals/CreatorOnboardingModal/CreatorOnboardingModalReducer";

interface Props {
  currentUser: DataTypes.Creator;
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  myContributingMissions: Array<DataTypes.Mission>;
  myContributingPlaylists: Array<DataTypes.Playlist>;
  allMissions: Array<DataTypes.Mission>;
  pendingMissionContributorRequests: Array<DataTypes.Request>;
  pointCounts: DataTypes.PointCounts;
  userViewCounts: DataTypes.UserViewCounts;
  userUniqueViewCounts: DataTypes.UserUniqueViewCounts;
  activityNotifications: Array<DataTypes.ActivityNotification>;
  history?: History;
  location?: Location;
  error?: Error;
  missionsToJoin?: Array<DataTypes.Mission>;
  playlistsToJoin?: Array<DataTypes.Playlist>;
  pendingMissionRequests?: Array<DataTypes.Request>;
}

const CreatorsHubView: React.FC<Props> = (props: Props) => {
  const [creatorsHubState, dispatch] = React.useReducer(
    creatorsHubReducer,
    {
      currentUser: props.currentUser,
      myMissions: props.myMissions,
      myPlaylists: props.myPlaylists,
      myResources: props.myResources,
      myContributingMissions: props.myContributingMissions,
      myContributingPlaylists: props.myContributingPlaylists,
      allMissions: props.allMissions,
      pendingMissionContributorRequests:
        props.pendingMissionContributorRequests,
      pointCounts: props.pointCounts,
      userViewCounts: props.userViewCounts,
      userUniqueViewCounts: props.userUniqueViewCounts,
      activityNotifications: props.activityNotifications,
      contentToJoinResults: {
        mission: props.missionsToJoin,
        playlist: props.playlistsToJoin,
      },
      hasMoreContentToJoin: {
        mission: true,
        playlist: true
      },
      activeJoinContentTabKey: "1",
      currentContentResultPages: {
        mission: 1,
        playlist: 1
      }
    }
  );

  const uploadVideoModal = React.useMemo(
    () => (
      <UploadVideoModal
        isVisible={creatorsHubState.showVideoUploadModal}
        onCancel={() =>
          dispatch({
            type:
              CreatorsHubDashboardStateActionTypes.CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL,
          })
        }
        currentCreator={props.currentUser}
        creatorMissions={props.myMissions}
        creatorPlaylists={props.myPlaylists}
        onFinish={() => dispatch({
          type: CreatorsHubDashboardStateActionTypes.CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL
        })}
      />
    ),
    [
      creatorsHubState.showVideoUploadModal,
      props.currentUser,
      props.myMissions,
      props.myPlaylists,
      dispatch,
    ],
  );

  const createPlaylistModal = React.useMemo(
    () => (
      <CreatePlaylistModal
        show={creatorsHubState.showCreatePlaylistModal}
        closeModal={() =>
          dispatch({
            type: CreatorsHubDashboardStateActionTypes.CLOSE_PLAYLIST_MODAL,
          })
        }
      />
    ),
    [creatorsHubState.showCreatePlaylistModal, dispatch],
  );

  const createMissionModal = React.useMemo(
    () => (
      <CreateMissionModal
        show={creatorsHubState.showCreateMissionModal}
        closeModal={() =>
          dispatch({
            type:
              CreatorsHubDashboardStateActionTypes.CLOSE_CREATE_MISSION_MODAL,
          })
        }
      />
    ),
    [creatorsHubState.showCreateMissionModal, dispatch],
  );

  const creatorOnboardingModal = React.useMemo(
    () =>
      creatorsHubState.showOnboardingModal ? (
        <CreatorOnboardingModal
          show={creatorsHubState.showOnboardingModal}
          closeModal={shouldReload => {
            if (shouldReload) {
              props.history.replace({
                ...props.location,
                pathname: props.location.pathname,
              });
            }
          }}
        />
      ) : null,
    [creatorsHubState.showOnboardingModal],
  );

  const joinMissionModal = React.useMemo(
    () =>
      creatorsHubState.showJoinMissionModal ? (
        <JoinMissionModal
          show={creatorsHubState.showJoinMissionModal}
          closeModal={shouldReload => {
            dispatch({
              type:
                CreatorsHubDashboardStateActionTypes.CLOSE_JOIN_MISSION_MODAL,
            });
            if (shouldReload) {
              props.history.replace({
                ...props.location,
                pathname: props.location.pathname,
              });
            }
          }}
          missionToJoin={creatorsHubState.joinMissionModalMission}
        />
      ) : null,
    [
      creatorsHubState.showJoinMissionModal,
      creatorsHubState.joinMissionModalMission,
      dispatch,
      props.history,
      props.location,
    ],
  );

  const openJoinMissionModal = React.useCallback(
    mission =>
      dispatch({
        type: CreatorsHubDashboardStateActionTypes.OPEN_JOIN_MISSION_MODAL,
        mission: mission,
      }),
    [dispatch],
  );

  const joinRequestInit = async (contentId, contentType) => {
    if (contentType === "mission") {
      const result = await createJoinMissionRequest(
        creatorsHubState.currentUser.objectID,
        contentId,
      );
      if (result) {
        const pendingRequests = await fetchPendingRequestData(
          creatorsHubState.currentUser.objectID,
        );
        dispatch({
          type: CreatorsHubDashboardStateActionTypes.UPDATE_PENDING_REQUEST,
          pendingRequests,
        });
      }
    } else if (contentType === "playlist") {
      const result = await createJoinPlaylistRequest(
        creatorsHubState.currentUser.objectID,
        contentId,
      );
      props.history.replace({
        ...props.location,
        pathname: props.location.pathname,
      });
    }
  };

  const updateActivityNotifications = React.useCallback(
    (notifications: Array<DataTypes.ActivityNotification>) => {
      dispatch({
        type:
          CreatorsHubDashboardStateActionTypes.UPDATE_ACTIVITY_NOTIFICATIONS,
        activityNotifications: notifications,
      });
    },
    [dispatch],
  );

  React.useEffect(() => {
    const activityNotificationObserver = FirestoreRealtime.listenToMultipleDocuments(
      {
        query: FirestoreRealtime.collections.ACTIVITY_NOTIFICATIONS.where(
          "recipientUserId",
          "==",
          props.currentUser.objectID,
        ).orderBy("dateCreated", "desc"),
        callback: notifications =>
          updateActivityNotifications(
            notifications as Array<DataTypes.ActivityNotification>,
          ),
      },
    );
    return () => {
      activityNotificationObserver();
    };
  }, [props.currentUser.objectID]);

  const setActiveJoinContentTabKey = React.useCallback((activeJoinContentTabKey: string) => {
    dispatch({
      type: CreatorsHubDashboardStateActionTypes.SET_ACTIVE_JOIN_CONTENT_TAB_KEY,
      activeJoinContentTabKey
    })
  }, [dispatch]);

  const setJoinContentSearchText = React.useCallback(async (joinContentSearchString: string) => {
    dispatch({
      type: CreatorsHubDashboardStateActionTypes.SET_JOIN_CONTENT_SEARCH_TEXT,
      joinContentSearchString
    });
    const missionsSearchResponse = await searchContentToJoin({
      searchString: joinContentSearchString,
      creatorUserId: creatorsHubState.currentUser.userId,
      currentPage: 0,
      pageSize: HITS_PER_PAGE,
      contentType: Enums.CONTENT_TYPE.MISSION
    });
    const playlistsSearchResponse = await searchContentToJoin({
      searchString: joinContentSearchString,
      creatorUserId: creatorsHubState.currentUser.userId,
      currentPage: 0,
      pageSize: HITS_PER_PAGE,
      contentType: Enums.CONTENT_TYPE.PLAYLIST
    });
    dispatch({
      type: CreatorsHubDashboardStateActionTypes.SET_INITIAL_SEARCH_RESULTS,
      contentToJoinResults: {
        playlist: playlistsSearchResponse.results,
        mission: missionsSearchResponse.results
      }
    });

  }, [dispatch])

  const handleLoadMore = async (contentType: Enums.CONTENT_TYPE) => {
    contentType = tabKeyToContentType(creatorsHubState.activeJoinContentTabKey)
    try {
      const searchResultsResponse = await searchContentToJoin({
        searchString: creatorsHubState.joinContentSearchString,
        creatorUserId: creatorsHubState.currentUser.userId,
        currentPage: creatorsHubState.currentContentResultPages[contentType],
        pageSize: HITS_PER_PAGE,
        contentType: contentType
      });
      if (!searchResultsResponse.results || searchResultsResponse.results.length === 0) {
        dispatch({
          type: CreatorsHubDashboardStateActionTypes.END_FETCHING_NEXT_TO_JOIN_RESULTS,
          hasMoreContentToJoin: {
            ...creatorsHubState.hasMoreContentToJoin,
            [contentType]: false
          }
        });
      }
      if (searchResultsResponse.results) {
        dispatch({
          type: CreatorsHubDashboardStateActionTypes.FETCHED_NEXT_TO_JOIN_RESULTS,
          contentToJoinResults: {
            ...creatorsHubState.contentToJoinResults,
            [contentType]: [
              ...creatorsHubState.contentToJoinResults[contentType],
              ...searchResultsResponse.results
            ]
          },
          currentContentResultPages: {
            ...creatorsHubState.currentContentResultPages,
            [contentType]: creatorsHubState.currentContentResultPages[contentType] + 1
          }
        });
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  const missionsCard = React.useMemo(() => {
    return <MissionsCard
      allMissions={creatorsHubState.contentToJoinResults.mission as Array<DataTypes.Mission>}
      allPlaylists={creatorsHubState.contentToJoinResults.playlist as Array<DataTypes.Playlist>}
      openJoinMissionModal={openJoinMissionModal}
      pendingMissionContributorRequests={
        creatorsHubState.pendingMissionContributorRequests
      }
      currentUserId={
        creatorsHubState.currentUser &&
        creatorsHubState.currentUser.objectID
      }
      joinRequestInit={joinRequestInit}
      hasMoreContentToJoin={creatorsHubState.hasMoreContentToJoin}
      loadMoreContentToJoin={handleLoadMore}
      onActiveTabKeyChange={setActiveJoinContentTabKey}
      activeTabKey={creatorsHubState.activeJoinContentTabKey}
      setSearchText={setJoinContentSearchText}
      searchText={creatorsHubState.joinContentSearchString}
    />
  }, [
    creatorsHubState.contentToJoinResults,
    creatorsHubState.pendingMissionContributorRequests,
    creatorsHubState.currentUser,
    creatorsHubState.hasMoreContentToJoin,
    creatorsHubState.activeJoinContentTabKey,
    creatorsHubState.joinContentSearchString
  ])

  return (
    <div className={s.creatorsHubRoot}>
      <React.Fragment>
        {creatorOnboardingModal}
        {uploadVideoModal}
        {createPlaylistModal}
        {createMissionModal}
        {joinMissionModal}
        <Grid>
          <Grid.Column width={7} className={s.leftHandGridSectionContainer}>
            <MyStatsCard
              currentUser={creatorsHubState.currentUser}
              myResources={creatorsHubState.myResources}
              pointCounts={creatorsHubState.pointCounts}
              userViewCounts={creatorsHubState.userViewCounts}
              userUniqueViewCounts={creatorsHubState.userUniqueViewCounts}
            />
            <ActivityCard
              activityNotifications={creatorsHubState.activityNotifications}
            />
          </Grid.Column>
          <Grid.Column width={9} className={s.rightHandGridSectionContainer}>
            {missionsCard}
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(CreatorsHubView);

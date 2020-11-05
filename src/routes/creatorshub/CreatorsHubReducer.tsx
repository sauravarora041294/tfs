import * as DataTypes from "data/types";

interface CreatorsHubDashboardState {
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
  videoUploadFile?: File;
  showVideoUploadModal?: boolean;
  showCreatePlaylistModal?: boolean;
  showCreateMissionModal?: boolean;
  showJoinMissionModal?: boolean;
  joinMissionModalMission?: DataTypes.Mission;
  showOnboardingModal?: boolean;
  currentContentResultPages?: {
    mission: number;
    playlist: number;
  };
  contentToJoinResults?: {
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
  },
  hasMoreContentToJoin?: {
    mission: boolean;
    playlist: boolean;
  };
  activeJoinContentTabKey?: string;
  joinContentSearchString?: string;
}

enum CreatorsHubDashboardStateActionTypes {
  SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL = "SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL",
  CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL = "CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL",
  OPEN_CREATE_PLAYLIST_MODAL = "OPEN_CREATE_PLAYLIST_MODAL",
  CLOSE_PLAYLIST_MODAL = "CLOSE_PLAYLIST_MODAL",
  OPEN_CREATE_MISSION_MODAL = "OPEN_CREATE_MISSION_MODAL",
  CLOSE_CREATE_MISSION_MODAL = "CLOSE_CREATE_MISSION_MODAL",
  OPEN_JOIN_MISSION_MODAL = "OPEN_JOIN_MISSION_MODAL",
  CLOSE_JOIN_MISSION_MODAL = "CLOSE_JOIN_MISSION_MODAL",
  UPDATE_PENDING_REQUEST = "UPDATE_PENDING_REQUEST",
  UPDATE_ACTIVITY_NOTIFICATIONS = "UPDATE_ACTIVITY_NOTIFICATIONS",
  FETCHED_NEXT_TO_JOIN_RESULTS = "FETCHED_NEXT_TO_JOIN_RESULTS",
  END_FETCHING_NEXT_TO_JOIN_RESULTS = "END_FETCHING_NEXT_TO_JOIN_RESULTS",
  SET_ACTIVE_JOIN_CONTENT_TAB_KEY = "SET_ACTIVE_JOIN_CONTENT_TAB_KEY",
  SET_JOIN_CONTENT_SEARCH_TEXT = "SET_JOIN_CONTENT_SEARCH_TEXT",
  SET_INITIAL_SEARCH_RESULTS = "SET_INITIAL_SEARCH_RESULTS"
}

interface CreatorsHubDashboardStateAction {
  type: CreatorsHubDashboardStateActionTypes;
  videoUploadFile?: File;
  mission?: DataTypes.Mission;
  pendingRequests?: Array<DataTypes.Request>;
  activityNotifications?: Array<DataTypes.ActivityNotification>;
  currentContentResultPages?: {
    mission: number;
    playlist: number;
  };
  contentToJoinResults?: {
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
  };
  hasMoreContentToJoin?: {
    mission: boolean;
    playlist: boolean;
  };
  activeJoinContentTabKey?: string;
  joinContentSearchString?: string;
}

const creatorsHubStateInit = (
  initialState: CreatorsHubDashboardState,
): CreatorsHubDashboardState => {
  const isOnboardingComplete =
    initialState.currentUser &&
    initialState.currentUser.creatorOnboardingStatus ===
    DataTypes.CreatorOnboardingStatus.COMPLETE;
  return {
    videoUploadFile: null,
    showVideoUploadModal: false,
    showCreatePlaylistModal: false,
    showCreateMissionModal: false,
    showJoinMissionModal: false,
    joinMissionModalMission: null,
    showOnboardingModal: !isOnboardingComplete,
    ...initialState,
  };
};

const creatorsHubReducer = (
  state: CreatorsHubDashboardState,
  action: CreatorsHubDashboardStateAction,
): CreatorsHubDashboardState => {
  switch (action.type) {
    case CreatorsHubDashboardStateActionTypes.UPDATE_PENDING_REQUEST:
      return {
        ...state,
        pendingMissionContributorRequests: action.pendingRequests,
      };
    case CreatorsHubDashboardStateActionTypes.SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL:
      return {
        ...state,
        videoUploadFile: action.videoUploadFile,
        showVideoUploadModal: true,
      };
    case CreatorsHubDashboardStateActionTypes.CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL:
      return {
        ...state,
        videoUploadFile: null,
        showVideoUploadModal: false,
      };
    case CreatorsHubDashboardStateActionTypes.OPEN_CREATE_PLAYLIST_MODAL:
      return { ...state, showCreatePlaylistModal: true };
    case CreatorsHubDashboardStateActionTypes.CLOSE_PLAYLIST_MODAL:
      return { ...state, showCreatePlaylistModal: false };
    case CreatorsHubDashboardStateActionTypes.OPEN_CREATE_MISSION_MODAL:
      return { ...state, showCreateMissionModal: true };
    case CreatorsHubDashboardStateActionTypes.CLOSE_CREATE_MISSION_MODAL:
      return { ...state, showCreateMissionModal: false };
    case CreatorsHubDashboardStateActionTypes.OPEN_JOIN_MISSION_MODAL:
      return {
        ...state,
        showJoinMissionModal: true,
        joinMissionModalMission: action.mission,
      };
    case CreatorsHubDashboardStateActionTypes.CLOSE_JOIN_MISSION_MODAL:
      return {
        ...state,
        showJoinMissionModal: false,
        joinMissionModalMission: null,
      };
    case CreatorsHubDashboardStateActionTypes.UPDATE_ACTIVITY_NOTIFICATIONS:
      return {
        ...state,
        activityNotifications: action.activityNotifications,
      };
    case CreatorsHubDashboardStateActionTypes.FETCHED_NEXT_TO_JOIN_RESULTS:
      return {
        ...state,
        contentToJoinResults: {
          ...state.contentToJoinResults,
          ...action.contentToJoinResults,
        },
        currentContentResultPages: {
          ...state.currentContentResultPages,
          ...action.currentContentResultPages,
        }
      }
    case CreatorsHubDashboardStateActionTypes.END_FETCHING_NEXT_TO_JOIN_RESULTS:
      return {
        ...state,
        hasMoreContentToJoin: {
          ...state.hasMoreContentToJoin,
          ...action.hasMoreContentToJoin
        }
      };
    case CreatorsHubDashboardStateActionTypes.SET_ACTIVE_JOIN_CONTENT_TAB_KEY:
      return {
        ...state,
        activeJoinContentTabKey: action.activeJoinContentTabKey
      }
    case CreatorsHubDashboardStateActionTypes.SET_JOIN_CONTENT_SEARCH_TEXT:
      return {
        ...state,
        joinContentSearchString: action.joinContentSearchString
      }
    case CreatorsHubDashboardStateActionTypes.SET_INITIAL_SEARCH_RESULTS:
      return {
        ...state,
        contentToJoinResults: action.contentToJoinResults,
        currentContentResultPages: {
          mission: 1,
          playlist: 1
        },
        hasMoreContentToJoin: {
          mission: true,
          playlist: true
        }
      }
    default:
      return state;
  }
};

export {
  CreatorsHubDashboardStateActionTypes,
  creatorsHubStateInit,
  creatorsHubReducer,
};

import * as DataTypes from "data/types";

interface MyContentState {
  currentUser: DataTypes.User;
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  videoUploadFile?: File;
  showVideoUploadModal?: boolean;
  showUploadVideoModal?: boolean;
  showCreatePlaylistModal?: boolean;
  showCreateMissionModal?: boolean;
  sidebarCollapsed?: boolean;
  showDragAndDropModal?: boolean;
  showDeleteVideoModal?: boolean;
  deleteVideoModalInfo?: DataTypes.Resource;
  showDeletePlaylistModal?: boolean;
  deletePlaylistModalInfo?: DataTypes.Playlist;
  showDeleteMissionModal?: boolean;
  deleteMissionModalInfo?: DataTypes.Mission;
}

enum MyContentStateActionTypes {
  SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL = "SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL",
  CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL = "CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL",
  OPEN_CREATE_PLAYLIST_MODAL = "OPEN_CREATE_PLAYLIST_MODAL",
  CLOSE_PLAYLIST_MODAL = "CLOSE_PLAYLIST_MODAL",
  OPEN_CREATE_MISSION_MODAL = "OPEN_CREATE_MISSION_MODAL",
  CLOSE_CREATE_MISSION_MODAL = "CLOSE_CREATE_MISSION_MODAL",
  OPEN_UPLOAD_FILE_MODAL = "OPEN_UPLOAD_FILE_MODAL",
  CLOSE_DRAG_AND_DROP_MODAL = "CLOSE_DRAG_AND_DROP_MODAL",
  OPEN_DELETE_MISSION_MODAL = "OPEN_DELETE_MISSION_MODAL",
  CLOSE_DELETE_MISSION_MODAL = "CLOSE_DELETE_MISSION_MODAL",
  OPEN_DELETE_VIDEO_MODAL = "OPEN_DELETE_VIDEO_MODAL",
  CLOSE_DELETE_VIDEO_MODAL = "CLOSE_DELETE_VIDEO_MODAL",
  OPEN_DELETE_PLAYLIST_MODAL = "OPEN_DELETE_PLAYLIST_MODAL",
  CLOSE_DELETE_PLAYLIST_MODAL = "CLOSE_DELETE_PLAYLIST_MODAL",
  UPDATE_MY_CONTENT = "UPDATE_MY_CONTENT",
  OPEN_UPLOAD_VIDEO_MODAL = "OPEN_UPLOAD_VIDEO_MODAL",
  CLOSE_UPLOAD_VIDEO_MODAL = "CLOSE_UPLOAD_VIDEO_MODAL"
}

interface MyContentStateAction {
  type: MyContentStateActionTypes;
  videoUploadFile?: File;
  deleteVideoModalInfo?: DataTypes.Resource;
  deletePlaylistModalInfo?: DataTypes.Playlist;
  deleteMissionModalInfo?: DataTypes.Mission;
  myMissions?: Array<DataTypes.Mission>;
  myPlaylists?: Array<DataTypes.Playlist>;
  myResources?: Array<DataTypes.Resource>;
}

const myContentStateInit = (initialState: MyContentState): MyContentState => {
  return {
    videoUploadFile: null,
    showVideoUploadModal: false,
    showCreatePlaylistModal: false,
    showCreateMissionModal: false,
    showDeleteVideoModal: false,
    showDeletePlaylistModal: false,
    showDeleteMissionModal: false,
    sidebarCollapsed: false,
    ...initialState,
  };
};

const myContentReducer = (
  state: MyContentState,
  action: MyContentStateAction,
) => {
  switch (action.type) {
    case MyContentStateActionTypes.SET_VIDEO_UPLOAD_FILE_AND_OPEN_MODAL:
      return {
        ...state,
        videoUploadFile: action.videoUploadFile,
        showVideoUploadModal: true,
      };
    case MyContentStateActionTypes.OPEN_UPLOAD_FILE_MODAL:
      return {
        ...state,
        showVideoUploadModal: true,
        showDragAndDropModal: false,
      };
    case MyContentStateActionTypes.CLOSE_DRAG_AND_DROP_MODAL:
      return { ...state, videoUploadFile: null, showDragAndDropModal: false };
    case MyContentStateActionTypes.CLEAR_VIDEO_UPLOAD_FILE_AND_CLOSE_MODAL:
      return {
        ...state,
        videoUploadFile: null,
        showVideoUploadModal: false,
      };
    case MyContentStateActionTypes.OPEN_CREATE_PLAYLIST_MODAL:
      return { ...state, showCreatePlaylistModal: true };
    case MyContentStateActionTypes.CLOSE_PLAYLIST_MODAL:
      return { ...state, showCreatePlaylistModal: false };
    case MyContentStateActionTypes.OPEN_CREATE_MISSION_MODAL:
      return { ...state, showCreateMissionModal: true };
    case MyContentStateActionTypes.CLOSE_CREATE_MISSION_MODAL:
      return { ...state, showCreateMissionModal: false };
    case MyContentStateActionTypes.OPEN_DELETE_VIDEO_MODAL:
      return {
        ...state,
        showDeleteVideoModal: true,
        deleteVideoModalInfo: action.deleteVideoModalInfo,
      };
    case MyContentStateActionTypes.CLOSE_DELETE_VIDEO_MODAL:
      return { ...state, showDeleteVideoModal: false };
    case MyContentStateActionTypes.OPEN_DELETE_PLAYLIST_MODAL:
      return {
        ...state,
        showDeletePlaylistModal: true,
        deletePlaylistModalInfo: action.deletePlaylistModalInfo,
      };
    case MyContentStateActionTypes.CLOSE_DELETE_PLAYLIST_MODAL:
      return { ...state, showDeletePlaylistModal: false };
    case MyContentStateActionTypes.OPEN_DELETE_MISSION_MODAL:
      return {
        ...state,
        showDeleteMissionModal: true,
        deleteMissionModalInfo: action.deleteMissionModalInfo,
      };
    case MyContentStateActionTypes.CLOSE_DELETE_MISSION_MODAL:
      return { ...state, showDeleteMissionModal: false };
    case MyContentStateActionTypes.UPDATE_MY_CONTENT:
      return {
        ...state,
        myMissions: action.myMissions,
        myPlaylists: action.myPlaylists,
        myResources: action.myResources,
      };
    case MyContentStateActionTypes.OPEN_UPLOAD_VIDEO_MODAL: {
      return {
        ...state,
        showUploadVideoModal: true
      }
    }
    case MyContentStateActionTypes.CLOSE_UPLOAD_VIDEO_MODAL: {
      return {
        ...state,
        showUploadVideoModal: false
      }
    }
    default:
      return state;
  }
};

export { MyContentStateActionTypes, myContentStateInit, myContentReducer };

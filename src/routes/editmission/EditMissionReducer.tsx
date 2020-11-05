import * as DataTypes from "data/types";

interface EditMissionState {
  currentUser: DataTypes.User;
  mission: DataTypes.Mission;
  myContentInMission: Array<DataTypes.Content>;
  missionResources: Array<DataTypes.Resource>;
  missionPlaylists: Array<DataTypes.Playlist>;
  missionContentRequests: Array<DataTypes.ContentRequest>;
  missionContributors: Array<DataTypes.User>;
  missionCreator: DataTypes.User;
  pendingContributorRequestsForThisMission: Array<DataTypes.Request>;
  hasMissionOwnerPermissions?: boolean;
  isApprovedContributor?: boolean;
  hasRequestedContributorPermission?: boolean;
  showEditMissionInfoModal?: boolean;
  editMissionInfoModalInfo?: {
    mission?: DataTypes.Mission;
  };
  showAddContentToMissionModal?: boolean;
  addContentToMissionModalInfo?: {
    mission?: DataTypes.Mission;
  };
  isRemoveContributorModalVisible?: boolean;
  removeContributorInfo: {
    contributor?: DataTypes.User;
    mission?: DataTypes.Mission;
  };
  isEditingMissionContributors?: boolean;
  showResolveContentRequestModal?: boolean;
  resolveContentRequestModalInfo?: DataTypes.ContentRequest;
  showJoinMissionModal?: boolean;
  showRemoveContributorModal?: boolean;
  removeContributorModalInfo?: {
    contributor: DataTypes.Creator;
    mission: DataTypes.Mission;
  };
  isSubmittingForm?: boolean;
  successfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  isRemovingContent?: boolean;
  showDeleteMissionModal?: boolean;
}

enum EditMissionStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  BEGIN_EDITING_MISSION_CONTRIBUTORS = "BEGIN_EDITING_MISSION_CONTRIBUTORS",
  CANCEL_EDITING_MISSION_CONTRIBUTORS = "CANCEL_EDITING_MISSION_CONTRIBUTORS",
  SHOW_REMOVE_CONTRIBUTOR_MODAL = "SHOW_REMOVE_CONTRIBUTOR_MODAL",
  HIDE_REMOVE_CONTRIBUTOR_MODAL = "HIDE_REMOVE_CONTRIBUTOR_MODAL",
  UPDATE_MISSION_CONTRIBUTORS = "UPDATE_MISSION_CONTRIBUTORS",
  SHOW_EDIT_MISSION_INFO_MODAL = "SHOW_EDIT_MISSION_INFO_MODAL",
  SHOW_DELETE_MISSION_MODAL = "SHOW_DELETE_MISSION_MODAL",
  HIDE_EDIT_MISSION_INFO_MODAL = "HIDE_EDIT_MISSION_INFO_MODAL",
  SHOW_ADD_CONTENT_TO_MISSION_MODAL = "SHOW_ADD_CONTENT_TO_MISSION_MODAL",
  HIDE_ADD_CONTENT_TO_MISSION_MODAL = "HIDE_ADD_CONTENT_TO_MISSION_MODAL",
  HIDE_DELETE_MISSION_MODAL = "HIDE_DELETE_MISSION_MODAL",
  SHOW_JOIN_MISSION_MODAL = "SHOW_JOIN_MISSION_MODAL",
  CLOSE_JOIN_MISSION_MODAL = "CLOSE_JOIN_MISSION_MODAL",
  SHOW_RESOLVE_CONTENT_REQUEST_MODAL = "SHOW_RESOLVE_CONTENT_REQUEST_MODAL",
  HIDE_RESOLVE_CONTENT_REQUEST_MODAL = "HIDE_RESOLVE_CONTENT_REQUEST_MODAL",
  UPDATE_MISSION = "UPDATE_MISSION",
  UPDATE_CONTRIBUTORS = "UPDATE_CONTRIBUTORS",
  UPDATE_MY_CONTENT_IN_MISSION = "UPDATE_MY_CONTENT_IN_MISSION",
  BEGIN_REMOVE_CONTENT_FROM_MISSION = "BEGIN_REMOVE_CONTENT_FROM_MISSION",
  FINISH_REMOVE_CONTENT_FROM_MISSION = "FINISH_REMOVE_CONTENT_FROM_MISSION",
  UPDATE_CONTENT_REQUESTS = "UPDATE_CONTENT_REQUESTS",
}

interface EditMissionStateAction {
  type: EditMissionStateActionTypes;
  submissionError?: Error;
  mission?: DataTypes.Mission;
  contributor?: DataTypes.User;
  missionContributors?: Array<DataTypes.User>;
  contentRequest?: DataTypes.ContentRequest;
  myContentInMission?: Array<DataTypes.Content>;
  isRemovingContent?: boolean;
  missionContentRequests?: Array<DataTypes.ContentRequest>;
}

const editMissionStateInit = (
  initialState: EditMissionState,
): EditMissionState => {
  const isApprovedContributor = initialState.mission.contributors.includes(
    initialState.currentUser.objectID,
  );
  const hasRequestedContributorPermission =
    initialState.pendingContributorRequestsForThisMission.length > 0;
  const hasMissionOwnerPermissions =
    initialState.mission.creatorUserId === initialState.currentUser.objectID;
  return {
    ...initialState,
    isSubmittingForm: false,
    successfullySubmittedForm: false,
    formSubmissionError: null,
    hasMissionOwnerPermissions,
    showEditMissionInfoModal: false,
    showAddContentToMissionModal: false,
    addContentToMissionModalInfo: null,
    isApprovedContributor: isApprovedContributor,
    hasRequestedContributorPermission: hasRequestedContributorPermission,
    removeContributorModalInfo: {
      contributor: null,
      mission: null,
    },
    isRemoveContributorModalVisible: false,
    isEditingMissionContributors: false,
    showResolveContentRequestModal: false,
    showJoinMissionModal: false,
    showRemoveContributorModal: false,
  };
};

const editMissionReducer = (
  state: EditMissionState,
  action: EditMissionStateAction,
): EditMissionState => {
  switch (action.type) {
    case EditMissionStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case EditMissionStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: false,
        formSubmissionError: action.submissionError,
      };
    case EditMissionStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: true,
      };
    case EditMissionStateActionTypes.BEGIN_EDITING_MISSION_CONTRIBUTORS:
      return {
        ...state,
        isEditingMissionContributors: true,
      };
    case EditMissionStateActionTypes.CANCEL_EDITING_MISSION_CONTRIBUTORS:
      return {
        ...state,
        isEditingMissionContributors: false,
      };
    case EditMissionStateActionTypes.SHOW_REMOVE_CONTRIBUTOR_MODAL:
      const removeContributorInfo = {
        contributor: action.contributor,
        mission: action.mission,
      };
      return {
        ...state,
        showRemoveContributorModal: true,
        removeContributorModalInfo: removeContributorInfo,
      };
    case EditMissionStateActionTypes.HIDE_REMOVE_CONTRIBUTOR_MODAL:
      return {
        ...state,
        showRemoveContributorModal: false,
      };
    case EditMissionStateActionTypes.UPDATE_MISSION_CONTRIBUTORS:
      return {
        ...state,
        missionContributors: action.missionContributors,
      };
    case EditMissionStateActionTypes.UPDATE_CONTENT_REQUESTS:
      return {
        ...state,
        missionContentRequests: action.missionContentRequests,
      };
    case EditMissionStateActionTypes.SHOW_EDIT_MISSION_INFO_MODAL:
      const editMissionInfoModalInfo = {
        mission: action.mission,
      };
      return {
        ...state,
        showEditMissionInfoModal: true,
        editMissionInfoModalInfo: editMissionInfoModalInfo,
      };
    case EditMissionStateActionTypes.SHOW_DELETE_MISSION_MODAL:
      return {
        ...state,
        showDeleteMissionModal: true,
      };
    case EditMissionStateActionTypes.HIDE_EDIT_MISSION_INFO_MODAL:
      return {
        ...state,
        showEditMissionInfoModal: false,
        editMissionInfoModalInfo: null,
      };
    case EditMissionStateActionTypes.HIDE_DELETE_MISSION_MODAL:
      return { ...state, showDeleteMissionModal: false };
    case EditMissionStateActionTypes.SHOW_ADD_CONTENT_TO_MISSION_MODAL:
      const addContentToMissionModalInfo = {
        mission: action.mission,
      };
      return {
        ...state,
        showAddContentToMissionModal: true,
        addContentToMissionModalInfo: addContentToMissionModalInfo,
      };
    case EditMissionStateActionTypes.HIDE_ADD_CONTENT_TO_MISSION_MODAL:
      return {
        ...state,
        showAddContentToMissionModal: false,
        addContentToMissionModalInfo: null,
      };
    case EditMissionStateActionTypes.SHOW_JOIN_MISSION_MODAL:
      return {
        ...state,
        showJoinMissionModal: true,
      };
    case EditMissionStateActionTypes.CLOSE_JOIN_MISSION_MODAL:
      return {
        ...state,
        showJoinMissionModal: false,
      };
    case EditMissionStateActionTypes.SHOW_RESOLVE_CONTENT_REQUEST_MODAL:
      return {
        ...state,
        showResolveContentRequestModal: true,
        resolveContentRequestModalInfo: action.contentRequest,
      };
    case EditMissionStateActionTypes.HIDE_RESOLVE_CONTENT_REQUEST_MODAL:
      return {
        ...state,
        showResolveContentRequestModal: false,
      };
    case EditMissionStateActionTypes.UPDATE_MISSION:
      return { ...state, mission: action.mission };
    case EditMissionStateActionTypes.UPDATE_CONTRIBUTORS:
      return {
        ...state,
        missionContributors: action.missionContributors,
      };
    case EditMissionStateActionTypes.UPDATE_MY_CONTENT_IN_MISSION:
      return { ...state, myContentInMission: action.myContentInMission };
    case EditMissionStateActionTypes.BEGIN_REMOVE_CONTENT_FROM_MISSION:
      return { ...state, isRemovingContent: true };
    case EditMissionStateActionTypes.FINISH_REMOVE_CONTENT_FROM_MISSION:
      return { ...state, isRemovingContent: false };
    default:
      return state;
  }
};

export {
  EditMissionStateActionTypes,
  editMissionStateInit,
  editMissionReducer,
};

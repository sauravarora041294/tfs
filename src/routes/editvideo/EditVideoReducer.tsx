import * as DataTypes from "data/types";

interface EditVideoState {
  resource: DataTypes.Resource;
  currentUser: DataTypes.Creator;
  videoDuration?: number;
  showVideoDetailsEditForm?: boolean;
  isSubmittingForm?: boolean;
  showDeleteVideoModal?: boolean;
}

enum EditVideoStateActionTypes {
  SET_VIDEO_DURATION = "SET_VIDEO_DURATION",
  SHOW_VIDEO_DETAILS_EDIT_FORM = "SHOW_VIDEO_DETAILS_EDIT_FORM",
  HIDE_VIDEO_DETAILS_EDIT_FORM = "HIDE_VIDEO_DETAILS_EDIT_FORM",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISH_FORM_SUBMISSION = "FINISH_FORM_SUBMISSION",
  OPEN_DELETE_VIDEO_MODAL = "OPEN_DELETE_VIDEO_MODAL",
  CLOSE_DELETE_VIDEO_MODAL = "CLOSE_DELETE_VIDEO_MODAL",
  UPDATE_RESOURCE = "UPDATE_RESOURCE",
}

interface EditVideoStateAction {
  type: EditVideoStateActionTypes;
  videoDuration?: number;
  resource?: DataTypes.Resource;
}

const editVideoStateInit = (initialState: EditVideoState): EditVideoState => {
  return {
    ...initialState,
    videoDuration: 0,
    showVideoDetailsEditForm: false,
    isSubmittingForm: false,
  };
};

const editVideoReducer = (
  state: EditVideoState,
  action: EditVideoStateAction,
) => {
  switch (action.type) {
    case EditVideoStateActionTypes.SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.videoDuration,
      };
    case EditVideoStateActionTypes.SHOW_VIDEO_DETAILS_EDIT_FORM:
      return {
        ...state,
        showVideoDetailsEditForm: true,
      };
    case EditVideoStateActionTypes.HIDE_VIDEO_DETAILS_EDIT_FORM:
      return {
        ...state,
        showVideoDetailsEditForm: false,
      };
    case EditVideoStateActionTypes.BEGIN_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingForm: true,
      };
    case EditVideoStateActionTypes.FINISH_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingForm: false,
        showVideoDetailsEditForm: false,
      };
    case EditVideoStateActionTypes.UPDATE_RESOURCE:
      return { ...state, resource: action.resource };
    case EditVideoStateActionTypes.OPEN_DELETE_VIDEO_MODAL:
      return { ...state, showDeleteVideoModal: true };
    case EditVideoStateActionTypes.CLOSE_DELETE_VIDEO_MODAL:
      return { ...state, showDeleteVideoModal: false };
    default:
      return state;
  }
};

export { EditVideoStateActionTypes, editVideoStateInit, editVideoReducer };

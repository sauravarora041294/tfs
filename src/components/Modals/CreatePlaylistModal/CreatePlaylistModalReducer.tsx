import * as DataTypes from "data/types";

interface CreatePlaylistModalState {
  playlist?: DataTypes.Playlist;
  savedPlaylistId?: string;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum CreatePlaylistModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface CreatePlaylistModalStateAction {
  type: CreatePlaylistModalStateActionTypes;
  submissionError?: Error;
  savedPlaylistId?: string;
}

const createPlaylistStateInit = (
  initialState: CreatePlaylistModalState,
): CreatePlaylistModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
  ...initialState,
});

const createPlaylistReducer = (
  state: CreatePlaylistModalState,
  action: CreatePlaylistModalStateAction,
): CreatePlaylistModalState => {
  switch (action.type) {
    case CreatePlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case CreatePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: true,
        savedPlaylistId: action.savedPlaylistId,
      };
    case CreatePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case CreatePlaylistModalStateActionTypes.CLEAR_MODAL_DATA:
      return { isSubmittingForm: false, successfullySubmitted: false };
    default:
      return state;
  }
};

export {
  CreatePlaylistModalStateActionTypes,
  createPlaylistStateInit,
  createPlaylistReducer,
};

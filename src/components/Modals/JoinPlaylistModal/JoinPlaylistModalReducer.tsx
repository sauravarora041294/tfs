import * as DataTypes from "data/types";

interface JoinPlaylistModalState {
  playlist: DataTypes.Playlist;
  subplaylistError?: Object;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum JoinPlaylistModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface JoinPlaylistModalStateAction {
  type: JoinPlaylistModalStateActionTypes;
  subplaylistError?: Object;
  submissionError?: Error;
}

const joinPlaylistModalStateInit = (
  initialState: JoinPlaylistModalState,
): JoinPlaylistModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  subplaylistError: null,
});

const joinPlaylistModalReducer = (
  state: JoinPlaylistModalState,
  action: JoinPlaylistModalStateAction,
): JoinPlaylistModalState => {
  switch (action.type) {
    case JoinPlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case JoinPlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case JoinPlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        subplaylistError: action.subplaylistError,
      };
    case JoinPlaylistModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        playlist: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
        subplaylistError: null,
      };
    default:
      return state;
  }
};

export {
  JoinPlaylistModalStateActionTypes,
  joinPlaylistModalStateInit,
  joinPlaylistModalReducer,
};

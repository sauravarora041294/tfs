import * as DataTypes from "data/types";

interface DeletePlaylistModalState {
  playlist: DataTypes.Playlist;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum DeletePlaylistModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface DeletePlaylistModalStateAction {
  type: DeletePlaylistModalStateActionTypes;
  submissionError?: Error;
}

const deletePlaylistModalStateInit = (
  initialState: DeletePlaylistModalState,
): DeletePlaylistModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const deletePlaylistModalReducer = (
  state: DeletePlaylistModalState,
  action: DeletePlaylistModalStateAction,
): DeletePlaylistModalState => {
  switch (action.type) {
    case DeletePlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case DeletePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case DeletePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case DeletePlaylistModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        playlist: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  DeletePlaylistModalStateActionTypes,
  deletePlaylistModalStateInit,
  deletePlaylistModalReducer,
};

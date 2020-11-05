import * as DataTypes from "data/types";

interface EditPlaylistInfoModalState {
  playlist: DataTypes.Playlist;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum EditPlaylistInfoModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface EditPlaylistInfoModalStateAction {
  type: EditPlaylistInfoModalStateActionTypes;
  submissionError?: Error;
}

const editPlaylistStateInit = (
  initialState: EditPlaylistInfoModalState,
): EditPlaylistInfoModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
  ...initialState,
});

const editPlaylistReducer = (
  state: EditPlaylistInfoModalState,
  action: EditPlaylistInfoModalStateAction,
): EditPlaylistInfoModalState => {
  switch (action.type) {
    case EditPlaylistInfoModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case EditPlaylistInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case EditPlaylistInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case EditPlaylistInfoModalStateActionTypes.CLEAR_MODAL_DATA:
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
  EditPlaylistInfoModalStateActionTypes,
  editPlaylistStateInit,
  editPlaylistReducer,
};

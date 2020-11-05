import * as DataTypes from "data/types";

interface DeletePlaylistSectionModalState {
  section: DataTypes.Section;
  playlist: DataTypes.Playlist;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum DeletePlaylistSectionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface DeletePlaylistSectionModalStateAction {
  type: DeletePlaylistSectionModalStateActionTypes;
  submissionError?: Error;
}

const deletePlaylistSectionModalStateInit = (
  initialState: DeletePlaylistSectionModalState,
): DeletePlaylistSectionModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const deletePlaylistSectionModalReducer = (
  state: DeletePlaylistSectionModalState,
  action: DeletePlaylistSectionModalStateAction,
): DeletePlaylistSectionModalState => {
  switch (action.type) {
    case DeletePlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case DeletePlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case DeletePlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case DeletePlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        section: null,
        playlist: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  DeletePlaylistSectionModalStateActionTypes,
  deletePlaylistSectionModalStateInit,
  deletePlaylistSectionModalReducer,
};

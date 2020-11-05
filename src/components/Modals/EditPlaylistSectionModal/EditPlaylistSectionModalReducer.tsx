import * as DataTypes from "data/types";

interface EditPlaylistSectionModalState {
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum EditPlaylistSectionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface EditPlaylistSectionModalStateAction {
  type: EditPlaylistSectionModalStateActionTypes;
  submissionError?: Error;
}

const editPlaylistSectionStateInit = (
  initialState: EditPlaylistSectionModalState,
): EditPlaylistSectionModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const editPlaylistSectionReducer = (
  state: EditPlaylistSectionModalState,
  action: EditPlaylistSectionModalStateAction,
): EditPlaylistSectionModalState => {
  switch (action.type) {
    case EditPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case EditPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case EditPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case EditPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        playlist: null,
        sectionIndex: null,
        sectionData: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  EditPlaylistSectionModalStateActionTypes,
  editPlaylistSectionStateInit,
  editPlaylistSectionReducer,
};

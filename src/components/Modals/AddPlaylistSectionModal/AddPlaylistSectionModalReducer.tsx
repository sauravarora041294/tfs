import * as DataTypes from "data/types";

interface AddPlaylistSectionModalState {
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum AddPlaylistSectionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface AddPlaylistSectionModalStateAction {
  type: AddPlaylistSectionModalStateActionTypes;
  submissionError?: Error;
}

const addPlaylistSectionStateInit = (
  initialState: AddPlaylistSectionModalState,
): AddPlaylistSectionModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const addPlaylistSectionReducer = (
  state: AddPlaylistSectionModalState,
  action: AddPlaylistSectionModalStateAction,
): AddPlaylistSectionModalState => {
  switch (action.type) {
    case AddPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case AddPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case AddPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case AddPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA:
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
  AddPlaylistSectionModalStateActionTypes,
  addPlaylistSectionStateInit,
  addPlaylistSectionReducer,
};

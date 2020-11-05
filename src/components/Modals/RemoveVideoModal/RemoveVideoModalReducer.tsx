import * as DataTypes from "data/types";

interface RemoveVideoModalState {
  resource: DataTypes.Resource;
  section: DataTypes.Section;
  playlistId: string;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum RemoveVideoModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface RemoveVideoModalStateAction {
  type: RemoveVideoModalStateActionTypes;
  submissionError?: Error;
}

const removeVideoModalStateInit = (
  initialState: RemoveVideoModalState,
): RemoveVideoModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const removeVideoModalReducer = (
  state: RemoveVideoModalState,
  action: RemoveVideoModalStateAction,
): RemoveVideoModalState => {
  switch (action.type) {
    case RemoveVideoModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case RemoveVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case RemoveVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case RemoveVideoModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        resource: null,
        section: null,
        playlistId: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  RemoveVideoModalStateActionTypes,
  removeVideoModalStateInit,
  removeVideoModalReducer,
};

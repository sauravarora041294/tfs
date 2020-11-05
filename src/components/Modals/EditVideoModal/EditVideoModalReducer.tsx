import * as DataTypes from "data/types";

interface EditVideoModalState {
  resource: DataTypes.Resource;
  videoDuration?: number;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum EditVideoModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  SET_VIDEO_DURATION = "SET_VIDEO_DURATION",
}

interface EditVideoModalStateAction {
  type: EditVideoModalStateActionTypes;
  videoDuration?: number;
  submissionError?: Error;
}

const editVideoStateInit = (
  initialState: EditVideoModalState,
): EditVideoModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  videoDuration: null,
  submissionError: null,
  ...initialState,
});

const editVideoReducer = (
  state: EditVideoModalState,
  action: EditVideoModalStateAction,
): EditVideoModalState => {
  switch (action.type) {
    case EditVideoModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case EditVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case EditVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case EditVideoModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        resource: null,
        videoDuration: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    case EditVideoModalStateActionTypes.SET_VIDEO_DURATION:
      return { ...state, videoDuration: action.videoDuration };
    default:
      return state;
  }
};

export { EditVideoModalStateActionTypes, editVideoStateInit, editVideoReducer };

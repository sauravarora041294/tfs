import * as DataTypes from "data/types";

interface JoinMissionModalState {
  mission: DataTypes.Mission;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum JoinMissionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface JoinMissionModalStateAction {
  type: JoinMissionModalStateActionTypes;
  submissionError?: Error;
}

const joinMissionModalStateInit = (
  initialState: JoinMissionModalState,
): JoinMissionModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const joinMissionModalReducer = (
  state: JoinMissionModalState,
  action: JoinMissionModalStateAction,
): JoinMissionModalState => {
  switch (action.type) {
    case JoinMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case JoinMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case JoinMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case JoinMissionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        mission: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: null,
      };
    default:
      return state;
  }
};

export {
  JoinMissionModalStateActionTypes,
  joinMissionModalStateInit,
  joinMissionModalReducer,
};

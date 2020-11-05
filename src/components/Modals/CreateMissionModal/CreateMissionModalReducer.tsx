import * as DataTypes from "data/types";

interface CreatorMissionModalState {
  mission?: DataTypes.Mission;
  savedMissionId?: string;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum CreatorMissionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface CreatorMissionModalStateAction {
  type: CreatorMissionModalStateActionTypes;
  submissionError?: Error;
  savedMissionId?: string;
}

const createMissionStateInit = (
  initialState: CreatorMissionModalState,
): CreatorMissionModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const createMissionReducer = (
  state: CreatorMissionModalState,
  action: CreatorMissionModalStateAction,
): CreatorMissionModalState => {
  switch (action.type) {
    case "BEGIN_FORM_SUBMISSION":
      return { ...state, isSubmittingForm: true };
    case "FINISHED_FORM_SUBMISSION_SUCCESSFULLY":
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: true,
        savedMissionId: action.savedMissionId,
      };
    case "FINISHED_FORM_SUBMISSION_WITH_ERROR":
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case "CLEAR_MODAL_DATA":
      return { isSubmittingForm: false, successfullySubmitted: false };
    default:
      return state;
  }
};

export {
  CreatorMissionModalStateActionTypes,
  createMissionStateInit,
  createMissionReducer,
};

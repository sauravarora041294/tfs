import * as DataTypes from "data/types";

interface DeleteMissionModalState {
  mission: DataTypes.Mission;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum DeleteMissionModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface DeleteMissionModalStateAction {
  type: DeleteMissionModalStateActionTypes;
  submissionError?: Error;
}

const deleteMissionModalStateInit = (
  initialState: DeleteMissionModalState,
): DeleteMissionModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const deleteMissionModalReducer = (
  state: DeleteMissionModalState,
  action: DeleteMissionModalStateAction,
): DeleteMissionModalState => {
  switch (action.type) {
    case DeleteMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case DeleteMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case DeleteMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case DeleteMissionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        mission: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  DeleteMissionModalStateActionTypes,
  deleteMissionModalStateInit,
  deleteMissionModalReducer,
};

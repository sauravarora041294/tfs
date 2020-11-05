import * as DataTypes from "data/types";

interface EditMissionInfoModalState {
  mission: DataTypes.Mission;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum EditMissionInfoModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface EditMissionInfoModalStateAction {
  type: EditMissionInfoModalStateActionTypes;
  submissionError?: Error;
}

const editMissionStateInit = (
  initialState: EditMissionInfoModalState,
): EditMissionInfoModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
  ...initialState,
});

const editMissionReducer = (
  state: EditMissionInfoModalState,
  action: EditMissionInfoModalStateAction,
): EditMissionInfoModalState => {
  switch (action.type) {
    case EditMissionInfoModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case EditMissionInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case EditMissionInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case EditMissionInfoModalStateActionTypes.CLEAR_MODAL_DATA:
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
  EditMissionInfoModalStateActionTypes,
  editMissionStateInit,
  editMissionReducer,
};

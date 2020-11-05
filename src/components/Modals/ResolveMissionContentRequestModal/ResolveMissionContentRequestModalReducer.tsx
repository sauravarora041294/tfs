import * as DataTypes from "data/types";

interface ResolveMissionContentRequestModalState {
  contentRequest: DataTypes.ContentRequest;
  missionResources: Array<DataTypes.Resource>;
  missionPlaylists: Array<DataTypes.Playlist>;
  currentUser: DataTypes.Creator;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
  formData?: any;
}

enum ResolveMissionContentRequestModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  SET_FORM_DATA = "SET_FORM_DATA",
}

interface ResolveMissionContentRequestStateAction {
  type: ResolveMissionContentRequestModalStateActionTypes;
  submissionError?: Error;
  formData?: any;
}

const resolveMissionContentRequestModalStateInit = (
  initialState: ResolveMissionContentRequestModalState,
): ResolveMissionContentRequestModalState => ({
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
  formData: { contentIds: [], reviewDetails: "" },
  ...initialState,
});

const resolveMissionContentRequestModalReducer = (
  state: ResolveMissionContentRequestModalState,
  action: ResolveMissionContentRequestStateAction,
): ResolveMissionContentRequestModalState => {
  switch (action.type) {
    case "BEGIN_FORM_SUBMISSION":
      return { ...state, isSubmittingForm: true };
    case "FINISHED_FORM_SUBMISSION_SUCCESSFULLY":
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: true,
      };
    case "FINISHED_FORM_SUBMISSION_WITH_ERROR":
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case ResolveMissionContentRequestModalStateActionTypes.SET_FORM_DATA:
      return { ...state, formData: action.formData };
    case "CLEAR_MODAL_DATA":
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  ResolveMissionContentRequestModalStateActionTypes,
  resolveMissionContentRequestModalStateInit,
  resolveMissionContentRequestModalReducer,
};

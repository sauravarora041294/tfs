import * as DataTypes from "data/types";

interface DeleteResourceModalState {
  resource: DataTypes.Resource;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  subresourceError?: Error;
}

enum DeleteResourceModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
}

interface DeleteResourceModalStateAction {
  type: DeleteResourceModalStateActionTypes;
  subresourceError?: Error;
}

const deleteResourceModalStateInit = (
  initialState: DeleteResourceModalState,
): DeleteResourceModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  subresourceError: null,
});

const deleteResourceModalReducer = (
  state: DeleteResourceModalState,
  action: DeleteResourceModalStateAction,
): DeleteResourceModalState => {
  switch (action.type) {
    case DeleteResourceModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case DeleteResourceModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case DeleteResourceModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        subresourceError: action.subresourceError,
      };
    case DeleteResourceModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        resource: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    default:
      return state;
  }
};

export {
  DeleteResourceModalStateActionTypes,
  deleteResourceModalStateInit,
  deleteResourceModalReducer,
};

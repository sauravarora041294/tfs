import * as DataTypes from "data/types";
import { ContactFormData } from "./CreatorsHubInfoContactFormCard.react";

interface CreatorsHubInfoState {
  currentUser: DataTypes.Creator;
  isSubmittingForm?: boolean;
  sucessfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  contactFormData?: ContactFormData;
}

enum CreatorsHubInfoStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
}

interface CreatorsHubInfoStateAction {
  type: CreatorsHubInfoStateActionTypes;
  submissionError?: Error;
  contactFormData?: ContactFormData;
}

const creatorsHubSInfoStateInit = (
  initialState: CreatorsHubInfoState,
): CreatorsHubInfoState => {
  return {
    ...initialState,
  };
};

const creatorsHubInfoReducer = (
  state: CreatorsHubInfoState,
  action: CreatorsHubInfoStateAction,
): CreatorsHubInfoState => {
  switch (action.type) {
    case CreatorsHubInfoStateActionTypes.BEGIN_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingForm: true,
        contactFormData: action.contactFormData,
      };
    case CreatorsHubInfoStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: false,
        formSubmissionError: action.submissionError,
      };
    case CreatorsHubInfoStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
        contactFormData: null,
      };
    default:
      return state;
  }
};

export {
  creatorsHubSInfoStateInit,
  creatorsHubInfoReducer,
  CreatorsHubInfoStateActionTypes,
};

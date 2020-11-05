import * as DataTypes from "data/types";

interface SubscriptionState {
  currentUser: DataTypes.User;
  currentPage?: number;
  formData?: FormData;
  isSubmittingForm?: boolean;
  successfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
}

enum SubscriptionStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  SET_FORM_DATA = "SET_FORM_DATA",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
}

interface SubscriptionStateAction {
  type: SubscriptionStateActionTypes;
  currentPage?: number;
  formData?: FormData;
  submissionError?: Error;
}

interface FormData {
  planCode: string;
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  expiryYear: string;
  firstNamePayment: string;
  lastNamePayment: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const formDataInit = {
  planCode: "",
  cardNumber: "",
  securityCode: "",
  expiryMonth: "",
  expiryYear: "",
  firstNamePayment: "",
  lastNamePayment: "",
  country: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const subscriptionStateInit = (
  initialState: SubscriptionState,
): SubscriptionState => ({
  ...initialState,
  currentUser: null,
  currentPage: 0,
  formData: formDataInit,
  isSubmittingForm: false,
  successfullySubmittedForm: false,
  formSubmissionError: null,
});

const subscriptionReducer = (
  state: SubscriptionState,
  action: SubscriptionStateAction,
): SubscriptionState => {
  switch (action.type) {
    case SubscriptionStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case SubscriptionStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: false,
        formSubmissionError: action.submissionError,
      };
    case SubscriptionStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: true,
      };
    case SubscriptionStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case SubscriptionStateActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};

export {
  SubscriptionStateActionTypes,
  subscriptionStateInit,
  subscriptionReducer,
};

interface FormData {
  password: string;
  email: string;
}

const formDataInitialState = {
  password: "",
  email: "",
};

interface LoginEmployeeState {
  isSubmittingForm?: boolean;
  sucessfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  formData?: FormData;
}

enum LoginEmployeeStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
}

interface LoginEmployeeStateAction {
  type: LoginEmployeeStateActionTypes;
  submissionError?: Error;
  formData?: FormData;
}

const loginEmployeeInit = (initialState: LoginEmployeeState) => {
  return {
    ...initialState,
    isSubmittingForm: false,
    successfullySubmittedForm: false,
    formData: formDataInitialState,
  };
};

const loginEmployeeReducer = (
  state: LoginEmployeeState,
  action: LoginEmployeeStateAction,
): LoginEmployeeState => {
  switch (action.type) {
    case LoginEmployeeStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case LoginEmployeeStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case LoginEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
      };
    case LoginEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: false,
        formSubmissionError: action.submissionError,
      };
    default:
      return state;
  }
};

export {
  LoginEmployeeStateActionTypes,
  loginEmployeeReducer,
  loginEmployeeInit,
};

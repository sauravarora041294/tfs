interface FormData {
  email: string;
  password: string;
}
const formDataInitialState = {
  email: "",
  password: "",
};

interface LoginState {
  isSubmittingForm?: boolean;
  sucessfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  formData?: FormData;
}

enum LoginStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
}

interface LoginStateAction {
  type: LoginStateActionTypes;
  submissionError?: Error;
  formData?: FormData;
}

const loginStateInit = (initialState: LoginState): LoginState => ({
  ...initialState,
  isSubmittingForm: false,
  formData: formDataInitialState,
});

const loginReducer = (
  state: LoginState,
  action: LoginStateAction,
): LoginState => {
  switch (action.type) {
    case LoginStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case LoginStateActionTypes.BEGIN_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingForm: true,
      };
    case LoginStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
      };
    case LoginStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
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

export { LoginStateActionTypes, loginStateInit, loginReducer };

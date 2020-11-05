interface FormData {
  password: string;
  email: string;
}

const formDataInitialState = {
  password: "",
  email: "",
};

interface LoginCreatorState {
  isSubmittingForm?: boolean;
  sucessfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  formData?: FormData;
}

enum LoginCreatorStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
}

interface LoginCreatorStateAction {
  type: LoginCreatorStateActionTypes;
  submissionError?: Error;
  formData?: FormData;
}

const loginCreatorInit = (initialState: LoginCreatorState) => {
  return {
    ...initialState,
    isSubmittingForm: false,
    successfullySubmittedForm: false,
    formData: formDataInitialState,
  };
};
const loginCreatorReducer = (
  state: LoginCreatorState,
  action: LoginCreatorStateAction,
): LoginCreatorState => {
  switch (action.type) {
    case LoginCreatorStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case LoginCreatorStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case LoginCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
      };
    case LoginCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
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

export { LoginCreatorStateActionTypes, loginCreatorReducer, loginCreatorInit };

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
const formDataInitialState = {
  email: "",
  lastName: "",
  firstName: "",
  password: "",
};
interface SignupState {
  isSubmittingForm?: boolean;
  formSubmissionError?: Error;
  sucessfullySubmittedForm?: boolean;
  formData?: FormData;
}

enum SignupStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
}

interface SignupStateAction {
  type: SignupStateActionTypes;
  submissionError?: Error;
  formData?: FormData;
}

const signupStateInit = (initialState: SignupState): SignupState => ({
  ...initialState,
  isSubmittingForm: false,
  formData: formDataInitialState,
});

const signupReducer = (
  state: SignupState,
  action: SignupStateAction,
): SignupState => {
  switch (action.type) {
    case SignupStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case SignupStateActionTypes.BEGIN_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingForm: true,
      };
    case SignupStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
      };
    case SignupStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
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

export { SignupStateActionTypes, signupStateInit, signupReducer };

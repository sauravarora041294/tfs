interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const formDataInitialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

interface RegisterCreatorState {
  isSubmittingForm?: boolean;
  successfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  formData?: FormData;
}

enum RegisterCreatorStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  SET_FORM_DATA = "SET_FORM_DATA",
}

interface RegisterCreatorStateAction {
  type: RegisterCreatorStateActionTypes;
  formSubmissionError?: Error;
  formData?: FormData;
}
const registerCreatorInit = (
  initialState: RegisterCreatorState,
): RegisterCreatorState => {
  return {
    ...initialState,
    isSubmittingForm: false,
    successfullySubmittedForm: false,
    formData: formDataInitialState,
  };
};
const registerCreatorReducer = (
  state: RegisterCreatorState,
  action: RegisterCreatorStateAction,
): RegisterCreatorState => {
  switch (action.type) {
    case RegisterCreatorStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case RegisterCreatorStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case RegisterCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: true,
      };
    case RegisterCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: false,
        formSubmissionError: action.formSubmissionError,
      };
    default:
      return state;
  }
};

export {
  RegisterCreatorStateActionTypes,
  registerCreatorReducer,
  registerCreatorInit,
};

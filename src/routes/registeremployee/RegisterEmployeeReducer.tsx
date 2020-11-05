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

interface RegisterEmployeeState {
  isSubmittingForm?: boolean;
  successfullySubmittedForm?: boolean;
  formSubmissionError?: Error;
  formData?: FormData;
}

enum RegisterEmployeeStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  SET_FORM_DATA = "SET_FORM_DATA",
}

interface RegisterEmployeeStateAction {
  type: RegisterEmployeeStateActionTypes;
  formSubmissionError?: Error;
  formData?: FormData;
}

const registerEmployeeInit = (
  initialState: RegisterEmployeeState,
): RegisterEmployeeState => {
  return {
    ...initialState,
    isSubmittingForm: false,
    successfullySubmittedForm: false,
    formData: formDataInitialState,
    formSubmissionError: null,
  };
};

const registerEmployeeReducer = (
  state: RegisterEmployeeState,
  action: RegisterEmployeeStateAction,
): RegisterEmployeeState => {
  switch (action.type) {
    case RegisterEmployeeStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case RegisterEmployeeStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case RegisterEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmittedForm: true,
      };
    case RegisterEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
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
  RegisterEmployeeStateActionTypes,
  registerEmployeeReducer,
  registerEmployeeInit,
};

import * as DataTypes from "data/types";

interface FormData {
  title: string;
  company: string;
  linkedin: string;
  venmoHandle: string;
  bio: string;
  profilePicture: File;
  resume: File;
  skillTitles: Array<string>;
  justifications: Array<string>;
}

const formDataInitialState = {
  title: "",
  company: "",
  linkedin: "",
  venmoHandle: "",
  bio: "",
  profilePicture: null,
  resume: null,
  skillTitles: [],
  justifications: [],
};

interface AddCreatorDetailsState {
  currentUser: DataTypes.User;
  windowLocation: Object;
  isSubmittingForm?: boolean;
  sucessfullySubmittedForm?: boolean;
  formSubmissionError?: string;
  formData?: FormData;
}

enum AddCreatorDetailsStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  SET_FORM_SUBMISSION_ERROR_MESSAGE = "SET_FORM_SUBMISSION_ERROR_MESSAGE",
}

interface AddCreatorDetailsStateAction {
  type: AddCreatorDetailsStateActionTypes;
  formSubmissionError?: string;
  formData?: FormData;
}

const addCreatorDetailsInit = (initialState: AddCreatorDetailsState) => {
  return { ...initialState, formData: formDataInitialState };
};
const addCreatorDetailsReducer = (
  state: AddCreatorDetailsState,
  action: AddCreatorDetailsStateAction,
): AddCreatorDetailsState => {
  switch (action.type) {
    case AddCreatorDetailsStateActionTypes.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.formData,
        },
      };
    case AddCreatorDetailsStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case AddCreatorDetailsStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: false,
        formSubmissionError: action.formSubmissionError,
      };
    case AddCreatorDetailsStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingForm: false,
        sucessfullySubmittedForm: true,
      };
    case AddCreatorDetailsStateActionTypes.SET_FORM_SUBMISSION_ERROR_MESSAGE:
      return {
        ...state,
        formSubmissionError: action.formSubmissionError
      }
    default:
      return state;
  }
};

export {
  AddCreatorDetailsStateActionTypes,
  addCreatorDetailsReducer,
  addCreatorDetailsInit,
};

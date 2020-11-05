interface ProfileInfoAction {
  type: string;
  submissionErrors?: any;
  defaultEmail?: string;
}
enum ProfileInfoActionTypes {
  BEGIN_PROFILE_INFO_FORM_SUBMISSION = "BEGIN_PROFILE_INFO_FORM_SUBMISSION",
  FINISHED_PROFILE_INFO_UPDATION_WITH_ERROR = "FINISHED_PROFILE_INFO_UPDATION_WITH_ERROR",
  FINISHED_UPDATE_PROFILE_INFO_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_UPDATE_PROFILE_INFO_FORM_SUBMISSION_SUCCESSFULLY",
  UPDATE_DEFAULT_EMAIL = "UPDATE_DEFAULT_EMAIL",
}
interface ProfileInfoState {
  email?: string;
  updateProfileInfoFormSubmissionErrors?: Array<string>;
  isSubmittingProfileInfoForm?: boolean;
  successfullySubmittedUpdateProfileInfoForm?: boolean;
  defaultEmail?: string;
}
const profileInfoInitialState = {
  email: "",
  successfullySubmittedUpdateProfileInfoForm: false,
  isSubmittingProfileInfoForm: false,
  updateProfileInfoFormSubmissionErrors: null,
  defaultEmail: "",
};

const profileInfoInit = (initialState: ProfileInfoState): ProfileInfoState => {
  return {
    ...profileInfoInitialState,
    ...initialState,
  };
};

const profileInfoReducer = (
  state: ProfileInfoState,
  action: ProfileInfoAction,
): ProfileInfoState => {
  switch (action.type) {
    case ProfileInfoActionTypes.UPDATE_DEFAULT_EMAIL:
      return {
        ...state,
        defaultEmail: action.defaultEmail,
      };
    case ProfileInfoActionTypes.BEGIN_PROFILE_INFO_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingProfileInfoForm: true,
        updateProfileInfoFormSubmissionErrors: null,
      };

    case ProfileInfoActionTypes.FINISHED_PROFILE_INFO_UPDATION_WITH_ERROR:
      return {
        ...state,
        updateProfileInfoFormSubmissionErrors: action.submissionErrors,
        isSubmittingProfileInfoForm: false,
        successfullySubmittedUpdateProfileInfoForm: false,
      };
    case ProfileInfoActionTypes.FINISHED_UPDATE_PROFILE_INFO_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingProfileInfoForm: false,
        successfullySubmittedUpdateProfileInfoForm: true,
      };
  }
};

export { ProfileInfoActionTypes, profileInfoInit, profileInfoReducer };

interface FormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
const formDataInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

enum ResetPasswordActionTypes {
  SET_SEND_RESET_LINK_FORM_ERROR = "SET_SEND_RESET_LINK_FORM_ERROR",
  SET_RESET_PASSWORD_FORM_ERROR = "SET_RESET_PASSWORD_FORM_ERROR",
  SHOW_SEND_RESET_LINK_SUCCESS_VIEW = "SHOW_SEND_RESET_LINK_SUCCESS_VIEW",
  SHOW_RESET_PASSWORD_SUCCESS_VIEW = "SHOW_RESET_PASSWORD_SUCCESS_VIEW",
  SET_IS_SUBMITTING_SEND_RESET_LINK_FORM = "SET_IS_SUBMITTING_SEND_RESET_LINK_FORM",
}

interface ResetPasswordState {
  isSubmittingSendResetLinkForm?: boolean;
  isSubmittingResetPasswordForm?: boolean;
  sendResetLinkFormError?: Error;
  resetPasswordFormError?: Error;
  showSendResetLinkFormView?: boolean;
  showSendResetLinkSuccessView?: boolean;
  showResetPasswordFormView?: boolean;
  showResetPasswordSuccessView?: boolean;
  passwordResetEmail?: string;
  formData?: FormData;
}

interface ResetPasswordAction {
  type: ResetPasswordActionTypes;
  sendResetLinkFormError?: Error;
  resetPasswordFormError?: Error;
  passwordResetEmail?: string;
  formData?: FormData;
  isSubmittingSendResetLinkForm?: boolean;
}

const resetPasswordStateInit = (
  initialState: ResetPasswordState,
): ResetPasswordState => ({
  ...initialState,
  isSubmittingSendResetLinkForm: false,
  isSubmittingResetPasswordForm: false,
  sendResetLinkFormError: null,
  resetPasswordFormError: null,
  showSendResetLinkSuccessView: false,
  showResetPasswordSuccessView: false,
  passwordResetEmail: null,
  formData: formDataInitialState,
});

const resetPasswordReducer = (
  state: ResetPasswordState,
  action: ResetPasswordAction,
): ResetPasswordState => {
  switch (action.type) {
    case ResetPasswordActionTypes.SET_SEND_RESET_LINK_FORM_ERROR:
      return {
        ...state,
        sendResetLinkFormError: action.sendResetLinkFormError,
      };
    case ResetPasswordActionTypes.SET_RESET_PASSWORD_FORM_ERROR:
      return {
        ...state,
        resetPasswordFormError: action.resetPasswordFormError,
      };
    case ResetPasswordActionTypes.SET_IS_SUBMITTING_SEND_RESET_LINK_FORM:
      return {
        ...state,
        isSubmittingSendResetLinkForm: action.isSubmittingSendResetLinkForm,
      };
    case ResetPasswordActionTypes.SHOW_SEND_RESET_LINK_SUCCESS_VIEW:
      return {
        ...state,
        showSendResetLinkFormView: false,
        showResetPasswordFormView: false,
        showResetPasswordSuccessView: false,
        showSendResetLinkSuccessView: true,
        passwordResetEmail: action.passwordResetEmail,
      };
    case ResetPasswordActionTypes.SHOW_RESET_PASSWORD_SUCCESS_VIEW:
      return {
        ...state,
        showResetPasswordFormView: false,
        showSendResetLinkFormView: false,
        showSendResetLinkSuccessView: false,
        showResetPasswordSuccessView: true,
      };
    default:
      return state;
  }
};

export {
  resetPasswordStateInit,
  resetPasswordReducer,
  ResetPasswordActionTypes,
};

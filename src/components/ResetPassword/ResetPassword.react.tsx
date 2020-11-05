import { Form, notification, message } from "antd";
import React, { MutableRefObject } from "react";
import {
  resetPasswordReducer,
  resetPasswordStateInit,
  ResetPasswordActionTypes,
} from "./ResetPasswordReducer";
import SendResetLinkForm from "./SendResetLinkForm.react";
import ResetPasswordForm from "./ResetPasswordForm.react";
import ResetPasswordFormSuccess from "./ResetPasswordFormSuccess.react";
import SendResetLinkFormSuccess from "./SendResetLinkFormSuccess.react";
import s from "./ResetPassword.module.scss";
import { sendPasswordResetEmail, resetPassword } from "FirebaseClient";
import { userExists } from "./ResetPasswordUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  isCreatorSide?: boolean;
  userEmail: string;
  showSendResetLinkFormView: boolean;
  showResetPasswordFormView: boolean;
  firebasePasswordResetActionCode: string;
  onPasswordResetSuccess: () => void;
  onResetLinkSentSuccess: () => void;
}

const ResetPassword: React.FC<Props> = (props: Props) => {
  const [resetPasswordState, dispatch] = React.useReducer(
    resetPasswordReducer,
    {
      showSendResetLinkFormView: props.showSendResetLinkFormView,
      showResetPasswordFormView: props.showResetPasswordFormView,
    },
    resetPasswordStateInit,
  );

  const sendResetLinkFormRef: MutableRefObject<any> = React.useRef();
  const SendResetLinkFormEnhanced = Form.create({
    name: "sendResetLinkForm",
  })(React.forwardRef(castFormToRefForwardingComponent(SendResetLinkForm)));

  const resetPasswordFormRef: MutableRefObject<any> = React.useRef();
  const ResetPasswordFormEnhanced = Form.create({
    name: "resetPasswordForm",
  })(React.forwardRef(castFormToRefForwardingComponent(ResetPasswordForm)));

  const handleSendResetLinkFormSubmit = async () => {
    sendResetLinkFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          try {
            dispatch({
              type:
                ResetPasswordActionTypes.SET_IS_SUBMITTING_SEND_RESET_LINK_FORM,
              isSubmittingSendResetLinkForm: true,
            });
            const validUserExists = await userExists(
              values.email,
              props.isCreatorSide,
            );
            if (!validUserExists.error) {
              await sendPasswordResetEmail(
                values.email,
                props.isCreatorSide
                  ? "http://creators.localhost.com:3000/resetpassword-creator"
                  : undefined,
              );
              dispatch({
                type:
                  ResetPasswordActionTypes.SHOW_SEND_RESET_LINK_SUCCESS_VIEW,
                passwordResetEmail: values.email,
              });
              dispatch({
                type:
                  ResetPasswordActionTypes.SET_IS_SUBMITTING_SEND_RESET_LINK_FORM,
                isSubmittingSendResetLinkForm: false,
              });
            } else {
              throw new Error(
                validUserExists.error.response &&
                  validUserExists.error.response.data &&
                  validUserExists.error.response.data.error
                  ? "The email you entered does not exist in our system."
                  : validUserExists.error.message ||
                  "Something went wrong,try again later",
              );
            }
          } catch (e) {
            dispatch({
              type: ResetPasswordActionTypes.SET_SEND_RESET_LINK_FORM_ERROR,
              sendResetLinkFormError: e,
            });
            dispatch({
              type:
                ResetPasswordActionTypes.SET_IS_SUBMITTING_SEND_RESET_LINK_FORM,
              isSubmittingSendResetLinkForm: false,
            });
          }
        }
      },
    );
  };

  const handleResetPasswordFormSubmit = async () => {
    resetPasswordFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          try {
            if (values.password !== values.confirmPassword) {
              throw new Error("The passwords you entered do not match.");
            }
            await resetPassword(
              props.firebasePasswordResetActionCode,
              values.password,
            );
            dispatch({
              type: ResetPasswordActionTypes.SHOW_RESET_PASSWORD_SUCCESS_VIEW,
            });
          } catch (e) {
            dispatch({
              type: ResetPasswordActionTypes.SET_RESET_PASSWORD_FORM_ERROR,
              resetPasswordFormError: e,
            });
          }
        }
      },
    );
  };

  const sendResetLinkForm = React.useMemo(() => {
    return resetPasswordState.showSendResetLinkFormView ? (
      <SendResetLinkFormEnhanced
        {...{
          ref: sendResetLinkFormRef,
          formError: resetPasswordState.sendResetLinkFormError,
          isSubmittingForm: resetPasswordState.isSubmittingSendResetLinkForm,
          formData: resetPasswordState.formData,
          sendPasswordResetEmail: handleSendResetLinkFormSubmit,
        }}
      />
    ) : null;
  }, [
    resetPasswordState.showSendResetLinkFormView,
    resetPasswordState.sendResetLinkFormError,
    resetPasswordState.isSubmittingSendResetLinkForm,
    resetPasswordState.formData,
    handleSendResetLinkFormSubmit,
  ]);

  const sendResetLinkFormSuccessView = React.useMemo(() => {
    return resetPasswordState.showSendResetLinkSuccessView ? (
      <SendResetLinkFormSuccess
        onNextClick={props.onResetLinkSentSuccess}
        email={resetPasswordState.passwordResetEmail}
      />
    ) : null;
  }, [
    resetPasswordState.showSendResetLinkSuccessView,
    resetPasswordState.passwordResetEmail,
  ]);

  const resetPasswordForm = React.useMemo(() => {
    return resetPasswordState.showResetPasswordFormView ? (
      <ResetPasswordFormEnhanced
        {...{
          ref: resetPasswordFormRef,
          formError: resetPasswordState.resetPasswordFormError,
          isSubmittingForm: resetPasswordState.isSubmittingResetPasswordForm,
          formData: resetPasswordState.formData,
          currentUserEmail: props.userEmail,
          resetPassword: handleResetPasswordFormSubmit,
        }}
      />
    ) : null;
  }, [
    resetPasswordState.showResetPasswordFormView,
    resetPasswordState.resetPasswordFormError,
    resetPasswordState.isSubmittingResetPasswordForm,
    props.userEmail,
    handleResetPasswordFormSubmit,
  ]);

  const resetPasswordSuccessView = React.useMemo(() => {
    return resetPasswordState.showResetPasswordSuccessView ? (
      <ResetPasswordFormSuccess
        onNextClick={props.onPasswordResetSuccess}
        email={props.userEmail}
      />
    ) : null;
  }, [
    resetPasswordState.showResetPasswordSuccessView,
    resetPasswordState.passwordResetEmail,
  ]);

  return (
    <div className={s.resetPasswordView}>
      {sendResetLinkForm}
      {sendResetLinkFormSuccessView}
      {resetPasswordForm}
      {resetPasswordSuccessView}
    </div>
  );
};

export default ResetPassword;

import { Form, notification, message } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import ResetPassword from "components/ResetPassword";
import {
  resetPasswordReducer,
  resetPasswordStateInit,
} from "./ResetPasswordReducer";
import s from "./ResetPassword.module.scss";

interface Props {
  history?: History;
  error?: Error;
  userEmail?: string;
  showSendResetLinkFormView?: boolean;
  showResetPasswordFormView?: boolean;
  firebasePasswordResetActionCode?: string;
}

const ResetPasswordView: React.FC<Props> = (props: Props) => {
  const [resetPasswordState, dispatch] = React.useReducer(
    resetPasswordReducer,
    {
      showSendResetLinkFormView: props.showSendResetLinkFormView,
      showResetPasswordFormView: props.showResetPasswordFormView,
    },
    resetPasswordStateInit,
  );

  return (
    <div className={s.resetPasswordView}>
      <ResetPassword
        onPasswordResetSuccess={() => props.history.push("/login")}
        onResetLinkSentSuccess={() => props.history.push("/")}
        isCreatorSide={false}
        userEmail={props.userEmail}
        showSendResetLinkFormView={props.showSendResetLinkFormView}
        showResetPasswordFormView={props.showResetPasswordFormView}
        firebasePasswordResetActionCode={props.firebasePasswordResetActionCode}
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(ResetPasswordView);

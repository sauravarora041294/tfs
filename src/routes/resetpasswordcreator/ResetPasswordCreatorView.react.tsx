import { Form, notification, message } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import ResetPassword from "components/ResetPassword";
import {
  resetPasswordCreatorReducer,
  resetPasswordCreatorStateInit,
} from "./ResetPasswordCreatorReducer";
import s from "./ResetPasswordCreator.module.scss";

interface Props {
  history?: History;
  error?: Error;
  userEmail?: string;
  showSendResetLinkFormView?: boolean;
  showResetPasswordFormView?: boolean;
  firebasePasswordResetActionCode?: string;
}

const ResetPasswordCreatorView: React.FC<Props> = (props: Props) => {
  const [resetPasswordCreatorState, dispatch] = React.useReducer(
    resetPasswordCreatorReducer,
    {
      showSendResetLinkFormView: props.showSendResetLinkFormView,
      showResetPasswordFormView: props.showResetPasswordFormView,
    },
    resetPasswordCreatorStateInit,
  );

  return (
    <div className={s.resetPasswordCreatorView}>
      <ResetPassword
        onPasswordResetSuccess={() => props.history.push("/login-creator")}
        onResetLinkSentSuccess={() => props.history.push("/")}
        isCreatorSide={true}
        userEmail={props.userEmail}
        showSendResetLinkFormView={props.showSendResetLinkFormView}
        showResetPasswordFormView={props.showResetPasswordFormView}
        firebasePasswordResetActionCode={props.firebasePasswordResetActionCode}
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(ResetPasswordCreatorView);

import { Result, Button } from "antd";
import React from "react";
import s from "./ResetPassword.module.scss";

interface Props {
  email: string;
  onNextClick: () => void;
}

const ResetPasswordSendResetLinkFormSuccess: React.FC<Props> = (
  props: Props,
) => {
  return (
    <Result
      className={s.sendResetLinkFormSuccessCard}
      status="success"
      title={"Successfully sent password reset link!"}
      subTitle={`An email has been sent to ${props.email} containing instructions to reset your password.`}
      extra={[
        <Button onClick={props.onNextClick} type="primary" key="console">
          Go Home
        </Button>,
      ]}
    />
  );
};

export default ResetPasswordSendResetLinkFormSuccess;

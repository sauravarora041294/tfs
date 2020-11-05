import { Result, Button } from "antd";
import React from "react";
import s from "./ResetPassword.module.scss";

interface Props {
  email: string;
  onNextClick: () => void;
}

const ResetPasswordFormSuccess: React.FC<Props> = (props: Props) => {
  return (
    <Result
      className={s.sendResetLinkFormSuccessCard}
      status="success"
      title={"Successfully reset password!"}
      subTitle={`The password for ${props.email} has been reset. You may now use your new password to login at the link below.`}
      extra={[
        <Button onClick={props.onNextClick} type="primary" key="console">
          Login
        </Button>,
      ]}
    />
  );
};

export default ResetPasswordFormSuccess;

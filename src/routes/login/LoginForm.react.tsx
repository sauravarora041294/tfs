import { Alert, Divider, Form, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import { Link } from "react-router-dom";
import s from "./Login.module.scss";
import atr from "assets/atTheRate.svg";
import lock from "assets/passswordLock.svg";
import google from "assets/googleIcon.svg";
import fb from "assets/fbIcon.svg";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";
import ThirdPartyLoginButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/ThirdPartyLoginButton";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";

const smallIconStyle = {
  height: "14px",
  width: "14px",
};
const atTheRate = () => <img style={smallIconStyle} src={atr} />;
const pass = () => <img style={smallIconStyle} src={lock} />;
const googleIcon = () => <img style={smallIconStyle} src={google} />;
const fbIcon = () => <img style={smallIconStyle} src={fb} />;

interface detailsFormError {
  message: string;
}
interface FormData {
  email: string;
  password: string;
}
interface Props extends FormComponentProps {
  continueWithFacebook: () => void;
  continueWithGoogle: () => void;
  loginWithEmailAndPassword: () => void;
  isSubmittingForm: boolean;
  detailsFormError: detailsFormError;
  formData: FormData;
  handleBack?: (e) => void;
}

const LoginForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.loginWithEmailAndPassword();
  };

  return (
    <div className={s.loginForm}>
      <div className={"backButton"} onClick={props.handleBack}>
        <Icon type="arrow-left" /> &nbsp; Back{" "}
      </div>
      <div className={s.formCardTitle}>Login</div>
      <div className={s.formCardSubTitle}>
        Sign in with your username or email and password
      </div>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Item>
          {props.form.getFieldDecorator("email", {
            initialValue: props.formData.email,
            rules: [
              {
                required: true,
                message: "Please provide your email address.",
                whitespace: true,
              },
            ],
          })(
            <TextInputField
              placeholder="Email"
              type="email"
              autoComplete="username"
              suffix={<Icon style={{ opacity: "0.6" }} component={atTheRate} />}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("password", {
            initialValue: props.formData.password,
            rules: [
              {
                required: true,
                message: "Please provide a password.",
                whitespace: true,
              },
            ],
          })(
            <TextInputField
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              suffix={<Icon style={{ opacity: "0.6" }} component={pass} />}
            />,
          )}
        </Form.Item>
        {props.detailsFormError ? (
          <Alert
            className={s.alertMessage}
            message="Sign In Failed"
            description={props.detailsFormError.message}
            type="error"
          />
        ) : null}
        <Form.Item>
          <SubmitButton type="primary" loading={props.isSubmittingForm}>
            {"Sign In"}
          </SubmitButton>
        </Form.Item>
      </Form>

      <Divider>{"OR"}</Divider>

      <div className={`${s.thirdPartyAuthContainer} loginPageAuthContainer`}>
        <ThirdPartyLoginButton onClick={props.continueWithGoogle}>
          <Icon component={googleIcon} />
          {"Sign In with Google"}
        </ThirdPartyLoginButton>
        <ThirdPartyLoginButton onClick={props.continueWithFacebook}>
          <Icon component={fbIcon} />
          {"Sign In with Facebook"}
        </ThirdPartyLoginButton>
      </div>
      <div className={s.loginFormFooter}>
        <div className={s.forgotPasswordText}>
          <Link to={"/resetpassword"}>{"Forgot password?"}</Link>
        </div>

        <div className={s.alreadyHaveAccountText}>
          {"Need an account? "}
          <Link
            to={`/signup?redirect=${new URLSearchParams(
              window.location.search,
            ).get("redirect") || ""}`}
          >
            {" Sign up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

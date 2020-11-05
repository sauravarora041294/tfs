import { Alert, Button, Card, Divider, Form, Icon, Typography } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import { Link } from "react-router-dom";
import s from "./LoginCreator.module.scss";
import AuthPageWelcomeSection from "components/AuthPageWelcomeSection";
import google from "assets/googleIcon.svg";
import fb from "assets/fbIcon.svg";
import { useHistory } from "react-router-dom";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";
import ThirdPartyLoginButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/ThirdPartyLoginButton";
import atTheRateIcon from "assets/atTheRate.svg";
import lockIcon from "assets/passswordLock.svg";

const smallIconStyle = {
  height: "14px",
  width: "14px",
};

const googleIcon = () => <img style={smallIconStyle} src={google} />;
const fbIcon = () => <img style={smallIconStyle} src={fb} />;
const atTheRate = () => <img style={smallIconStyle} src={atTheRateIcon} />;
const lockComponent = () => <img style={smallIconStyle} src={lockIcon} />;

interface detailsFormError {
  message: string;
}
interface FormData {
  email: string;
  password: String;
}
interface Props extends FormComponentProps {
  continueWithFacebook: () => void;
  continueWithGoogle: () => void;
  loginWithEmailAndPassword: () => void;
  isSubmittingForm: boolean;
  detailsFormError: detailsFormError;
  formData?: FormData;
}

const CreatorLoginForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    props.loginWithEmailAndPassword();
  };

  return (
    <div className={s.loginRoot}>
      <AuthPageWelcomeSection />
      <div className={s.formWrapper}>
        <div className={s.loginForm}>
          <div className={"backButton"} onClick={() => history.goBack()}>
            <Icon type="arrow-left" /> &nbsp; Back{" "}
          </div>

          <div className={s.formCardTitle}>Login</div>
          <div className={s.formCardSubTitle}>
            Sign in with your username or email and password
          </div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Item>
              {props.form.getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please provide your email address.",
                    whitespace: true,
                  },
                ],
                initialValue: props.formData.email,
              })(
                <TextInputField
                  placeholder="Email"
                  type="email"
                  autoComplete="username"
                  suffix={
                    <Icon style={{ opacity: "0.6" }} component={atTheRate} />
                  }
                />,
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please provide a password.",
                    whitespace: true,
                  },
                ],
                initialValue: props.formData.password,
              })(
                <TextInputField
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  suffix={
                    <Icon
                      style={{ opacity: "0.6" }}
                      component={lockComponent}
                    />
                  }
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
          <div
            className={`${s.thirdPartyAuthContainer} loginPageAuthContainer`}
          >
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
              <Link to={"/resetpassword-creator"}>{"Forgot password?"}</Link>
            </div>

            <div className={s.alreadyHaveAccountText}>
              {"Need an account? "}
              <Link to={"/register-creator"}>{" Sign up"}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorLoginForm;

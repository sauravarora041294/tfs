import { Alert, Divider, Form, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import google from "assets/googleIcon.svg";
import fb from "assets/fbIcon.svg";
import s from "./RegisterEmployee.module.scss";
import AuthPageWelcomeSection from "components/AuthPageWelcomeSection";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";
import ThirdPartyLoginButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/ThirdPartyLoginButton";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";

const smallIconStyle = {
  height: "14px",
  width: "14px",
};

const googleIcon = () => <img style={smallIconStyle} src={google} />;
const fbIcon = () => <img style={smallIconStyle} src={fb} />;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Props extends FormComponentProps {
  continueWithFacebook: () => void;
  continueWithGoogle: () => void;
  signupWithEmailAndPassword: () => Promise<void>;
  isSubmittingForm: boolean;
  detailsFormError: {
    message: string;
  };
  formData?: FormData;
}

const EmployeeRegistrationForm: React.FC<Props> = (props: Props, ref) => {
  const history = useHistory();
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));
  const handleSubmit = e => {
    e.preventDefault();
    props.signupWithEmailAndPassword();
  };

  const alertMessage = React.useMemo(
    () =>
      props.detailsFormError && (
        <Alert
          className={s.alertMessage}
          message="Registration Failed"
          description={props.detailsFormError.message}
          type="error"
        />
      ),
    [],
  );
  return (
    <div className={s.signUpRoot}>
      <AuthPageWelcomeSection />
      <div className={s.formWrapper}>
        <div className={s.signUpForm}>
          <div className={"backButton"} onClick={() => history.goBack()}>
            <Icon type="arrow-left" /> &nbsp; Back{" "}
          </div>
          <div className={s.formCardTitle}>{"Sign Up as an Employee"}</div>
          <div className={s.formCardSubTitle}>
            Sign in with your email and password
          </div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Item>
              {props.form.getFieldDecorator("firstName", {
                rules: [
                  {
                    required: true,
                    message: "Please provide your first name.",
                    whitespace: true,
                  },
                ],
                initialValue: props.formData.firstName,
              })(
                <TextInputField
                  placeholder="First Name"
                  autoComplete="given-name"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    message: "Please provide your last name.",
                    whitespace: true,
                  },
                ],
                initialValue: props.formData.lastName,
              })(
                <TextInputField
                  placeholder="Last Name"
                  autoComplete="last-name"
                />,
              )}
            </Form.Item>
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
                />,
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please provide a password of at least 6 characters.",
                    whitespace: true,
                    min: 6,
                  },
                ],
                initialValue: props.formData.password,
              })(
                <TextInputField
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                />,
              )}
            </Form.Item>
            {alertMessage}
            <Form.Item>
              <SubmitButton type="primary" loading={props.isSubmittingForm}>
                {"Create Your Account"}
              </SubmitButton>
            </Form.Item>
          </Form>

          <Divider>{"OR"}</Divider>

          {/* Social buttons */}
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

          {/* Footer */}
          <div className={s.signUpFormFooter}>
            <div className={s.alreadyHaveAccountText}>
              {"Already have an Employee account? "}
              <Link
                to={`/login-employee?redirect=${new URLSearchParams(
                  window.location.search,
                ).get("redirect") || ""}`}
              >
                {"Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;

import { Alert, Divider, Form, Icon } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import { Link } from "react-router-dom";
import s from "./Signup.module.scss";
import google from "assets/googleIcon.svg";
import fb from "assets/fbIcon.svg";
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
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Props extends FormComponentProps {
  continueWithFacebook: () => void;
  continueWithGoogle: () => void;
  signupWithEmailAndPassword: () => void;
  isSubmittingForm: boolean;
  detailsFormError: {
    message: string;
  };
  formData: FormData;
  handleBack?: (e) => void;
}

const SignupForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.signupWithEmailAndPassword();
  };

  return (
    <div className={s.signUpForm}>
      <div className={`${s.backButton} backButton`} onClick={props.handleBack}>
        <Icon type="arrow-left" /> &nbsp; Back{" "}
      </div>
      <div className={s.formCardTitle}>Let's Get Started</div>

      <div className={s.formCardSubTitle}>
        Create an account to start your learning journey.
      </div>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Item>
          {props.form.getFieldDecorator("firstName", {
            initialValue: props.formData.firstName,
            rules: [
              {
                required: true,
                message: "Please provide your first name.",
                whitespace: true,
              },
            ],
          })(
            <TextInputField
              placeholder="First Name"
              autoComplete="given-name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("lastName", {
            initialValue: props.formData.lastName,
            rules: [
              {
                required: true,
                message: "Please provide your last name.",
                whitespace: true,
              },
            ],
          })(
            <TextInputField
              placeholder="Last Name"
              autoComplete="family-name"
            />,
          )}
        </Form.Item>
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
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("password", {
            initialValue: props.formData.password,
            rules: [
              {
                required: true,
                message: "Please provide a password of at least 6 characters.",
                whitespace: true,
                min: 6,
              },
            ],
          })(
            <TextInputField
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        {props.detailsFormError ? (
          <Alert
            className={s.alertMessage}
            message="Registration Failed"
            description={props.detailsFormError.message}
            type="error"
          />
        ) : null}
        <Form.Item>
          <SubmitButton type="primary" loading={props.isSubmittingForm}>
            {"Create Your Account"}
          </SubmitButton>
        </Form.Item>
      </Form>

      <Divider>{"OR"}</Divider>

      <div className={`${s.thirdPartyAuthContainer} signupPageAuthContainer`}>
        <ThirdPartyLoginButton onClick={props.continueWithGoogle}>
          <Icon component={googleIcon} />
          {"Sign Up with Google"}
        </ThirdPartyLoginButton>
        <ThirdPartyLoginButton onClick={props.continueWithFacebook}>
          <Icon component={fbIcon} />
          {"Sign Up with Facebook"}
        </ThirdPartyLoginButton>
      </div>
      <div className={s.signupFormFooter}>
        <div className={s.alreadyHaveAccountText}>
          {"Already have an account? "}
          <Link
            to={`/login?redirect=${new URLSearchParams(
              window.location.search,
            ).get("redirect") || ""}`}
          >
            {" Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

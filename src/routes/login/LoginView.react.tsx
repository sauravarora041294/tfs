import { AppContext } from "App";
import { Form, notification, Alert, Icon } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import LoginForm from "./LoginForm.react";
import s from "./Login.module.scss";
import {
  LoginStateActionTypes,
  loginReducer,
  loginStateInit,
} from "./LoginReducer";
import Util from "utilities";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import { generateRedirectTargetAfterAuth } from "utilities";
import loginIcon from "assets/images/loginPage-StandingPerson.svg";
import AuthPageWelcomeSection from "components/AuthPageWelcomeSection";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  error?: Error;
}

const LoginView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    {},
    loginStateInit,
  );
  const loginFormRef: MutableRefObject<any> = React.useRef();
  const LoginFormEnhanced = Form.create({
    name: "loginForm",
  })(React.forwardRef(castFormToRefForwardingComponent(LoginForm)));

  const handleThirdPartyAuthIfNeeded = async () => {
    const authUserResponse = await Util.Auth.handleThirdPartyUserSignInRedirect();
    if (authUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth("/mydashboard");
      props.history.push(redirectTarget);
    }
    if (authUserResponse.error) {
      notification.error({
        message: "Problem Signing In",
        description: `An error occurred while trying to sign you in: ${authUserResponse.error}`,
        placement: "bottomRight",
      });
    }
  };

  React.useEffect(() => {
    handleThirdPartyAuthIfNeeded();
  }, []);

  const loginWithEmailAndPassword = async () => {
    loginFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: LoginStateActionTypes.SET_FORM_DATA,
          formData: values,
        });
        dispatch({
          type: LoginStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const registerUserResponse = await Util.Auth.signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        if (registerUserResponse.error) {
          dispatch({
            type: LoginStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: registerUserResponse.error,
          });
        } else {
          dispatch({
            type: LoginStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
        }
      }
    });
  };

  const handleBack = e => {
    props.history.goBack();
  };
  const continueWithFacebook = async () => {
    await doSignInWithFacebookAuth();
  };

  const continueWithGoogle = async () => {
    await doSignInWithGoogleAuth();
  };

  const jwtErrorAlert = React.useMemo(
    () =>
      appState.invalidAuthTokenError && (
        <Alert
          className={s.alertJWTError}
          message="Authentication Error"
          description="We had some issues authenticating you. Please log in again."
          type="error"
          showIcon
        />
      ),
    [appState.invalidAuthTokenError],
  );

  return (
    <div className={s.loginRoot}>
      <AuthPageWelcomeSection />

      <div className={s.formWrapper}>
        {jwtErrorAlert}
        <LoginFormEnhanced
          {...{
            ref: loginFormRef,
            loginWithEmailAndPassword: loginWithEmailAndPassword,
            continueWithGoogle: continueWithGoogle,
            continueWithFacebook: continueWithFacebook,
            detailsFormError: loginState.formSubmissionError,
            isSubmittingForm: loginState.isSubmittingForm,
            formData: loginState.formData,
            handleBack,
          }}
        />
      </div>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(LoginView);

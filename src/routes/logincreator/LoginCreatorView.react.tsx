import { AppContext } from "App";
import { Form, notification, Alert } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import CreatorLoginForm from "./CreatorLoginForm.react";
import { generateRedirectTargetAfterAuth } from "utilities";
import {
  LoginCreatorStateActionTypes,
  loginCreatorReducer,
  loginCreatorInit,
} from "./LoginCreatorReducer";
import { upgradeUserToCreatorIfNecessary } from "./LoginCreatorUtil";
import Util from "utilities";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import s from "./LoginCreator.module.scss";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  error?: Error;
}

const LoginCreatorView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [loginCreatorState, dispatch] = React.useReducer(
    loginCreatorReducer,
    {},
    loginCreatorInit,
  );

  const handleThirdPartyAuthIfNeeded = async () => {
    const authUserResponse = await Util.Auth.handleThirdPartyCreatorSignInRedirect();
    if (authUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth("/");
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

  const creatorLoginFormRef: MutableRefObject<any> = React.useRef();
  const CreatorLoginFormEnhanced = Form.create({
    name: "creatorLoginForm",
  })(React.forwardRef(castFormToRefForwardingComponent(CreatorLoginForm)));

  const loginWithEmailAndPassword = async () => {
    creatorLoginFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: LoginCreatorStateActionTypes.SET_FORM_DATA,
          formData: values,
        });
        dispatch({ type: LoginCreatorStateActionTypes.BEGIN_FORM_SUBMISSION });
        const registerUserResponse = await Util.Auth.signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        if (registerUserResponse.error) {
          dispatch({
            type:
              LoginCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: registerUserResponse.error,
          });
        } else if (registerUserResponse.authResponse.user) {
          dispatch({
            type:
              LoginCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });

          await upgradeUserToCreatorIfNecessary(
            registerUserResponse.authResponse.user.uid,
          );

          if (appState.redirectTargetAfterAuth)
            props.history.push(appState.redirectTargetAfterAuth);

          const redirectTarget = generateRedirectTargetAfterAuth("/");
          props.history.push(redirectTarget);
        }
      }
    });
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
    <React.Fragment>
      {jwtErrorAlert}
      <CreatorLoginFormEnhanced
        {...{
          ref: creatorLoginFormRef,
          loginWithEmailAndPassword: loginWithEmailAndPassword,
          continueWithGoogle: continueWithGoogle,
          continueWithFacebook: continueWithFacebook,
          detailsFormError: loginCreatorState.formSubmissionError,
          isSubmittingForm: loginCreatorState.isSubmittingForm,
          formData: loginCreatorState.formData,
        }}
      />
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(LoginCreatorView);

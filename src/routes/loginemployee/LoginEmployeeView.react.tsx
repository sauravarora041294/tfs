import { AppContext } from "App";
import { Form, notification, Alert } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import EmployeeLoginForm from "./EmployeeLoginForm.react";
import s from "./LoginEmployee.module.scss";
import Util, { generateRedirectTargetAfterAuth } from "utilities";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import {
  loginEmployeeReducer,
  loginEmployeeInit,
  LoginEmployeeStateActionTypes,
} from "./LoginEmployeeReducer";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  error?: Error;
}

const LoginEmployeeView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [loginEmployeeState, dispatch] = React.useReducer(
    loginEmployeeReducer,
    {},
    loginEmployeeInit,
  );

  const handleThirdPartyAuthIfNeeded = async () => {
    const authUserResponse = await Util.Auth.handleThirdPartyEmployeeSignInRedirect();
    if (authUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth(
        "/creator-payouts",
      );
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

  const employeeLoginFormRef: MutableRefObject<any> = React.useRef();
  const EmployeeLoginFormEnhanced = Form.create({
    name: "employeeLoginForm",
  })(React.forwardRef(castFormToRefForwardingComponent(EmployeeLoginForm)));

  const loginWithEmailAndPassword = async () => {
    employeeLoginFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: LoginEmployeeStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          dispatch({
            type: LoginEmployeeStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          const registerUserResponse = await Util.Auth.signInWithEmailAndPassword(
            values.email,
            values.password,
          );
          if (registerUserResponse.error) {
            dispatch({
              type:
                LoginEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              submissionError: registerUserResponse.error,
            });
          } else if (registerUserResponse.authResponse.user) {
            dispatch({
              type:
                LoginEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });

            if (appState.redirectTargetAfterAuth)
              props.history.push(appState.redirectTargetAfterAuth);

            const redirectTarget = generateRedirectTargetAfterAuth(
              "/creator-payouts",
            );
            props.history.push(redirectTarget);
          }
        }
      },
    );
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
    <React.Fragment>
      {jwtErrorAlert}
      <EmployeeLoginFormEnhanced
        {...{
          ref: employeeLoginFormRef,
          loginWithEmailAndPassword: loginWithEmailAndPassword,
          continueWithGoogle: continueWithGoogle,
          continueWithFacebook: continueWithFacebook,
          detailsFormError: loginEmployeeState.formSubmissionError,
          isSubmittingForm: loginEmployeeState.isSubmittingForm,
          formData: loginEmployeeState.formData,
          handleBack,
        }}
      ></EmployeeLoginFormEnhanced>
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(LoginEmployeeView);

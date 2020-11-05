import { AppContext } from "App";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { History } from "history";
import EmployeeRegistrationForm from "./EmployeeRegistrationForm.react";
import Util, { generateRedirectTargetAfterAuth } from "utilities";
import { Form, notification } from "antd";
import {
  RegisterEmployeeStateActionTypes,
  registerEmployeeReducer,
  registerEmployeeInit,
} from "./RegisterEmployeeReducer";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import { compose } from "recompose";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  error?: Error;
}

const RegisterEmployeeView: React.FC<Props> = (props: Props) => {
  const [registerEmployeeState, dispatch] = React.useReducer(
    registerEmployeeReducer,
    {},
    registerEmployeeInit,
  );

  const registerEmployeeIfNeeded = async () => {
    const registerUserResponse = await Util.Auth.handleThirdPartyEmployeeSignInRedirect();
    if (registerUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth(
        "/creator-payouts",
      );
      props.history.push(redirectTarget);
    }
    if (registerUserResponse.error) {
      notification.error({
        message: "Problem Signing Up",
        description: `An error occurred while trying to sign you up: ${registerUserResponse.error}`,
        placement: "bottomRight",
      });
    }
  };

  React.useEffect(() => {
    registerEmployeeIfNeeded();
  }, []);

  const employeeRegisterFormRef: MutableRefObject<any> = React.useRef();
  const EmployeeRegistrationFormEnhanced = Form.create({
    name: "employeeSignupForm",
  })(React.forwardRef(castFormToRefForwardingComponent(EmployeeRegistrationForm)));

  const handleSubmitEmailPasswordSignupForm = async () => {
    employeeRegisterFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: RegisterEmployeeStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          dispatch({
            type: RegisterEmployeeStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          const registerUserResponse = await Util.Auth.registerEmployeeWithEmailAndPassword(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
          );

          if (registerUserResponse.error) {
            dispatch({
              type:
                RegisterEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              formSubmissionError: registerUserResponse.error,
            });
          } else {
            dispatch({
              type:
                RegisterEmployeeStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });
            props.history.push(`/creator-payouts`);
          }
        }
      },
    );
  };

  const continueWithFacebook = async () => {
    await doSignInWithFacebookAuth();
  };

  const continueWithGoogle = async () => {
    await doSignInWithGoogleAuth();
  };

  return (
    <>
      <EmployeeRegistrationFormEnhanced
        {...{
          ref: employeeRegisterFormRef,
          signupWithEmailAndPassword: handleSubmitEmailPasswordSignupForm,
          continueWithGoogle: continueWithGoogle,
          continueWithFacebook: continueWithFacebook,
          detailsFormError: registerEmployeeState.formSubmissionError,
          isSubmittingForm: registerEmployeeState.isSubmittingForm,
          formData: registerEmployeeState.formData,
        }}
      />
    </>
  );
};

export default compose<Props, Props>(withRouter)(RegisterEmployeeView);

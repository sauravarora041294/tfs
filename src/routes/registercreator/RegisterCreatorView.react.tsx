import { Form, notification } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import CreatorRegistrationForm from "./CreatorRegistrationForm.react";
import {
  RegisterCreatorStateActionTypes,
  registerCreatorReducer,
  registerCreatorInit,
} from "./RegisterCreatorReducer";
import Util from "utilities";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import { generateRedirectTargetAfterAuth } from "utilities";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  error?: Error;
}

const RegisterCreatorView: React.FC<Props> = (props: Props) => {
  const [registerCreatorState, dispatch] = React.useReducer(
    registerCreatorReducer,
    {},
    registerCreatorInit,
  );

  const registerCreatorIfNeeded = async () => {
    const registerUserResponse = await Util.Auth.handleThirdPartyCreatorSignInRedirect();
    if (registerUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth(
        "/creator-registration-details",
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
    registerCreatorIfNeeded();
  }, []);

  const creatorRegistrationFormRef: MutableRefObject<any> = React.useRef();
  const CreatorRegistrationFormEnhanced = Form.create({
    name: "creatorSignupForm",
  })(React.forwardRef(castFormToRefForwardingComponent(CreatorRegistrationForm)));

  const handleSubmitEmailPasswordSignupForm = async () => {
    creatorRegistrationFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: RegisterCreatorStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          dispatch({
            type: RegisterCreatorStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          const qparams = new URLSearchParams(window.location.search);
          const inviteCode = qparams ? qparams.get("inviteCode") : null;
          const registerUserResponse = await Util.Auth.registerCreatorWithEmailAndPassword(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            inviteCode,
          );
          if (registerUserResponse.error) {
            dispatch({
              type:
                RegisterCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              formSubmissionError: registerUserResponse.error,
            });
          } else {
            dispatch({
              type:
                RegisterCreatorStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });
            props.history.push(`/creator-registration-details`);
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
      <CreatorRegistrationFormEnhanced
        {...{
          ref: creatorRegistrationFormRef,
          signupWithEmailAndPassword: handleSubmitEmailPasswordSignupForm,
          continueWithGoogle: continueWithGoogle,
          continueWithFacebook: continueWithFacebook,
          detailsFormError: registerCreatorState.formSubmissionError,
          isSubmittingForm: registerCreatorState.isSubmittingForm,
          formData: registerCreatorState.formData,
        }}
      />
    </>
  );
};

export default compose<Props, Props>(withRouter)(RegisterCreatorView);

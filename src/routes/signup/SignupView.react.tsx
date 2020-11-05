import { AppContext } from "App";
import { Form, notification } from "antd";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import SignupForm from "./SignupForm.react";
import { generateRedirectTargetAfterAuth } from "utilities";
import {
  SignupStateActionTypes,
  signupReducer,
  signupStateInit,
} from "./SignupReducer";
import Util from "utilities";
import {
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
} from "FirebaseClient";
import s from "./Signup.module.scss";
import AuthPageWelcomeSection from "components/AuthPageWelcomeSection";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
}

const SignupView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [signupState, dispatch] = React.useReducer(
    signupReducer,
    {},
    signupStateInit,
  );
  const handleBack = e => {
    props.history.goBack();
  };

  const registerUserIfNeeded = async () => {
    const registerUserResponse = await Util.Auth.handleThirdPartyUserSignInRedirect();
    if (registerUserResponse.savedUser) {
      const redirectTarget = generateRedirectTargetAfterAuth("/mydashboard");
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
    registerUserIfNeeded();
  }, []);

  const creatorRegistrationFormRef: MutableRefObject<any> = React.useRef();
  const SignupFormEnhanced = Form.create({
    name: "creatorSignupForm",
  })(React.forwardRef(castFormToRefForwardingComponent(SignupForm)));

  const handleSubmitEmailPasswordSignupForm = async () => {
    creatorRegistrationFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: SignupStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          dispatch({
            type: SignupStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          const registerUserResponse = await Util.Auth.registerUserWithEmailAndPassword(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
          );
          if (registerUserResponse.error) {
            dispatch({
              type: SignupStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              submissionError: registerUserResponse.error,
            });
          } else {
            dispatch({
              type:
                SignupStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });
            const redirectTarget = generateRedirectTargetAfterAuth(
              "/subscription",
            );
            props.history.push(redirectTarget);
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
    <div className={s.signupRoot}>
      <AuthPageWelcomeSection pitchText="If you really want to learn, you’ve come to the right place. Get started for unlimited access to all of our premium channels." />
      <div className={s.formWrapper}>
        <SignupFormEnhanced
          {...{
            ref: creatorRegistrationFormRef,
            signupWithEmailAndPassword: handleSubmitEmailPasswordSignupForm,
            continueWithGoogle: continueWithGoogle,
            continueWithFacebook: continueWithFacebook,
            detailsFormError: signupState.formSubmissionError,
            isSubmittingForm: signupState.isSubmittingForm,
            formData: signupState.formData,
            handleBack,
          }}
        />
      </div>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(SignupView);

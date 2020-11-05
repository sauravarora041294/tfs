import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import { useFetchResetPasswordCreatorData } from "./ResetPasswordCreatorUtil";
import LoadingView from "components/Views/LoadingView";
import ResetPasswordCreatorView from "./ResetPasswordCreatorView.react";

interface Props {
  location?: Location;
  match?: match;
}

const ResetPassword: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const resetPasswordCreatorData = useFetchResetPasswordCreatorData(
    appState.authUser,
    props.location,
    props.match,
  );

  if (resetPasswordCreatorData.isLoading) {
    return <LoadingView />;
  } else if (appState.authUser && appState.currentCreator) {
    return <Redirect to={"/"} />;
  } else {
    return (
      <ResetPasswordCreatorView
        error={resetPasswordCreatorData.error}
        userEmail={resetPasswordCreatorData.userEmail}
        showSendResetLinkFormView={
          resetPasswordCreatorData.showSendResetLinkFormView
        }
        showResetPasswordFormView={
          resetPasswordCreatorData.showResetPasswordFormView
        }
        firebasePasswordResetActionCode={
          resetPasswordCreatorData.firebasePasswordResetActionCode
        }
      />
    );
  }
};

export default ResetPassword;

import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import { useFetchResetPasswordData } from "./ResetPasswordUtil";
import LoadingView from "components/Views/LoadingView";
import ResetPasswordView from "./ResetPasswordView.react";

interface Props {
  location?: Location;
  match?: match;
}

const ResetPassword: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const resetPasswordData = useFetchResetPasswordData(
    appState.authUser,
    props.location,
    props.match,
  );

  if (resetPasswordData.isLoading) {
    return <LoadingView />;
  } else if (resetPasswordData.redirect) {
    window.location.replace(resetPasswordData.redirect);
  } else if (appState.authUser && appState.currentUser) {
    return <Redirect to={"/mydashboard"} />;
  } else {
    return (
      <ResetPasswordView
        error={resetPasswordData.error}
        userEmail={resetPasswordData.userEmail}
        showSendResetLinkFormView={resetPasswordData.showSendResetLinkFormView}
        showResetPasswordFormView={resetPasswordData.showResetPasswordFormView}
        firebasePasswordResetActionCode={
          resetPasswordData.firebasePasswordResetActionCode
        }
      />
    );
  }
};

export default ResetPassword;

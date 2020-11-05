import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchLoginCreatorData } from "./LoginCreatorUtil";
import LoginCreatorView from "./LoginCreatorView.react";
import { generateRedirectTargetAfterAuth } from "utilities";
interface Props {
  location?: Location;
  match?: match;
}

const LoginCreator: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const loginCreatorData = useFetchLoginCreatorData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (appState.authUser) {
    if (
      appState.currentCreator &&
      appState.currentCreator.creatorStatus === "NEEDS_PROFILE_DETAILS"
    ) {
      return <Redirect to={"/creator-registration-details"} />;
    } else if (
      appState.authUser &&
      appState.currentCreator &&
      appState.currentCreator.creatorStatus === "PENDING_APPROVAL"
    ) {
      return <Redirect to={"/creator-pending-approval"} />;
    } else if (
      appState.authUser &&
      appState.currentCreator &&
      appState.currentCreator.creatorStatus === "APPROVED"
    ) {
      const redirectTarget = generateRedirectTargetAfterAuth("/");
      return <Redirect to={redirectTarget} />;
    } else {
      return <LoadingView />;
    }
  } else {
    return <LoginCreatorView error={loginCreatorData.error} />;
  }
};

export default LoginCreator;

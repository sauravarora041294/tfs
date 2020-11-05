import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchRegisterCreatorData } from "./RegisterCreatorUtil";
import RegisterCreatorView from "./RegisterCreatorView.react";
import { generateRedirectTargetAfterAuth } from "utilities";
interface Props {
  location?: Location;
  match?: match;
}

const RegisterCreator: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const registerCreatorData = useFetchRegisterCreatorData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (appState.authUser) {
    if (
      appState.authUser &&
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
    return <RegisterCreatorView error={registerCreatorData.error} />;
  }
};

export default RegisterCreator;

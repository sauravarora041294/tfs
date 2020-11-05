import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { History, Location } from "history";
import SignupView from "./SignupView.react";
import { useFetchSignupData } from "./SignupUtil";
import { generateRedirectTargetAfterAuth } from "utilities";
import LoadingView from "components/Views/LoadingView";

interface Props {
  history?: History;
  location?: Location;
  match?: match;
}

const Signup: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);

  if (appState.authUser && !appState.currentUser) {
    return <LoadingView />;
  } else if (appState.authUser && appState.currentUser && appState.currentUser.subscriptionStatus == "Active") {
    const redirectTarget = generateRedirectTargetAfterAuth("/mydashboard");
    return <Redirect to={redirectTarget} />;
  } else if (appState.authUser && appState.currentUser && appState.currentUser.subscriptionStatus == "Inactive") {
    const redirectTarget = generateRedirectTargetAfterAuth("/subscription");
    return <Redirect to={redirectTarget} />;
  } else {
    return <SignupView />;
  }

};

export default Signup;

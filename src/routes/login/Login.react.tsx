import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { History, Location } from "history";
import LoginView from "./LoginView.react";
import { generateRedirectTargetAfterAuth } from "utilities";
interface Props {
  history?: History;
  location?: Location;
  match?: match;
}

const Login: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);

  if (appState.authUser) {
    const redirectTarget = generateRedirectTargetAfterAuth("/mydashboard");
    return <Redirect to={redirectTarget} />;
  } else {
    return <LoginView />;
  }
};

export default Login;

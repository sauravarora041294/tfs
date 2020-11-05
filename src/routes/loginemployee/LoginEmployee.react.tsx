import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import { useFetchLoginEmployeeData } from "./LoginEmployeeUtil";
import { generateRedirectTargetAfterAuth } from "utilities";
import LoginEmployeeView from "./LoginEmployeeView.react";

interface Props {
  location?: Location;
  match?: match;
}

const LoginEmployee: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const loginEmployeeData = useFetchLoginEmployeeData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (appState.authUser) {
    const redirectTarget = generateRedirectTargetAfterAuth("/creator-payouts");
    return <Redirect to={redirectTarget} />;
  } else {
    return <LoginEmployeeView error={loginEmployeeData.error} />;
  }
};

export default LoginEmployee;

import { AppContext } from "App";
import React from "react";
import { match, Redirect } from "react-router";
import { Location } from "history";
import { useFetchRegisterEmployeeData } from "routes/registeremployee/RegisterEmployeeUtil";
import RegisterEmployeeView from "./RegisterEmployeeView.react";
import LoadingView from "components/Views/LoadingView";
import { generateRedirectTargetAfterAuth } from "utilities";
interface Props {
  location?: Location;
  match?: match;
}

const RegisterEmployee: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const registerEmployeeData = useFetchRegisterEmployeeData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (appState.authUser && !appState.currentEmployee) {
    return <LoadingView />;
  } else if (
    appState.authUser &&
    appState.currentEmployee &&
    appState.currentEmployee.employeeStatus === "APPROVED"
  ) {
    const redirectTarget = generateRedirectTargetAfterAuth("/creator-payouts");
    return <Redirect to={redirectTarget}></Redirect>;
  }

  return <RegisterEmployeeView error={registerEmployeeData.error} />;
};

export default RegisterEmployee;

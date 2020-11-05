import { AppContext } from "App";
import React from "react";
import { match, Redirect } from "react-router";
import { Location } from "history";
import InvitedView from "./InvitedView.react";

interface Props {
  location?: Location;
  match?: match;
}

const Invited: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);

  if (appState.authUser) return <Redirect to="/" />;
  return <InvitedView />;
};

export default Invited;

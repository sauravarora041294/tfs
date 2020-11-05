import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import AddCreatorDetailsView from "./AddCreatorDetailsView.react";
import { useFetchAddCreatorDetailsData } from "./AddCreatorDetailsUtil";
import LoadingView from "components/Views/LoadingView";

interface Props {
  location?: Location;
  match?: match;
}

const AddCreatorDetails: React.FC<Props> = (props: Props) => {
  const [appState, dispatch] = React.useContext(AppContext);
  const registerCreatorData = useFetchAddCreatorDetailsData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (registerCreatorData.isLoading) {
    return <LoadingView />;
  } else if (!appState.authUser) {
    return <Redirect to={"/register-creator"} />;
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
    return <Redirect to={"/"} />;
  }

  return (
    <AddCreatorDetailsView
      currentUser={appState.currentCreator}
      windowLocation={props.location}
      error={registerCreatorData.error}
    />
  );
};

export default AddCreatorDetails;

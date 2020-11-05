import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorPendingApprovalData } from "./CreatorPendingApprovalUtil";
import CreatorPendingApprovalView from "./CreatorPendingApprovalView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorPendingApproval: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorPendingApprovalData = useFetchCreatorPendingApprovalData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (creatorPendingApprovalData.isLoading) {
    return <LoadingView />;
  } else if (!appState.authUser) {
    return <Redirect to={"/register-creator"} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === "NEEDS_PROFILE_DETAILS"
  ) {
    return <Redirect to={"/creator-registration-details"} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === "APPROVED"
  ) {
    return <Redirect to={"/"} />;
  }
  return (
    <CreatorPendingApprovalView
      currentUser={appState.currentCreator}
      error={creatorPendingApprovalData.error}
    />
  );
};

export default CreatorPendingApproval;

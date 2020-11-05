import { AppContext } from "App";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorPendingApprovalEditProfileData } from "./CreatorPendingApprovalEditProfileUtil";
import CreatorPendingApprovalEditProfileView from "./CreatorPendingApprovalEditProfileView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorPendingApprovalEditProfile: React.FC<Props> = (props: Props) => {
  const [appState, dispatch] = React.useContext(AppContext);
  const creatorPendingApprovalEditProfileData = useFetchCreatorPendingApprovalEditProfileData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (appState.authUser && appState.currentCreator) {
    if (creatorPendingApprovalEditProfileData.isLoading) {
      return <LoadingView />;
    } else if (
      appState.currentCreator.creatorStatus === "NEEDS_PROFILE_DETAILS"
    ) {
      return <Redirect to={"/register-creator"} />;
    } else if (appState.currentCreator.creatorStatus === "APPROVED") {
      return <Redirect to={"/"} />;
    } else {
      return (
        <CreatorPendingApprovalEditProfileView
          currentUser={appState.currentCreator}
          error={creatorPendingApprovalEditProfileData.error}
        />
      );
    }
  }
  return <Redirect to={"/register-creator"} />;
};

export default CreatorPendingApprovalEditProfile;

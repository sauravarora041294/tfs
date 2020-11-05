import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorNotificationsData } from "./CreatorNotificationsUtil";
import CreatorNotificationsView from "./CreatorNotificationsView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorNotifications: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorNotificationsData = useFetchCreatorNotificationsData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (creatorNotificationsData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <CreatorNotificationsView
        currentUser={appState.currentCreator}
        notifications={creatorNotificationsData.notifications}
        error={creatorNotificationsData.error}
      />
    );
  }
};

export default CreatorNotifications;

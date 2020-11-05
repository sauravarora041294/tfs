import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorsHubData } from "./CreatorsHubUtil";
import CreatorsHubView from "./CreatorsHubView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorsHub: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorsHubData = useFetchCreatorsHubData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (creatorsHubData.isLoading || !appState.currentCreator) {
    return <LoadingView />;
  } else {
    return (
      <CreatorsHubView
        currentUser={appState.currentCreator}
        myMissions={creatorsHubData.myMissions}
        myPlaylists={creatorsHubData.myPlaylists}
        myResources={creatorsHubData.myResources}
        myContributingMissions={creatorsHubData.myContributingMissions}
        myContributingPlaylists={creatorsHubData.myContributingPlaylists}
        allMissions={creatorsHubData.allMissions}
        pendingMissionContributorRequests={
          creatorsHubData.pendingMissionContributorRequests
        }
        missionsToJoin={creatorsHubData.missionsNotJoined}
        pendingMissionRequests={creatorsHubData.pendingMissionRequests}
        playlistsToJoin={creatorsHubData.playlistsToJoin}
        pointCounts={creatorsHubData.pointCounts}
        userViewCounts={creatorsHubData.userViewCounts}
        userUniqueViewCounts={creatorsHubData.userUniqueViewCounts}
        activityNotifications={creatorsHubData.activityNotifications}
        error={creatorsHubData.error}
      />
    );
  }
};

export default CreatorsHub;

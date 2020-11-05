import { AppContext } from "App";
import { withEnsureUserAuthAndSubscriptionActiveForPublic } from "AppUtil";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchMissionData } from "./MissionUtil";
import MissionView from "./MissionView.react";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "data/types/enums";
import { getErrorMessageType } from "utilities/index";

interface Props {
  isPublic: boolean;
  location?: Location;
  match?: match;
  isShort?: boolean;
  pathName?: string;
  params?: string;
}

const Mission: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const missionData = useFetchMissionData(
    appState.authUser,
    props.isShort ? props.pathName : props.location.pathname,
    props.isShort ? props.params : props.match.params,
    props.isPublic,
  );

  if (missionData.isLoading) {
    return <LoadingView />;
  } else if (!missionData.mission) {
    return <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />;
  } else if (missionData.error) {
    return <ErrorPage error={getErrorMessageType(missionData.error)} />;
  } else {
    return (
      <MissionView
        isPublic={props.isPublic}
        mission={missionData.mission}
        contributors={missionData.contributors}
        contentRequests={missionData.contentRequests}
        currentUser={appState.currentUser}
        searchContent={missionData.searchContent}
        searchContentPlaylists={missionData.searchContentPlaylists}
        searchContentResources={missionData.searchContentResources}
        publiclyPreviewableContent={missionData.publiclyPreviewableContent}
        recentlyAddedContent={missionData.recentlyAddedContent}
        recommendedContent={missionData.recommendedContent}
        topRatedContent={missionData.topRatedContent}
        viewlogs={missionData.viewlogs}
        searchText={missionData.searchText}
        error={missionData.error}
        playlists={missionData.playlists}
        resources={missionData.resources}
      />
    );
  }
};

export default withEnsureUserAuthAndSubscriptionActiveForPublic(Mission);

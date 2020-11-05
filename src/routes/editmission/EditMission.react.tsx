import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchEditMissionData } from "./EditMissionUtil";
import EditMissionView from "./EditMissionView.react";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "data/types/enums";
import { getErrorMessageType } from "utilities/index";

interface Props {
  location?: Location;
  match?: match;
}

const EditMission: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const editMissionData = useFetchEditMissionData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (
    editMissionData.isLoading ||
    (appState.authUser && !appState.currentCreator)
  ) {
    return <LoadingView />;
  } else if (!editMissionData.isLoading && !editMissionData.mission) {
    return <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />;
  } else if (editMissionData.error) {
    return <ErrorPage error={getErrorMessageType(editMissionData.error)} />;
  } else {
    return (
      <EditMissionView
        currentUser={appState.currentCreator}
        mission={editMissionData.mission}
        missionContributors={editMissionData.missionContributors}
        missionCreator={editMissionData.missionCreator}
        missionResources={editMissionData.missionResources}
        missionPlaylists={editMissionData.missionPlaylists}
        missionContentRequests={editMissionData.missionContentRequests}
        myContentInMission={editMissionData.myContentInMission}
        pendingContributorRequestsForThisMission={
          editMissionData.pendingContributorRequestsForThisMission
        }
        error={editMissionData.error}
      />
    );
  }
};

export default EditMission;

import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchEditCreatorProfileData } from "./EditCreatorProfileUtil";
import EditCreatorProfileView from "./EditCreatorProfileView.react";

interface Props {
  location?: Location;
  match?: match;
}

const EditCreatorProfile: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const editCreatorProfileData = useFetchEditCreatorProfileData(
    appState.authUser,
  );

  if (!appState.currentCreator) {
    return <LoadingView />;
  }
  return (
    <EditCreatorProfileView
      currentUser={appState.currentCreator}
      error={editCreatorProfileData.error}
    />
  );
};

export default EditCreatorProfile;

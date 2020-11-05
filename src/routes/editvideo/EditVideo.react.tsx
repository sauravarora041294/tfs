import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import EditVideoView from "./EditVideoView.react";
import { useFetchEditVideoData } from "./EditVideoUtil";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "data/types/enums";
import { getErrorMessageType } from "utilities/index";

interface Props {
  location?: Location;
  match?: match;
}

const EditVideo: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const editVideoData = useFetchEditVideoData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (
    editVideoData.isLoading ||
    (appState.authUser && !appState.currentCreator)
  ) {
    return <LoadingView />;
  } else if (!editVideoData.isLoading && !editVideoData.resource) {
    return <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />;
  } else if (editVideoData.error) {
    return <ErrorPage error={getErrorMessageType(editVideoData.error)} />;
  } else {
    return (
      <EditVideoView
        currentUser={appState.currentCreator}
        resource={editVideoData.resource}
      />
    );
  }
};

export default EditVideo;

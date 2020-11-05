import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchEditPlaylistData } from "./EditPlaylistUtil";
import EditPlaylistView from "./EditPlaylistView.react";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "data/types/enums";
import { getErrorMessageType } from "utilities/index";
import { FirestoreRealtime } from "FirebaseClient";

interface Props {
  location?: Location;
  match?: match;
}

const EditPlaylist: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const editPlaylistData = useFetchEditPlaylistData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (
    editPlaylistData.isLoading ||
    (appState.authUser && !appState.currentCreator)
  ) {
    return <LoadingView />;
  } else if (!editPlaylistData.isLoading && !editPlaylistData.playlist) {
    return <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />;
  } else if (editPlaylistData.error) {
    return <ErrorPage error={getErrorMessageType(editPlaylistData.error)} />;
  } else {
    return (
      <EditPlaylistView
        currentUser={appState.currentCreator}
        playlist={editPlaylistData.playlist}
        playlistResources={editPlaylistData.playlistResources}
        playlistContributors={editPlaylistData.playlistContributors}
        playlistCreator={editPlaylistData.playlistCreator}
        pendingContributorRequestsForThisPlaylist={
          editPlaylistData.pendingContributorRequestsForThisPlaylist
        }
        userLatestViewLogs={editPlaylistData.userLatestViewLogs}
        error={editPlaylistData.error}
      />
    );
  }
};

export default EditPlaylist;

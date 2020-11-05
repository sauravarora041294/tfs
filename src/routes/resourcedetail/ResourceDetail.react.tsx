import { AppContext } from "App";
import { withEnsureUserAuthAndSubscriptionActiveForPublic } from "AppUtil";
import React from "react";
import { Redirect, match } from "react-router-dom";
import { History, Location } from "history";
import NoContentInPlaylistView from "./NoContentInPlaylistView.react";
import ResourceDetailLoadingView from "./ResourceDetailLoadingView.react";
import { useFetchResourceDetailData } from "./ResourceDetailUtil";
import ResourceDetailView from "./ResourceDetailView.react";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "data/types/enums";
import { getErrorMessageType } from "utilities/index";

interface MatchProps {
  resourceId: string;
}

interface Props {
  isPublic: boolean;
  location?: Location;
  match?: match<MatchProps>;
  history?: History;
}

const resourceAvailable = res => {
  if (res.playlist) return true;
  if (res.viewlogs) return true;
  if (res.relatedResources) return true;
  if (res.relatedResourceIds) return true;
  if (res.playlistResources) return true;
  if (res.currentResource) return true;
  return false;
};
const ResourceDetail: React.FC<Props> = (props: Props) => {
  console.log(props);
  const [appState] = React.useContext(AppContext);
  const resourceDetailData = useFetchResourceDetailData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
    props.isPublic,
  );
  console.log(resourceDetailData);
  if (resourceDetailData.isLoading) {
    return <ResourceDetailLoadingView />;
  } else if (resourceDetailData.error) {
    return <ErrorPage error={getErrorMessageType(resourceDetailData.error)} />;
  } else if (
    (resourceDetailData.isPublic &&
      resourceDetailData.playlist &&
      !resourceDetailData.playlist.isPubliclyPreviewable) ||
    (resourceDetailData.isPublic &&
      resourceDetailData.currentResource &&
      !resourceDetailData.currentResource.isPubliclyPreviewable)
  ) {
    return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
  } else if (
    resourceDetailData.playlist &&
    !resourceDetailData.currentResource
  ) {
    return <NoContentInPlaylistView />;
  } else if (
    !props.match.params.resourceId &&
    resourceDetailData.playlist &&
    resourceDetailData.currentResource
  ) {
    props.history.replace(
      `/playlist/${resourceDetailData.playlist.objectID}/resource/${resourceDetailData.currentResource.objectID}`,
    );
  } else if (!resourceAvailable(resourceDetailData)) {
    return <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />;
  }

  return (
    <ResourceDetailView
      isPublic={resourceDetailData.isPublic}
      relatedResources={resourceDetailData.relatedResources}
      currentUser={appState.currentUser}
      currentResource={resourceDetailData.currentResource}
      userLatestViewlogs={resourceDetailData.userLatestViewlogs}
      playlistResources={resourceDetailData.playlistResources}
      playlist={resourceDetailData.playlist}
      qualityVerifications={resourceDetailData.qualityVerifications}
      contributors={resourceDetailData.contributors}
      error={resourceDetailData.error}
      userRating={resourceDetailData.userRating}
    />
  );
};

export default withEnsureUserAuthAndSubscriptionActiveForPublic(ResourceDetail);

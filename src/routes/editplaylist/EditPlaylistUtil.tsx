import arrayMove from "array-move";
import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface State {
  isLoading: boolean;
  pendingContributorRequestsForThisPlaylist: Array<DataTypes.Request>;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  playlistContributors: Array<DataTypes.User>;
  playlistCreator: DataTypes.Creator;
  error?: Error;
  userLatestViewLogs?: DataTypes.UserLatestViewlogs;
}

const useFetchEditPlaylistData = (authUser, pathname, matchParams): State => {
  const [data, updateData] = React.useState<State>({
    isLoading: true,
    pendingContributorRequestsForThisPlaylist: null,
    playlist: null,
    playlistResources: null,
    playlistContributors: null,
    playlistCreator: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const playlist = await RESTAPIClient.Playlist.get(matchParams.playlistId);
      const playlistResources = await RESTAPIClient.Resource.getByPlaylistId(
        matchParams.playlistId,
      );
      const playlistContributors = await RESTAPIClient.Playlist.getContributors(
        matchParams.playlistId,
      );
      const playlistCreator = await RESTAPIClient.User.get(
        playlist.creatorUserId,
      );
      const userLatestViewLogs = await RESTAPIClient.Viewlog.getLatestForUserId(
        authUser.uid,
      );

      const pendingContributorRequestsForThisPlaylist = await RESTAPIClient.Request.getPendingPlaylistsContributorRequestsForUserAndPlaylist(
        { requesterUserId: authUser.uid, playlistId: matchParams.playlistId },
      );
      updateData({
        ...data,
        playlist: playlist,
        playlistResources: playlistResources,
        isLoading: false,
        playlistCreator: playlistCreator,
        playlistContributors: playlistContributors,
        pendingContributorRequestsForThisPlaylist: pendingContributorRequestsForThisPlaylist,
        userLatestViewLogs,
      });
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
      updateData({
        ...data,
        isLoading: false,
        error: error,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const getShiftedResourceIds = (
  resourceId: string,
  isUp: boolean,
  playlist: DataTypes.Playlist,
  sectionIndex: number,
): Array<string> => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return [];
  }
  const index = playlist.sections.findIndex(
    section => section.sectionIndex === sectionIndex,
  );
  const resources = playlist.sections[index].resources;
  const oldIndex = resources.findIndex(id => resourceId === id);
  if (isUp) {
    const newIndex = oldIndex > 0 ? oldIndex - 1 : 0;
    return arrayMove(resources, oldIndex, newIndex);
  } else {
    const newIndex =
      oldIndex < resources.length - 1 ? oldIndex + 1 : resources.length - 1;
    return arrayMove(resources, oldIndex, newIndex);
  }
};

const updatePlaylistSection = async (
  resourceIds: Array<string>,
  title: string,
  description: string,
  playlistId: string,
  sectionIndex: number,
  userId: string,
): Promise<{
  updateSectionResponse: Object;
  error: Error;
}> => {
  try {
    const updateSectionResponse = await RESTAPIClient.Playlist.updateSection(
      playlistId,
      sectionIndex,
      userId,
      title,
      description,
      resourceIds,
    );
    return {
      updateSectionResponse: updateSectionResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      updateSectionResponse: null,
      error: error,
    };
  }
};

export {
  useFetchEditPlaylistData,
  getShiftedResourceIds,
  updatePlaylistSection,
};

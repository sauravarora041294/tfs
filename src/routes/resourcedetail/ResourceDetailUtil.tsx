import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface ResourceDetailData {
  isLoading: boolean;
  isPublic: boolean;
  currentResource: DataTypes.Resource;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  relatedResources: Array<DataTypes.Resource>;
  contributors: Array<DataTypes.User>;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  error?: Error;
  userRating?: number;
}

const getNextResourceId = (
  currentResourceId: string,
  orderedResourceIds: Array<string>,
  userLatestViewlogs: DataTypes.UserLatestViewlogs,
): string | undefined => {
  const currentResourceIndex = orderedResourceIds.indexOf(currentResourceId);
  const nextResources = orderedResourceIds.slice(currentResourceIndex + 1);
  if (!userLatestViewlogs || Object.keys(userLatestViewlogs).length == 0) {
    return nextResources[0];
  }
  const viewlogs = Object.values(userLatestViewlogs.resourceIdToLatestViewlog);
  const incompletedVideoViewlogs = viewlogs.filter(
    log => log.viewEndTime < 0.9,
  );
  const completedVideoViewlogs = viewlogs.filter(log => log.viewEndTime >= 0.9);

  const completedVideos = completedVideoViewlogs.map(log => log.resourceId);
  const incompletedVideos = incompletedVideoViewlogs.map(log => log.resourceId);
  const notYetViewedVideos = nextResources.filter(
    resourceId =>
      !incompletedVideos.includes(resourceId) &&
      !completedVideos.includes(resourceId),
  );

  const nextIncompleteResources = nextResources.filter(
    resourceId =>
      incompletedVideos.includes(resourceId) ||
      notYetViewedVideos.includes(resourceId),
  );
  return nextIncompleteResources[0];
};

const getOrderedResourcesForPlaylist = (
  playlist: DataTypes.Playlist,
  playlistResources: Array<DataTypes.Resource>,
): Array<DataTypes.Resource> => {
  const resourceIds =
    (playlist.sections &&
      playlist.sections
        .map(section => section.resources)
        .reduce((acc, val) => acc.concat(val), [])) ||
    [];
  return resourceIds.map(resourceId =>
    playlistResources.find(resource => resource.objectID === resourceId),
  );
};

const getOrderedResourceIdsForPlaylist = (
  playlist: DataTypes.Playlist,
  playlistResources: Array<DataTypes.Resource>,
): Array<string> => {
  return (
    (playlist.sections &&
      playlist.sections
        .map(section => section.resources)
        .reduce((acc, val) => acc.concat(val), [])) ||
    []
  );
};

const getViewProgressByResourceId = (
  resourceId: string,
  userLatestViewlogs: DataTypes.UserLatestViewlogs,
): number => {
  const viewlog =
    userLatestViewlogs &&
    userLatestViewlogs.resourceIdToLatestViewlog &&
    userLatestViewlogs.resourceIdToLatestViewlog[resourceId];
  return viewlog ? viewlog.viewEndTime : 0;
};

interface ResourceDetailRouteData {
  currentResource: DataTypes.Resource;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  contributors: Array<DataTypes.User>;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  userRating?: number;
}

interface PlaylistAndResourceRouteData extends ResourceDetailRouteData {
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  contributors: Array<DataTypes.User>;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  relatedResources: Array<DataTypes.Content>;
}

interface PlaylistRouteData extends ResourceDetailRouteData {
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
}

interface ResourceRouteData extends ResourceDetailRouteData {
  relatedResources: Array<DataTypes.Resource>;
}

const getContributorStatus = async (
  resourceId: string,
  currentUserId: string,
) => {
  const resourceMissionContributors = await RESTAPIClient.Resource.getMissionContributors(
    resourceId,
  );
  const userPlaylistContributions = await RESTAPIClient.Playlist.getByContributorUserId(
    currentUserId,
  );
  const resource = await RESTAPIClient.Resource.get(resourceId);

  const userMissionContributions = (
    await RESTAPIClient.Mission.getByContributorUserId(currentUserId)
  ).map(mission => mission.objectID);

  const user = await RESTAPIClient.User.get(currentUserId);

  if (resource.playlistIds) {
    const promiseList =
      resource.playlistIds &&
      resource.playlistIds.map(async id => {
        try {
          const playlist = await RESTAPIClient.Playlist.get(id);
          const missionIds = playlist.missionIds.filter(mission => {
            return userMissionContributions.indexOf(mission) !== -1;
          });
          return missionIds && missionIds.length > 0;
        } catch (e) {
          return false;
        }
      });
    const commonMissions = await Promise.all(promiseList);
    if (!commonMissions.every(value => !value)) {
      resourceMissionContributors.push(user);
    }
  }

  const commonPlaylists = userPlaylistContributions.filter(playlist =>
    resource.playlistIds.includes(playlist.objectID),
  );

  if (commonPlaylists && commonPlaylists.length > 0)
    resourceMissionContributors.push(user);

  return resourceMissionContributors;
};
const getPublicResourceRouteData = async (
  matchParams,
): Promise<ResourceRouteData> => {
  const currentResource = await RESTAPIClient.Public.getResourceById(
    matchParams.resourceId,
  );
  const relatedResources = await RESTAPIClient.Public.getRelatedResources(
    matchParams.resourceId,
  );

  return {
    currentResource,
    relatedResources,
    userLatestViewlogs: null,
    qualityVerifications: null,
    contributors: null,
  };
};

const getResourceRouteData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
): Promise<ResourceRouteData> => {
  const currentResource = await RESTAPIClient.Resource.get(
    matchParams.resourceId,
  );
  const relatedResources = await RESTAPIClient.Resource.getRelated(
    matchParams.resourceId,
    currentUserId,
  );
  const userLatestViewlogs = await RESTAPIClient.Viewlog.getLatestForUserId(
    currentUserId,
  );
  const resourceQualityVerificationsByUser = await RESTAPIClient.QualityVerification.getByResourceAndUserId(
    { resourceId: matchParams.resourceId, userId: currentUserId },
  );
  const resourceMissionContributors = await RESTAPIClient.Resource.getMissionContributors(
    matchParams.resourceId,
  );
  const userRating = await RESTAPIClient.Rating.getForResourceByIds(
    currentUserId,
    matchParams.resourceId,
  );
  const userRatingValue = userRating ? userRating.rating : 0;
  const contributors = await getContributorStatus(
    matchParams.resourceId,
    currentUserId,
  );
  return {
    currentResource,
    relatedResources,
    userLatestViewlogs,
    qualityVerifications: resourceQualityVerificationsByUser,
    contributors,
    userRating: userRatingValue,
  };
};

const fetchQUalityVerifications = async (
  currentUserId: string,
  currentResourceId: string,
) => {
  try {
    const resourceQualityVerificationsByUser = await RESTAPIClient.QualityVerification.getByResourceAndUserId(
      { resourceId: currentResourceId, userId: currentUserId },
    );
    return { resourceQualityVerificationsByUser, error: null };
  } catch (error) {
    return { resourceQualityVerificationsByUser: null, error };
  }
};

const getPublicPlaylistAndResourceRouteData = async (
  matchParams,
): Promise<PlaylistAndResourceRouteData> => {
  const playlist = await RESTAPIClient.Public.getPlaylistById(
    matchParams.playlistId,
  );
  const currentResource = await RESTAPIClient.Public.getResourceById(
    matchParams.resourceId,
  );
  const playlistResources = await RESTAPIClient.Public.getResourceByPlaylistId(
    matchParams.playlistId,
  );
  return {
    currentResource,
    playlist: playlist,
    playlistResources: playlistResources,
    userLatestViewlogs: null,
    qualityVerifications: null,
    contributors: null,
    relatedResources: null,
  };
};

const getPlaylistAndResourceRouteData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
): Promise<PlaylistAndResourceRouteData> => {
  const playlist = await RESTAPIClient.Playlist.get(matchParams.playlistId);
  const currentResource = await RESTAPIClient.Resource.get(
    matchParams.resourceId,
  );
  const playlistResources = await RESTAPIClient.Resource.getByPlaylistId(
    matchParams.playlistId,
  );
  const userLatestViewlogs = await RESTAPIClient.Viewlog.getLatestForUserId(
    currentUserId,
  );
  const resourceQualityVerificationsByUser = await RESTAPIClient.QualityVerification.getByResourceAndUserId(
    { resourceId: matchParams.resourceId, userId: currentUserId },
  );
  const resourceMissionContributors = await RESTAPIClient.Resource.getMissionContributors(
    matchParams.resourceId,
  );
  const relatedResources = await RESTAPIClient.Resource.getRelated(
    matchParams.resourceId,
    currentUserId,
  );
  const userRating = await RESTAPIClient.Rating.getForResourceByIds(
    currentUserId,
    matchParams.resourceId,
  );
  const userRatingValue = userRating ? userRating.rating : 0;
  const relatedResourcesWithContentType = relatedResources.map(resource => {
    return { ...resource, contentType: resource.contentType || "resource" };
  });
  const contributors = await getContributorStatus(
    matchParams.resourceId,
    currentUserId,
  );
  return {
    currentResource,
    playlist: playlist,
    playlistResources: playlistResources,
    userLatestViewlogs: userLatestViewlogs,
    qualityVerifications: resourceQualityVerificationsByUser,
    contributors,
    relatedResources: relatedResourcesWithContentType,
    userRating: userRatingValue,
  };
};

const getPublicPlaylistRouteData = async (
  matchParams,
): Promise<PlaylistRouteData> => {
  const playlist = await RESTAPIClient.Public.getPlaylistById(
    matchParams.playlistId,
  );
  const playlistResources = await RESTAPIClient.Public.getResourceByPlaylistId(
    matchParams.playlistId,
  );
  const orderedPlaylistResources = getOrderedResourcesForPlaylist(
    playlist,
    playlistResources,
  );
  const firstResourceInPlaylist =
    orderedPlaylistResources.length > 0 ? orderedPlaylistResources[0] : null;
  return {
    currentResource: firstResourceInPlaylist,
    playlist: playlist,
    playlistResources: playlistResources,
    userLatestViewlogs: null,
    qualityVerifications: null,
    contributors: null,
  };
};

const getPlaylistRouteData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
): Promise<PlaylistRouteData> => {
  const playlist = await RESTAPIClient.Playlist.get(matchParams.playlistId);
  const playlistResources = await RESTAPIClient.Resource.getByPlaylistId(
    matchParams.playlistId,
  );
  const userLatestViewlogs = await RESTAPIClient.Viewlog.getLatestForUserId(
    currentUserId,
  );
  const orderedPlaylistResources = getOrderedResourcesForPlaylist(
    playlist,
    playlistResources,
  );
  const firstResourceInPlaylist =
    orderedPlaylistResources.length > 0 ? orderedPlaylistResources[0] : null;

  return {
    currentResource: firstResourceInPlaylist,
    playlist: playlist,
    playlistResources: playlistResources,
    userLatestViewlogs: userLatestViewlogs,
    qualityVerifications: null,
    contributors: null,
  };
};

const getPublicPathSpecificData = async matchParams => {
  if (matchParams.playlistId && matchParams.resourceId) {
    return getPublicPlaylistAndResourceRouteData(matchParams);
  } else if (matchParams.playlistId) {
    return getPublicPlaylistRouteData(matchParams);
  } else if (matchParams.resourceId) {
    return getPublicResourceRouteData(matchParams);
  }
};

const getPathSpecificData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
) => {
  if (matchParams.playlistId && matchParams.resourceId) {
    return getPlaylistAndResourceRouteData(
      pathname,
      currentUserId,
      matchParams,
    );
  } else if (matchParams.playlistId) {
    return getPlaylistRouteData(pathname, currentUserId, matchParams);
  } else if (matchParams.resourceId) {
    return getResourceRouteData(pathname, currentUserId, matchParams);
  }
};

const useFetchResourceDetailData = (
  authUser,
  pathname,
  matchParams,
  isPublic,
): ResourceDetailData => {
  const [data, updateData] = React.useState<ResourceDetailData>({
    isLoading: true,
    isPublic: isPublic,
    currentResource: null,
    playlist: null,
    playlistResources: null,
    userLatestViewlogs: null,
    relatedResources: null,
    qualityVerifications: [],
    contributors: [],
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      if (isPublic) {
        const publicPathSpecificData = await getPublicPathSpecificData(
          matchParams,
        );
        updateData({
          ...data,
          ...publicPathSpecificData,
          isLoading: false,
        });
      } else {
        const pathSpecificData = await getPathSpecificData(
          pathname,
          authUser.uid,
          matchParams,
        );
        updateData({
          ...data,
          ...pathSpecificData,
          isLoading: false,
          isPublic,
          //contributors: resourceMissionContributors,
        });
      }
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

export {
  fetchQUalityVerifications,
  getNextResourceId,
  getViewProgressByResourceId,
  useFetchResourceDetailData,
  getOrderedResourcesForPlaylist,
  getOrderedResourceIdsForPlaylist,
};

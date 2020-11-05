import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

export const HITS_PER_PAGE = 6;

interface CreatorsHubDashboardState {
  isLoading: boolean;
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  myContributingMissions: Array<DataTypes.Mission>;
  myContributingPlaylists: Array<DataTypes.Playlist>;
  allMissions: Array<DataTypes.Mission>;
  pendingMissionContributorRequests: Array<DataTypes.Request>;
  pointCounts: DataTypes.PointCounts;
  userViewCounts: DataTypes.UserViewCounts;
  userUniqueViewCounts: DataTypes.UserUniqueViewCounts;
  activityNotifications: Array<DataTypes.ActivityNotification>;
  error?: Error;
  missionsNotJoined?: Array<DataTypes.Mission>;
  playlistsToJoin?: Array<DataTypes.Playlist>;
  pendingMissionRequests?: Array<DataTypes.Request>;
}

interface CreatorsHubDashboardRouteSpecificData { }

interface PrimaryRouteData extends CreatorsHubDashboardRouteSpecificData {
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  myContributingMissions: Array<DataTypes.Mission>;
  myContributingPlaylists: Array<DataTypes.Playlist>;
  allMissions: Array<DataTypes.Mission>;
  pendingMissionContributorRequests: Array<DataTypes.Request>;
  pointCounts: DataTypes.PointCounts;
  userViewCounts: DataTypes.UserViewCounts;
  userUniqueViewCounts: DataTypes.UserUniqueViewCounts;
  activityNotifications: Array<DataTypes.ActivityNotification>;
  missionsNotJoined: Array<DataTypes.Mission>;
  playlistsToJoin: Array<DataTypes.Playlist>;
  pendingMissionRequests: Array<DataTypes.Request>;
}

const tabKeyToContentType = (tabKey: string) => {
  switch (tabKey) {
    case "1":
      return Enums.CONTENT_TYPE.MISSION
    case "2":
      return Enums.CONTENT_TYPE.PLAYLIST
  }
}

const getActivityNotifications = async (
  currentUserId: string,
): Promise<Array<DataTypes.ActivityNotification>> => {
  return await RESTAPIClient.Activity.getNotificationsByUserId({
    creatorUserId: currentUserId,
  });
};

const searchContentToJoin = async (params: {
  creatorUserId: string;
  searchString: string;
  pageSize?: number;
  contentType?: Enums.CONTENT_TYPE;
  currentPage?: number;
}) => {
  return await RESTAPIClient.Content.searchContentToJoin({
    userId: params.creatorUserId,
    searchString: params.searchString,
    currentPage: params.currentPage,
    pageSize: params.pageSize || HITS_PER_PAGE,
    contentType: params.contentType,
  });
}

const getPrimaryRouteData = async (
  currentUserId: string,
): Promise<PrimaryRouteData> => {
  const myMissions = await RESTAPIClient.Mission.getByCreatorUserId(
    currentUserId,
  );
  const myPlaylists = await RESTAPIClient.Playlist.getUploadedByUser(
    currentUserId,
  );
  const myResources = await RESTAPIClient.Resource.getUploadedByUser(
    currentUserId,
  );
  const myContributingMissions = await RESTAPIClient.Mission.getByContributorUserId(
    currentUserId,
  );
  const myContributingPlaylists = await RESTAPIClient.Playlist.getUploadedByUser(
    currentUserId,
  );
  const allMissions = await RESTAPIClient.Mission.getAll();
  const contributingMissionIds = myContributingMissions.map(
    mission => mission.objectID,
  );
  const creators = await RESTAPIClient.Creator.getAll();
  const pendingMissionContributorRequests = await RESTAPIClient.Request.getPendingMissionContributorRequestsForUser(
    { requesterUserId: currentUserId },
  );
  const pointCounts = await RESTAPIClient.Creator.getPointStatsForUser(
    currentUserId,
  );
  const userViewCounts = await RESTAPIClient.Creator.getViewStatsForUser(
    currentUserId,
  );
  const userUniqueViewCounts = await RESTAPIClient.Creator.getUniqueViewStatsForUser(
    currentUserId,
  );
  const activityNotifications = await RESTAPIClient.Activity.getNotificationsByUserId(
    {
      creatorUserId: currentUserId,
    },
  );
  const pendingMissionRequests = await RESTAPIClient.Request.getPendingMissionContributorRequestsForUser(
    { requesterUserId: currentUserId },
  );

  const playlistsToJoin = (await searchContentToJoin({
    creatorUserId: currentUserId,
    searchString: "",
    currentPage: 0,
    contentType: Enums.CONTENT_TYPE.PLAYLIST
  })).results as Array<DataTypes.Playlist>

  const missionsNotJoined = (await searchContentToJoin({
    creatorUserId: currentUserId,
    searchString: "",
    currentPage: 0,
    contentType: Enums.CONTENT_TYPE.MISSION
  })).results as Array<DataTypes.Mission>

  return {
    myMissions,
    myPlaylists,
    myResources,
    myContributingMissions,
    myContributingPlaylists,
    allMissions,
    pendingMissionContributorRequests,
    pointCounts,
    userViewCounts,
    userUniqueViewCounts,
    activityNotifications,
    missionsNotJoined,
    playlistsToJoin,
    pendingMissionRequests,
  };
};

const getPathSpecificData = async (
  pathname,
  currentUserId,
  matchParams,
): Promise<CreatorsHubDashboardRouteSpecificData> => {
  return await getPrimaryRouteData(currentUserId);
};

const useFetchCreatorsHubData = (authUser, pathname, matchParams) => {
  const [data, updateData] = React.useState<CreatorsHubDashboardState>({
    isLoading: true,
    myMissions: null,
    myPlaylists: null,
    myResources: null,
    myContributingMissions: null,
    myContributingPlaylists: null,
    allMissions: null,
    pendingMissionContributorRequests: null,
    pointCounts: null,
    userViewCounts: null,
    userUniqueViewCounts: null,
    activityNotifications: null,
  });

  const fetchData = async (): Promise<void> => {
    const routeSpecificData = await getPathSpecificData(
      pathname,
      authUser.uid,
      matchParams,
    );

    updateData({
      ...data,
      ...routeSpecificData,
      isLoading: false,
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const getCurrentMonthString = () => {
  const date = new Date();
  return date.getMonth() + 1 + "-" + date.getFullYear();
};

const createJoinMissionRequest = async (userId: String, missionId: String) => {
  try {
    const result = await RESTAPIClient.Request.createForMissionContributor({
      requesterUserId: userId,
      missionId,
    });
    if (result) return result;
  } catch (err) {
    return null;
  }
};

const createJoinPlaylistRequest = async (
  userId: String,
  playlistId: String,
) => {
  try {
    const result = await RESTAPIClient.Request.createForPlaylistContributor({
      requesterUserId: userId,
      playlistId,
    });
    if (result) return result;
  } catch (err) {
    return null;
  }
};

const fetchPendingRequestData = async (userId: String) => {
  const pendingMissionRequests = await RESTAPIClient.Request.getPendingMissionContributorRequestsForUser(
    { requesterUserId: userId },
  );

  return pendingMissionRequests;
};
export {
  useFetchCreatorsHubData,
  getCurrentMonthString,
  createJoinMissionRequest,
  createJoinPlaylistRequest,
  fetchPendingRequestData,
  getActivityNotifications,
  tabKeyToContentType,
  searchContentToJoin
};

import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

export const HITS_PER_PAGE = 5;

interface MissionData {
  isLoading: boolean;
  mission: DataTypes.Mission;
  contributors: Array<DataTypes.Creator>;
  contentRequests: Array<DataTypes.ContentRequest>;
  resources: Array<DataTypes.Resource>;
  playlists: Array<DataTypes.Playlist>;
  searchContent: Array<DataTypes.Content>;
  searchContentPlaylists: Array<DataTypes.Content>;
  searchContentResources: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  recentlyAddedContent: Array<DataTypes.Content>;
  publiclyPreviewableContent?: Array<DataTypes.Content>;
  topRatedContent?: Array<DataTypes.Content>;
  viewlogs: DataTypes.UserLatestViewlogs;
  searchText: string;
  error?: Error;
}

interface MissionRouteDataByPublicStatus {
  mission: DataTypes.Mission;
  routeSpecificData: MissionRouteSpecificData;
  currentUser?: DataTypes.User;
  contributors?: Array<DataTypes.Creator>;
  contentRequests?: Array<DataTypes.ContentRequest>;
}

interface MissionRouteSpecificData {
  viewlogs: DataTypes.UserLatestViewlogs;
}

interface SearchRouteData extends MissionRouteSpecificData {
  searchText: string;
  searchContent: Array<DataTypes.Content>;
  searchContentPlaylists: Array<DataTypes.Content>;
  searchContentResources: Array<DataTypes.Content>;
  error?: Error;
}

interface PublicPrimaryRouteData extends MissionRouteSpecificData {
  recentlyAddedContent: Array<DataTypes.Content>;
  publiclyPreviewableContent: Array<DataTypes.Content>;
  error?: Error;
}

interface PrimaryRouteData extends MissionRouteSpecificData {
  recentlyAddedContent: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  topRatedContent?: Array<DataTypes.Content>;
  playlists?: Array<DataTypes.Playlist>;
  resources?: Array<DataTypes.Resource>;
  error?: Error;
}

const tabKeyToContentType = (tabKey: string) => {
  switch (tabKey) {
    case "1":
      return Enums.CONTENT_TYPE.ALL;
    case "2":
      return Enums.CONTENT_TYPE.PLAYLIST;
    case "3":
      return Enums.CONTENT_TYPE.RESOURCE;
  }
};

const useFetchMissionData = (
  authUser,
  pathname,
  matchParams,
  isPublic,
): MissionData => {
  const [data, updateData] = React.useState<MissionData>({
    isLoading: true,
    mission: null,
    contributors: [],
    contentRequests: [],
    resources: [],
    playlists: [],
    searchContent: null,
    recommendedContent: null,
    recentlyAddedContent: null,
    viewlogs: null,
    searchText: null,
    error: null,
    searchContentPlaylists: [],
    searchContentResources: [],
  });

  const fetchData = async (): Promise<void> => {
    const missionId = matchParams.missionId;
    const userId = authUser && authUser.uid;

    try {
      const {
        mission,
        contributors,
        contentRequests,
        routeSpecificData,
      } = await getDataByPublicStatus(
        userId,
        missionId,
        pathname,
        matchParams,
        isPublic,
      );

      updateData({
        ...data,
        ...routeSpecificData,
        mission,
        contributors,
        contentRequests,
        isLoading: false,
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

const saveFormData = async (
  userId: string,
  missionId: string,
  description: string,
) => {
  try {
    const contentRequestResponse = await RESTAPIClient.ContentRequest.create(
      userId,
      missionId,
      description,
    );
    return {
      contentRequestResponse: contentRequestResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      contentRequestResponse: null,
      error: error,
    };
  }
};

const getDataByPublicStatus = async (
  userId,
  missionId,
  pathname,
  matchParams,
  isPublic,
): Promise<MissionRouteDataByPublicStatus> => {
  if (isPublic) {
    const mission = await RESTAPIClient.Public.getMissionById(missionId);
    const routeSpecificData = await getPublicPathSpecificData(
      pathname,
      matchParams,
    );
    const missionContributors = await RESTAPIClient.Public.getPubliclyPreviewableContributorsSortedByContribution(
      missionId,
    );
    return {
      contributors: missionContributors,
      mission,
      routeSpecificData,
    };
  } else {
    const mission = await RESTAPIClient.Mission.get(missionId);
    const currentUser = await RESTAPIClient.User.get(userId);
    const missionContributors = await RESTAPIClient.Mission.getContributorsSortedByContribution(
      missionId,
    );
    const missionContentRequests = await RESTAPIClient.ContentRequest.getByMissionId(
      missionId,
    );
    const routeSpecificData = await getPathSpecificData(
      pathname,
      userId,
      matchParams,
    );
    return {
      currentUser,
      mission,
      contributors: missionContributors,
      contentRequests: missionContentRequests,
      routeSpecificData,
    };
  }
};

const getPublicPathSpecificData = async (
  pathname,
  matchParams,
): Promise<MissionRouteSpecificData> => {
  if (matchParams.missionId && matchParams.searchText) {
    return await getPublicSearchRouteData(
      matchParams.searchText,
      matchParams.missionId,
    );
  } else if (matchParams.missionId) {
    return await getPublicPrimaryRouteData(matchParams.missionId);
  }
  return {} as MissionRouteSpecificData;
};

const getPathSpecificData = async (
  pathname,
  currentUserId,
  matchParams,
): Promise<MissionRouteSpecificData> => {
  if (matchParams.missionId && matchParams.searchText) {
    return await getSearchRouteData(
      matchParams.searchText,
      currentUserId,
      matchParams.missionId,
    );
  } else if (matchParams.missionId) {
    return await getPrimaryRouteData(currentUserId, matchParams.missionId);
  }
  return {} as MissionRouteSpecificData;
};

const getPublicSearchRouteData = async (
  searchText: string,
  missionId: string,
  currentPage: number = 0,
  pageSize: number = 5,
): Promise<SearchRouteData> => {
  try {
    const {
      results,
      viewlogs,
    } = await RESTAPIClient.Public.getContentInMissionBySearchString(
      missionId,
      searchText,
      currentPage,
      pageSize,
    );
    return {
      searchContent: results,
      viewlogs,
      searchText: searchText,
      searchContentPlaylists: [],
      searchContentResources: [],
    };
  } catch (error) {
    return {
      searchContent: [],
      viewlogs: null,
      searchText: searchText,
      error: error,
      searchContentPlaylists: [],
      searchContentResources: [],
    };
  }
};

const getSearchRouteData = async (
  searchText: string,
  userId: string,
  missionId: string,
  currentPage: number = 0,
  pageSize: number = 5,
): Promise<SearchRouteData> => {
  try {
    const {
      results,
      viewlogs,
    } = await RESTAPIClient.Content.getContentInMissionBySearchString(
      searchText,
      userId,
      missionId,
      currentPage,
      pageSize,
    );
    const playlists = await RESTAPIClient.Content.getContentInMissionBySearchString(
      searchText,
      userId,
      missionId,
      currentPage,
      pageSize,
      Enums.CONTENT_TYPE.PLAYLIST,
    );
    const resources = await RESTAPIClient.Content.getContentInMissionBySearchString(
      searchText,
      userId,
      missionId,
      currentPage,
      pageSize,
      Enums.CONTENT_TYPE.RESOURCE,
    );
    return {
      searchContent: results,
      searchContentResources: resources.results,
      searchContentPlaylists: playlists.results,
      viewlogs,
      searchText: searchText,
    };
  } catch (error) {
    return {
      searchContent: [],
      searchContentResources: [],
      searchContentPlaylists: [],
      viewlogs: null,
      searchText: searchText,
      error: error,
    };
  }
};

const getPublicPrimaryRouteData = async (
  missionId: string,
): Promise<PublicPrimaryRouteData> => {
  try {
    const publiclyPreviewableContent = await RESTAPIClient.Public.getPubliclyPreviewableContentInMission(
      missionId,
    );
    const recentlyAddedContent = await RESTAPIClient.Public.getRecentlyAddedContentInMission(
      missionId,
    );

    const recentlyAddedWithoutPublicContent = recentlyAddedContent.results.filter(
      c => !c.isPubliclyPreviewable,
    );
    return {
      publiclyPreviewableContent: publiclyPreviewableContent.results,
      recentlyAddedContent: recentlyAddedWithoutPublicContent,
      viewlogs: null,
    };
  } catch (error) {
    console.log(`RouteFetchDataError: ${error}`);
    return {
      publiclyPreviewableContent: [],
      recentlyAddedContent: [],
      viewlogs: null,
      error: error,
    };
  }
};

const getPrimaryRouteData = async (
  userId: string,
  missionId: string,
): Promise<PrimaryRouteData> => {
  try {
    const recentlyAddedContent = await RESTAPIClient.Content.getRecentlyAddedContentInMission(
      userId,
      missionId,
    );
    const recommendedContent = await RESTAPIClient.Content.getRecommendedContentInMission(
      userId,
      missionId,
    );
    const topRatedContent = await RESTAPIClient.Mission.getTopRatedContent({
      missionId,
      order: Enums.ORDER_BY.DESCENDING,
    });
    const playlists = await RESTAPIClient.Content.getContentInMissionBySearchString(
      "",
      userId,
      missionId,
      0,
      HITS_PER_PAGE,
      Enums.CONTENT_TYPE.PLAYLIST,
    );
    const resources = await RESTAPIClient.Content.getContentInMissionBySearchString(
      "",
      userId,
      missionId,
      0,
      HITS_PER_PAGE,
      Enums.CONTENT_TYPE.RESOURCE,
    );
    return {
      recentlyAddedContent: recentlyAddedContent.results,
      recommendedContent: recommendedContent.results,
      viewlogs: recentlyAddedContent.viewlogs,
      topRatedContent: topRatedContent.results,
      resources: resources.results as Array<DataTypes.Resource>,
      playlists: playlists.results as Array<DataTypes.Playlist>,
    };
  } catch (error) {
    console.log(`RouteFetchDataError: ${error}`);
    return {
      recentlyAddedContent: [],
      recommendedContent: [],
      viewlogs: null,
      error: error,
    };
  }
};

export {
  useFetchMissionData,
  saveFormData,
  getSearchRouteData,
  getPublicSearchRouteData,
  tabKeyToContentType,
};

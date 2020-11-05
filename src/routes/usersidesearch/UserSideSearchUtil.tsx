import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

export const HITS_PER_PAGE = 5;

interface UserSideSearchData {
  isLoading: boolean;
  searchText: string;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  error?: Error;
  numHits: number;
  contentSearchResults: {
    all: Array<DataTypes.Content>;
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  }
}

const tabKeyToContentType = (tabKey: string) => {
  switch (tabKey) {
    case "1":
      return Enums.CONTENT_TYPE.ALL
    case "2":
      return Enums.CONTENT_TYPE.MISSION
    case "3":
      return Enums.CONTENT_TYPE.PLAYLIST
    case "4":
      return Enums.CONTENT_TYPE.RESOURCE
  }
}

const getMyDashboardSearchRouteData = async (
  currentUserId: string,
  searchString: string,
  currentPage: number = 0,
  pageSize: number = 5,
) => {
  try {
    const allContentSearchResults = await RESTAPIClient.Content.getBySearchString({
      searchString,
      userId: currentUserId,
      currentPage,
      pageSize,
    });
    const missionSearchResults = await RESTAPIClient.Content.getBySearchString({
      searchString,
      userId: currentUserId,
      currentPage,
      pageSize,
      contentType: Enums.CONTENT_TYPE.MISSION
    });
    const playlistsSearchResults = await RESTAPIClient.Content.getBySearchString({
      searchString,
      userId: currentUserId,
      currentPage,
      pageSize,
      contentType: Enums.CONTENT_TYPE.PLAYLIST
    });
    const resourceSearchResults = await RESTAPIClient.Content.getBySearchString({
      searchString,
      userId: currentUserId,
      currentPage,
      pageSize,
      contentType: Enums.CONTENT_TYPE.RESOURCE
    });
    return {
      contentSearchResults: {
        all: allContentSearchResults.results,
        mission: missionSearchResults.results,
        playlist: playlistsSearchResults.results,
        resource: resourceSearchResults.results
      },
      userLatestViewlogs: allContentSearchResults.viewlogs,
      numHits: allContentSearchResults.numHits,
      searchText: searchString
    }
  } catch (error) {
    return {
      userLatestViewlogs: null,
      searchResults: [],
      searchText: searchString,
      error: error,
    };
  }
};

const getPathSpecificData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
) => {
  return getMyDashboardSearchRouteData(currentUserId, matchParams.searchText);
};

const useFetchUserSideSearchData = (
  authUser: firebase.User,
  pathname: string,
  matchParams,
): UserSideSearchData => {
  const [data, updateData] = React.useState<UserSideSearchData>({
    isLoading: true,
    searchText: null,
    userLatestViewlogs: null,
    error: null,
    numHits: null,
    contentSearchResults: null
  });

  const fetchData = async (): Promise<void> => {
    try {
      const pathSpecificData = await getPathSpecificData(
        pathname,
        authUser.uid,
        matchParams,
      );
      updateData({
        ...data,
        ...pathSpecificData,
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

export { getMyDashboardSearchRouteData, useFetchUserSideSearchData, tabKeyToContentType };

import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

export const HITS_PER_PAGE = 20;

interface CreatorsHubDashboardState {
  isLoading: boolean;
  contentSearchResults: Array<DataTypes.Content>;
  creatorSearchResults: Array<DataTypes.Creator>;
  viewlogs: DataTypes.UserLatestViewlogs;
  error?: Error;
}

const getSearchResults = async (
  currentUserId: string,
  searchText: string,
  currentPage?: number,
  pageSize: number = 20,
) => {
  return await RESTAPIClient.Content.getByCreatorIdAndSearchString(
    currentUserId,
    searchText,
    currentPage,
    pageSize,
  );
};

const useFetchCreatorsHubSearchData = (authUser, pathname, matchParams) => {
  const [data, updateData] = React.useState<CreatorsHubDashboardState>({
    isLoading: true,
    contentSearchResults: null,
    creatorSearchResults: null,
    viewlogs: null,
  });

  const fetchData = async (): Promise<void> => {
    const { searchResults, viewlogs } = await getSearchResults(
      authUser.uid,
      matchParams.searchText,
      0,
    );
    updateData({
      ...data,
      contentSearchResults: searchResults.content,
      creatorSearchResults: searchResults.creators,
      viewlogs: viewlogs,
      isLoading: false,
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export { getSearchResults, useFetchCreatorsHubSearchData };

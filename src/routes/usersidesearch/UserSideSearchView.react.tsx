import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import s from "./UserSideSearch.module.scss";
import {
  UserSideSearchStateActionTypes,
  userSideSearchReducer,
  userSideSearchStateInit,
} from "./UserSideSearchReducer";
import UserSideSearchResultsView from "./UserSideSearchResultsView.react";
import {
  HITS_PER_PAGE,
  tabKeyToContentType
} from "./UserSideSearchUtil";
import _ from "lodash";
import RESTAPIClient from "RESTAPIClient";


interface Props {
  currentUser: DataTypes.User;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  windowLocation: {
    pathname: string;
  };
  searchText: string;
  error?: Error;
  numHits: number;
  contentSearchResults: {
    all: Array<DataTypes.Content>;
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  }
}

const UserSideSearchView: React.FC<Props> = (props: Props) => {
  const [userSideSearchState, dispatch] = React.useReducer(
    userSideSearchReducer,
    {
      currentUser: props.currentUser,
      userLatestViewlogs: props.userLatestViewlogs,
      windowLocation: props.windowLocation,
      searchText: props.searchText,
      numHits: props.numHits,
      currentContentResultPages: {
        all: 1,
        mission: 1,
        playlist: 1,
        resource: 1
      },
      contentSearchResults: props.contentSearchResults,
      activeTabKey: "1",
      hasMoreContent: {
        all: true,
        mission: true,
        playlist: true,
        resource: true
      }
    },
    userSideSearchStateInit,
  );

  const handleLoadMore = async (currentPage: number, contentType: Enums.CONTENT_TYPE) => {
    contentType = tabKeyToContentType(userSideSearchState.activeTabKey)
    try {
      const searchResultsResponse = await RESTAPIClient.Content.getBySearchString({
        searchString: userSideSearchState.searchText,
        userId: userSideSearchState.currentUser.userId,
        currentPage: userSideSearchState.currentContentResultPages[contentType],
        pageSize: HITS_PER_PAGE,
        contentType: contentType
      });
      if (!searchResultsResponse.results || searchResultsResponse.results.length === 0) {
        dispatch({
          type: UserSideSearchStateActionTypes.END_FETCHING_NEXT_RESULTS,
          hasMoreContent: {
            ...userSideSearchState.hasMoreContent,
            [contentType]: false
          }
        });
      }
      if (searchResultsResponse.results) {
        dispatch({
          type:
            UserSideSearchStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY,
          contentSearchResults: {
            ...userSideSearchState.contentSearchResults,
            [contentType]: [
              ...userSideSearchState.contentSearchResults[contentType],
              ...searchResultsResponse.results
            ]
          },
          currentContentResultPages: {
            ...userSideSearchState.currentContentResultPages,
            [contentType]: userSideSearchState.currentContentResultPages[contentType] + 1
          }
        });
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  return (
    <div className={s.userSideSearchRoot}>
      <UserSideSearchResultsView
        contentSearchResults={userSideSearchState.contentSearchResults}
        userLatestViewlogs={userSideSearchState.userLatestViewlogs}
        searchText={userSideSearchState.searchText}
        loadMore={handleLoadMore}
        hasMoreContent={userSideSearchState.hasMoreContent}
        numHits={props.numHits}
        activeTabKey={userSideSearchState.activeTabKey}
        onTabChange={(activeTabKey: string) => {
          dispatch({
            type: UserSideSearchStateActionTypes.SET_ACTIVE_TAB_KEY,
            activeTabKey: activeTabKey
          })
        }}
      />
    </div>
  );
};

export default UserSideSearchView;

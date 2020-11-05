import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { History, Location } from "history";
import s from "./CreatorsHubSearch.module.scss";
import { getSearchResults, HITS_PER_PAGE } from "./CreatorsHubSearchUtil";
import {
  creatorsHubSearchReducer,
  creatorsHubSearchStateInit,
  CreatorsHubSearchStateActionTypes,
} from "./CreatorsHubSearchReducer";
import CreatorsHubSearchResultsView from "./CreatorsHubSearchResultsView.react";

interface Props {
  currentUser: DataTypes.Creator;
  searchText: string;
  contentSearchResults: Array<DataTypes.Content>;
  creatorSearchResults: Array<DataTypes.Creator>;
  viewlogs: DataTypes.UserLatestViewlogs;
  pathname: string;
  history?: History;
  location?: Location;
  error?: Error;
}

const CreatorsHubView: React.FC<Props> = (props: Props) => {
  const [creatorsHubSearchState, dispatch] = React.useReducer(
    creatorsHubSearchReducer,
    {
      currentUser: props.currentUser,
      searchText: props.searchText,
      contentSearchResults: props.contentSearchResults,
      creatorSearchResults: props.creatorSearchResults,
      viewlogs: props.viewlogs,
      pathname: props.pathname,
    },
    creatorsHubSearchStateInit,
  );

  const handleLoadMore = async (currentPage: number) => {
    try {
      const fetchDataResponse = await getSearchResults(
        creatorsHubSearchState.currentUser.userId,
        creatorsHubSearchState.searchText,
        currentPage,
      );

      const contentSearchResults = fetchDataResponse.searchResults.content;
      const creatorSearchResults = fetchDataResponse.searchResults.creators;

      if (contentSearchResults || creatorSearchResults) {
        dispatch({
          type:
            CreatorsHubSearchStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY,
          searchResults: fetchDataResponse.searchResults,
        });
      }
      if (
        !contentSearchResults ||
        contentSearchResults.length < HITS_PER_PAGE
      ) {
        dispatch({
          type:
            CreatorsHubSearchStateActionTypes.END_FETCHING_NEXT_CONTENT_RESULTS,
        });
      }
      if (
        !creatorSearchResults ||
        creatorSearchResults.length < HITS_PER_PAGE
      ) {
        dispatch({
          type:
            CreatorsHubSearchStateActionTypes.END_FETCHING_NEXT_CREATOR_RESULTS,
        });
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  return (
    <div className={s.creatorsHubRoot}>
      <CreatorsHubSearchResultsView
        contentSearchResults={creatorsHubSearchState.contentSearchResults}
        creatorSearchResults={creatorsHubSearchState.creatorSearchResults}
        viewlogsByResourceId={creatorsHubSearchState.viewlogs}
        searchText={props.searchText}
        loadMore={handleLoadMore}
        hasMoreCreators={creatorsHubSearchState.hasMoreCreators}
        hasMoreContent={creatorsHubSearchState.hasMoreContent}
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(CreatorsHubView);

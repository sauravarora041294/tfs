import * as DataTypes from "data/types";

interface CreatorsHubSearchState {
  currentUser?: DataTypes.User;
  searchText?: string;
  contentSearchResults?: Array<DataTypes.Content>;
  creatorSearchResults?: Array<DataTypes.Creator>;
  viewlogs?: DataTypes.UserLatestViewlogs;
  pathname?: string;
  activeTabKey?: string;
  hasMoreCreators?: boolean;
  hasMoreContent?: boolean;
}

interface SearchResults {
  content: Array<DataTypes.Content>;
  creators: Array<DataTypes.Creator>;
}

interface CreatorsHubSearchStateAction {
  type: string;
  activeTabKey?: string;
  searchResults?: SearchResults;
}

enum CreatorsHubSearchStateActionTypes {
  END_FETCHING_NEXT_CREATOR_RESULTS = "END_FETCHING_NEXT_CREATOR_RESULTS",
  END_FETCHING_NEXT_CONTENT_RESULTS = "END_FETCHING_NEXT_CONTENT_RESULTS",
  FETCHED_NEXT_RESULTS_SUCCESSFULLY = "FETCHED_NEXT_RESULTS_SUCCESSFULLY",
  UPDATE_ACTIVE_TAB_KEY = "UPDATE_ACTIVE_TAB_KEY",
}

const creatorsHubSearchStateInit = (
  initialState: CreatorsHubSearchState,
): CreatorsHubSearchState => {
  return {
    ...initialState,
    activeTabKey: "1",
    hasMoreContent: true,
    hasMoreCreators: true,
  };
};

const creatorsHubSearchReducer = (
  state: CreatorsHubSearchState,
  action: CreatorsHubSearchStateAction,
): CreatorsHubSearchState => {
  switch (action.type) {
    case CreatorsHubSearchStateActionTypes.END_FETCHING_NEXT_CONTENT_RESULTS:
      return { ...state, hasMoreContent: false };
    case CreatorsHubSearchStateActionTypes.END_FETCHING_NEXT_CREATOR_RESULTS:
      return { ...state, hasMoreCreators: false };
    case CreatorsHubSearchStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY:
      return {
        ...state,
        contentSearchResults: [
          ...state.contentSearchResults,
          ...action.searchResults.content,
        ],
        creatorSearchResults: [
          ...state.creatorSearchResults,
          ...action.searchResults.creators,
        ],
      };
    case CreatorsHubSearchStateActionTypes.UPDATE_ACTIVE_TAB_KEY:
      return {
        ...state,
        activeTabKey: action.activeTabKey,
      };
    default:
      return state;
  }
};

export {
  creatorsHubSearchStateInit,
  creatorsHubSearchReducer,
  CreatorsHubSearchStateActionTypes,
};

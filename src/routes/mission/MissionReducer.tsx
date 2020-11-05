import * as DataTypes from "data/types";

enum MissionDefaultViewTabs {
  HOME = "HOME",
  PLAYLIST = "PLAYLIST",
  VIDEOS = "VIDEOS",
  TOP_RATED = "TOP_RATED"
}

interface MissionState {
  isPublic: boolean;
  currentUser: DataTypes.User;
  mission: DataTypes.Mission;
  contributors: Array<DataTypes.Creator>;
  recentlyAddedContent: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  publiclyPreviewableContent: Array<DataTypes.Content>;
  viewlogs: DataTypes.UserLatestViewlogs;
  searchContent?: Array<DataTypes.Content>;
  topRatedContent?: Array<DataTypes.Content>;
  searchText?: string;
  hasMore?: boolean;
  paginatedSearchResults: {
    all: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  hasMoreSearchResults: {
    all: boolean;
    playlist: boolean;
    resource: boolean;
  };
  currentSearchResultsPage: {
    all: number;
    playlist: number;
    resource: number;
  };
  paginatedContent: {
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  hasMoreContent: {
    playlist: boolean;
    resource: boolean;
  };
  currentContentPage: {
    playlist: number;
    resource: number;
  };
  activeSearchResultsTabKey: string;
}

enum MissionStateActionTypes {
  END_FETCHING_NEXT_SEARCH_RESULTS = "END_FETCHING_NEXT_SEARCH_RESULTS",
  FETCHED_NEXT_SEARCH_RESULTS = "FETCHED_NEXT_SEARCH_RESULTS",
  FETCHED_NEXT_CONTENT = "FETCHED_NEXT_CONTENT",
  END_FETCHING_NEXT_CONTENT = "END_FETCHING_NEXT_CONTENT",
  SET_ACTIVE_SEARCH_RESULTS_TAB_KEY = "SET_ACTIVE_SEARCH_RESULTS_TAB_KEY"
}

interface MissionStateAction {
  type: string;
  searchContent?: Array<DataTypes.Content>;
  recentlyAddedContent?: Array<DataTypes.Content>;
  recommendedContent?: Array<DataTypes.Content>;
  topRatedContent?: Array<DataTypes.Content>;
  publiclyPreviewableContent?: Array<DataTypes.Content>;
  playlists?: Array<DataTypes.Playlist>;
  playlistResultsCurrentPage?: number;
  paginatedContent?: {
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  hasMoreContent?: {
    playlist: boolean;
    resource: boolean;
  };
  currentContentPage?: {
    playlist: number;
    resource: number;
  };
  paginatedSearchResults?: {
    all: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  hasMoreSearchResults?: {
    all: boolean;
    playlist: boolean;
    resource: boolean;
  };
  currentSearchResultsPage?: {
    all: number;
    playlist: number;
    resource: number;
  };
  activeSearchResultsTabKey?: string;
}

const missionStateInit = (initialState: MissionState): MissionState => {
  return {
    ...initialState,
    hasMore: true,
    hasMoreContent: {
      playlist: true,
      resource: true
    }
  };
};

const missionReducer = (state: MissionState, action: MissionStateAction) => {
  switch (action.type) {
    case MissionStateActionTypes.FETCHED_NEXT_SEARCH_RESULTS:
      return {
        ...state,
        paginatedSearchResults: {
          ...state.paginatedSearchResults,
          ...action.paginatedSearchResults
        },
        currentSearchResultsPage: {
          ...state.currentSearchResultsPage,
          ...action.currentSearchResultsPage
        }
      };
    case MissionStateActionTypes.END_FETCHING_NEXT_SEARCH_RESULTS:
      return {
        ...state,
        hasMoreSearchResults: {
          ...state.hasMoreSearchResults,
          ...action.hasMoreSearchResults
        }
      };
    case MissionStateActionTypes.FETCHED_NEXT_CONTENT:
      return {
        ...state,
        paginatedContent: {
          ...state.paginatedContent,
          ...action.paginatedContent
        },
        currentContentPage: {
          ...state.currentContentPage,
          ...action.currentContentPage
        }
      }
    case MissionStateActionTypes.END_FETCHING_NEXT_CONTENT:
      return {
        ...state,
        hasMoreContent: {
          ...state.hasMoreContent,
          ...action.hasMoreContent
        }
      }
    case MissionStateActionTypes.SET_ACTIVE_SEARCH_RESULTS_TAB_KEY:
      return {
        ...state,
        activeSearchResultsTabKey: action.activeSearchResultsTabKey
      }
    default:
      return state;
  }
};

export { MissionStateActionTypes, missionStateInit, missionReducer, MissionDefaultViewTabs };

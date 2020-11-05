import * as DataTypes from "data/types";

interface UserSideSearchState {
  currentUser: DataTypes.User;
  feedbackResponse?: string;
  searchResults?: Array<DataTypes.Content>;
  userLatestViewlogs?: DataTypes.UserLatestViewlogs;
  searchText?: string;
  featuredResults?: Array<DataTypes.Content>;
  recentResults?: Array<DataTypes.Content>;
  windowLocation: {
    pathname: string;
  };
  hasMore?: boolean;
  numHits?: number;
  currentContentResultPages: {
    all: number;
    mission: number;
    playlist: number;
    resource: number;
  },
  contentSearchResults: {
    all: Array<DataTypes.Content>;
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  },
  hasMoreContent: {
    all: boolean;
    mission: boolean;
    playlist: boolean;
    resource: boolean;
  },
  activeTabKey?: string;
}

enum UserSideSearchStateActionTypes {
  SET_FEEDBACK_RESPONSE = "SET_FEEDBACK_RESPONSE",
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  FETCHED_NEXT_RESULTS_SUCCESSFULLY = "FETCHED_NEXT_RESULTS_SUCCESSFULLY",
  END_FETCHING_NEXT_RESULTS = "END_FETCHING_NEXT_RESULTS",
  SET_ACTIVE_TAB_KEY = "SET_ACTIVE_TAB_KEY"
}

interface UserSideSearchStateAction {
  type: UserSideSearchStateActionTypes;
  viewlogs?: Array<DataTypes.Viewlog>;
  userLatestViewlogs?: DataTypes.UserLatestViewlogs;
  feedbackResponse?: string;
  searchText?: string;
  currentContentResultPages?: {
    all: number;
    mission: number;
    playlist: number;
    resource: number;
  },
  contentSearchResults?: {
    all: Array<DataTypes.Content>;
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  },
  hasMoreContent?: {
    all: boolean;
    mission: boolean;
    playlist: boolean;
    resource: boolean;
  },
  activeTabKey?: string;
}

const userSideSearchStateInit = (
  initialState: UserSideSearchState,
): UserSideSearchState => {
  return {
    ...initialState,
    currentUser: initialState.currentUser,
    feedbackResponse: "",
    userLatestViewlogs: initialState.userLatestViewlogs,
    searchText: initialState.searchText,
    featuredResults: initialState.featuredResults,
    recentResults: initialState.recentResults,
    windowLocation: initialState.windowLocation,
    hasMore: true,
    currentContentResultPages: {
      all: 1,
      mission: 1,
      playlist: 1,
      resource: 1
    },
    hasMoreContent: {
      all: true,
      mission: true,
      playlist: true,
      resource: true
    },
    activeTabKey: "1"
  };
};

const userSideSearchReducer = (
  state: UserSideSearchState,
  action: UserSideSearchStateAction,
): UserSideSearchState => {
  switch (action.type) {
    case UserSideSearchStateActionTypes.SET_FEEDBACK_RESPONSE:
      return { ...state, feedbackResponse: action.feedbackResponse };
    case UserSideSearchStateActionTypes.SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case UserSideSearchStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY:
      return {
        ...state,
        contentSearchResults: {
          ...state.contentSearchResults,
          ...action.contentSearchResults,
        },
        currentContentResultPages: {
          ...state.currentContentResultPages,
          ...action.currentContentResultPages
        }
      }
    case UserSideSearchStateActionTypes.END_FETCHING_NEXT_RESULTS:
      return {
        ...state,
        hasMoreContent: {
          ...state.hasMoreContent,
          ...action.hasMoreContent
        }
      };
    case UserSideSearchStateActionTypes.SET_ACTIVE_TAB_KEY:
      return {
        ...state,
        activeTabKey: action.activeTabKey
      }
    default:
      return state;
  }
};

export {
  UserSideSearchStateActionTypes,
  userSideSearchStateInit,
  userSideSearchReducer,
};

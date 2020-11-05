import * as DataTypes from "data/types";

interface MyDashboardState {
  currentUser: DataTypes.User;
  featuredResults: Array<DataTypes.Content>;
  recentResults: Array<DataTypes.Content>;
  topRatedContent: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  windowLocation: {
    pathname: string;
  };
  feedbackResponse?: string;
  searchResults?: Array<DataTypes.Content>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  searchText?: string;
}

enum MyDashboardStateActionTypes {
  SET_FEEDBACK_RESPONSE = "SET_FEEDBACK_RESPONSE",
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
}

interface MyDashboardStateAction {
  type: MyDashboardStateActionTypes;
  userLatestViewlogs?: DataTypes.UserLatestViewlogs;
  searchResults?: Array<DataTypes.Content>;
  feedbackResponse?: string;
  searchText?: string;
}

const myDashboardStateInit = (
  initialState: MyDashboardState,
): MyDashboardState => {
  return {
    currentUser: initialState.currentUser,
    feedbackResponse: "",
    searchResults: initialState.searchResults ? initialState.searchResults : [],
    userLatestViewlogs: initialState.userLatestViewlogs,
    searchText: initialState.searchText,
    featuredResults: initialState.featuredResults,
    recentResults: initialState.recentResults,
    windowLocation: initialState.windowLocation,
    topRatedContent: initialState.topRatedContent,
    recommendedContent: initialState.recommendedContent,
  };
};

const myDashboardReducer = (
  state: MyDashboardState,
  action: MyDashboardStateAction,
): MyDashboardState => {
  switch (action.type) {
    case MyDashboardStateActionTypes.SET_FEEDBACK_RESPONSE:
      return { ...state, feedbackResponse: action.feedbackResponse };
    case MyDashboardStateActionTypes.SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export {
  MyDashboardStateActionTypes,
  myDashboardStateInit,
  myDashboardReducer,
};

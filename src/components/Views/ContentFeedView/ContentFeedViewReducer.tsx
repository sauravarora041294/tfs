interface ContentFeedViewState {
  showSignupModal?: boolean;
  signupModalRedirectPath?: string;
  currentPage?: number;
  resourceProgress?: number;
}

enum ContentFeedViewStateActionTypes {
  SHOW_SIGNUP_MODAL = "SHOW_SIGNUP_MODAL",
  HIDE_SIGNUP_MODAL = "HIDE_SIGNUP_MODAL",
  INCREMENT_CURRENT_PAGE = "INCREMENT_CURRENT_PAGE",
  SET_RESOURCE_PROGRESS = "SET_RESOURCE_PROGRESS",
}

interface ContentFeedViewStateAction {
  type: ContentFeedViewStateActionTypes;
  redirectPath?: string;
  currentPage?: number;
  resourceProgress?: number;
}

const ContentFeedViewStateInit = (
  initialState: ContentFeedViewState,
): ContentFeedViewState => ({
  ...initialState,
  showSignupModal: false,
  currentPage: 1,
});

const ContentFeedViewReducer = (
  state: ContentFeedViewState,
  action: ContentFeedViewStateAction,
): ContentFeedViewState => {
  switch (action.type) {
    case ContentFeedViewStateActionTypes.SHOW_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: true,
        signupModalRedirectPath: action.redirectPath,
      };
    case ContentFeedViewStateActionTypes.HIDE_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: false,
        signupModalRedirectPath: null,
      };
    case ContentFeedViewStateActionTypes.INCREMENT_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ContentFeedViewStateActionTypes.SET_RESOURCE_PROGRESS:
      return {
        ...state,
        resourceProgress: state.resourceProgress,
      };
    default:
      return state;
  }
};

export {
  ContentFeedViewStateActionTypes,
  ContentFeedViewStateInit,
  ContentFeedViewReducer,
};

import * as DataTypes from "data/types";

interface ContentRequestCardState {
  missionId: string;
  currentUser: DataTypes.User;
  contentRequests: Array<DataTypes.ContentRequest>;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  upvoteError?: Error;
  submissionError?: Error;
  windowDimensions?: { width: number; height: number };
  isVisibleModal?: boolean;
  activeTab?: "topVoted" | "recent";
  cardOpen?: boolean;
}

enum ContentRequestCardStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  BEGIN_UPVOTE = "BEGIN_UPVOTE",
  FINISHED_UPVOTE_WITH_ERROR = "FINISHED_UPVOTE_WITH_ERROR",
  CHANGE_DIMENSIONS = "CHANGE_DIMENSIONS",
  TOGGLE_MODAL_VISIBILITY = "TOGGLE_MODAL_VISIBILITY",
  TOGGLE_ACTIVE_TAB = "TOGGLE_ACTIVE_TAB",
  TOGGLE_OPEN_CARD = "TOGGLE_OPEN_CARD",
}

interface ContentRequestCardStateAction {
  type: ContentRequestCardStateActionTypes;
  contentRequests?: Array<DataTypes.ContentRequest>;
  upvoteError?: Error;
  submissionError?: Error;
  windowDimensions?: { width: number; height: number };
  activeTab?: "topVoted" | "recent";
  cardOpen?: boolean;
}

const contentRequestsStateInit = (
  initialState: ContentRequestCardState,
): ContentRequestCardState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
  activeTab: "topVoted",
  isVisibleModal: false,
  cardOpen: true,
});

const contentRequestsReducer = (
  state: ContentRequestCardState,
  action: ContentRequestCardStateAction,
): ContentRequestCardState => {
  switch (action.type) {
    case ContentRequestCardStateActionTypes.TOGGLE_ACTIVE_TAB:
      return { ...state, activeTab: action.activeTab };
    case ContentRequestCardStateActionTypes.TOGGLE_MODAL_VISIBILITY:
      return { ...state, isVisibleModal: !state.isVisibleModal };
    case ContentRequestCardStateActionTypes.CHANGE_DIMENSIONS:
      return {
        ...state,
        windowDimensions: {
          ...state.windowDimensions,
          ...action.windowDimensions,
        },
      };
    case ContentRequestCardStateActionTypes.TOGGLE_OPEN_CARD:
      return { ...state, cardOpen: action.cardOpen };
    case ContentRequestCardStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case ContentRequestCardStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        contentRequests: action.contentRequests,
        isSubmittingForm: false,
        successfullySubmitted: true,
      };
    case ContentRequestCardStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case ContentRequestCardStateActionTypes.BEGIN_UPVOTE:
      return {
        ...state,
        contentRequests: action.contentRequests,
      };
    case ContentRequestCardStateActionTypes.FINISHED_UPVOTE_WITH_ERROR:
      return {
        ...state,
        upvoteError: action.upvoteError,
      };
    default:
      return state;
  }
};

export {
  ContentRequestCardStateActionTypes,
  contentRequestsStateInit,
  contentRequestsReducer,
};

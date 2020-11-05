import * as DataTypes from "data/types";

export interface ResourceDetailState {
  isPublic: boolean;
  currentUser: DataTypes.User;
  currentResource: DataTypes.Resource;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  relatedResources: Array<DataTypes.Resource>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  contributors: Array<DataTypes.User>;
  showAddRatingModal?: boolean;
  showSignupModal?: boolean;
  userRating?: number;
  addRatingModalInitialRating?: number;
  showRatingSubmissionError?: boolean;
  truncatedTextWidth?: number;
}

enum ResourceDetailStateActionTypes {
  newResourceAvgRating = "newResourceAvgRating",
  SHOW_ADD_RATING_MODAL = "SHOW_ADD_RATING_MODAL",
  HIDE_ADD_RATING_MODAL = "HIDE_ADD_RATING_MODAL",
  SHOW_SIGNUP_MODAL = "SHOW_SIGNUP_MODAL",
  HIDE_SIGNUP_MODAL = "HIDE_SIGNUP_MODAL",
  SET_CURRENT_USER_RATING = "SET_CURRENT_USER_RATING",
  UPDATE_RESOURCE = "UPDATE_RESOURCE",
  REFRESH_QUALITY_VERIFICATIONS = "REFRESH_QUALITY_VERIFICATIONS",
  SHOW_RATING_SUBMISSION_ERROR = "SHOW_RATING_SUBMISSION_ERROR",
  SET_TRUNCATED_TEXT_WIDTH = "SET_TRUNCATED_TEXT_WIDTH"
}

interface ResourceDetailStateAction {
  type: ResourceDetailStateActionTypes;
  payload?: number;
  userRating?: number;
  resource?: DataTypes.Resource;
  qualityVerifications?: DataTypes.QualityVerification[];
  addRatingModalInitialRating?: number;
  showRatingSubmissionError?: boolean;
  truncatedTextWidth?: number;
}

const resourceDetailStateInit = (
  initialState: ResourceDetailState,
): ResourceDetailState => {
  return { ...initialState };
};

const resourceDetailReducer = (
  state: ResourceDetailState,
  action: ResourceDetailStateAction,
): ResourceDetailState => {
  switch (action.type) {
    case ResourceDetailStateActionTypes.newResourceAvgRating:
      return {
        ...state,
        currentResource: {
          ...state.currentResource,
          avgRating: action.payload,
        },
      };
    case ResourceDetailStateActionTypes.UPDATE_RESOURCE:
      return { ...state, currentResource: action.resource };
    case ResourceDetailStateActionTypes.SHOW_ADD_RATING_MODAL:
      return {
        ...state,
        showAddRatingModal: true,
        addRatingModalInitialRating: action.addRatingModalInitialRating,
      };
    case ResourceDetailStateActionTypes.REFRESH_QUALITY_VERIFICATIONS:
      return {
        ...state,
        qualityVerifications: action.qualityVerifications,
      };
    case ResourceDetailStateActionTypes.HIDE_ADD_RATING_MODAL:
      return {
        ...state,
        showAddRatingModal: false,
      };
    case ResourceDetailStateActionTypes.SHOW_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: true,
      };
    case ResourceDetailStateActionTypes.HIDE_SIGNUP_MODAL:
      return {
        ...state,
        showSignupModal: false,
      };
    case ResourceDetailStateActionTypes.SET_CURRENT_USER_RATING:
      return {
        ...state,
        userRating: action.userRating,
      };
    case ResourceDetailStateActionTypes.SHOW_RATING_SUBMISSION_ERROR:
      return {
        ...state,
        showRatingSubmissionError: action.showRatingSubmissionError
      }
    case ResourceDetailStateActionTypes.SET_TRUNCATED_TEXT_WIDTH:
      return {
        ...state,
        truncatedTextWidth: action.truncatedTextWidth
      }
    default:
      return state;
  }
};

export {
  ResourceDetailStateActionTypes,
  resourceDetailStateInit,
  resourceDetailReducer,
};

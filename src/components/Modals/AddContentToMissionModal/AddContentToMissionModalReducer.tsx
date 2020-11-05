import * as DataTypes from "data/types";
import { ProgressMessages } from "./AddContentToMissionModalUtil";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

interface AddContentToMissionModalState {
  mission: DataTypes.Mission;
  uploadedContent: Array<DataTypes.Content>;
  isSubmittingForm: boolean;
  successfullySubmitted: boolean;
  submissionError: Error;
  pageKey: string;
  contentFeedViewClicksMade: number;
  selectedResourceIds: Array<string>;
  selectedPlaylistIds: Array<string>;
  videoFile?: UploadChangeParam<UploadFile>;
  contentsSelectedFromClick?: Array<string>;
  contentsSelectedViaInput?: Array<string>;
  textToDisplay?: string;
  hasMore?: boolean;
  searchText?: string;
  currentPageOfSearchResults?: number;
}

enum AddContentToMissionModalStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE",
  SET_SUBMITTED_TEXT = "SET_SUBMITTED_TEXT",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  VIDEO_UPLOAD = "VIDEO_UPLOAD",
  END_FETCHING_NEXT_RESULTS = "END_FETCHING_NEXT_RESULTS",
  FETCHED_NEXT_RESULTS_SUCCESSFULLY = "FETCHED_NEXT_RESULTS_SUCCESSFULLY",
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  START_FETCHING_RESULTS = "START_FETCHING_RESULTS",
  SET_CURRENT_PAGE_OF_SEARCH_RESULTS = "SET_CURRENT_PAGE_OF_SEARCH_RESULTS",
  TOGGLE_RESOURCE_SELECTION = "TOGGLE_RESOURCE_SELECTION",
  TOGGLE_PLAYLIST_SELECTION = "TOGGLE_PLAYLIST_SELECTION"
}

interface AddContentToMissionModalAction {
  type: AddContentToMissionModalStateActionTypes;
  submissionError?: Error;
  videoFile?: UploadChangeParam<UploadFile>;
  resourceId?: string;
  contentsSelected?: Array<string>;
  textToDisplay?: string;
  pageKey?: string;
  playlistId?: string;
  uploadedContent?: Array<DataTypes.Content>;
  next?: DataTypes.FirebaseDate;
  searchText?: string;
  currentPageOfSearchResults?: number;
  selectedResourceIds?: Array<string>;
  selectedPlaylistIds?: Array<string>;
}

const addContentToMissionModalStateInit = (
  initialAddContentToMissionModalState: AddContentToMissionModalState,
): AddContentToMissionModalState => ({
  ...initialAddContentToMissionModalState,
  textToDisplay: "",
  hasMore: true,
  searchText: "",
  currentPageOfSearchResults: 1,
  selectedResourceIds: [],
  selectedPlaylistIds: []
});

const addContentToMissionModalReducer = (
  AddContentToMissionModalState: AddContentToMissionModalState,
  AddContentToMissionModalAction: AddContentToMissionModalAction,
): AddContentToMissionModalState => {
  switch (AddContentToMissionModalAction.type) {
    case AddContentToMissionModalStateActionTypes.TOGGLE_RESOURCE_SELECTION:
      const newResourceId = AddContentToMissionModalAction.resourceId;
      const selectedResourceIds = AddContentToMissionModalState.selectedResourceIds.filter(
        resourceId => resourceId !== newResourceId,
      );
      if (AddContentToMissionModalState.selectedResourceIds.indexOf(newResourceId) < 0) {
        selectedResourceIds.push(newResourceId);
      }
      return {
        ...AddContentToMissionModalState,
        selectedResourceIds: selectedResourceIds,
      }
    case AddContentToMissionModalStateActionTypes.TOGGLE_PLAYLIST_SELECTION:
      const newPlaylistId = AddContentToMissionModalAction.playlistId;
      const selectedPlaylistIds = AddContentToMissionModalState.selectedPlaylistIds.filter(
        playlistId => playlistId !== newPlaylistId,
      );
      if (AddContentToMissionModalState.selectedResourceIds.indexOf(newPlaylistId) < 0) {
        selectedPlaylistIds.push(newPlaylistId);
      }
      return {
        ...AddContentToMissionModalState,
        selectedPlaylistIds: selectedPlaylistIds,
      }
    case AddContentToMissionModalStateActionTypes.SET_ACTIVE_PAGE:
      return {
        ...AddContentToMissionModalState,
        pageKey: AddContentToMissionModalAction.pageKey,
      };
    case AddContentToMissionModalStateActionTypes.SET_SUBMITTED_TEXT:
      return {
        ...AddContentToMissionModalState,
        textToDisplay: AddContentToMissionModalAction.textToDisplay,
      };
    case AddContentToMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...AddContentToMissionModalState, isSubmittingForm: true };
    case AddContentToMissionModalStateActionTypes.VIDEO_UPLOAD:
      return {
        ...AddContentToMissionModalState,
        videoFile: AddContentToMissionModalAction.videoFile,
        textToDisplay: ProgressMessages.STARTED_UPLOAD,
      };
    case AddContentToMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...AddContentToMissionModalState,
        isSubmittingForm: false,
        successfullySubmitted: true,
      };
    case AddContentToMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...AddContentToMissionModalState,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: AddContentToMissionModalAction.submissionError,
      };
    case AddContentToMissionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        ...AddContentToMissionModalState,
        isSubmittingForm: false,
        successfullySubmitted: false,
        videoFile: null,
      };
    case AddContentToMissionModalStateActionTypes.END_FETCHING_NEXT_RESULTS:
      return {
        ...AddContentToMissionModalState,
        hasMore: false,
        currentPageOfSearchResults: 0
      };
    case AddContentToMissionModalStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY:
      return {
        ...AddContentToMissionModalState,
        uploadedContent: [
          ...AddContentToMissionModalState.uploadedContent,
          ...AddContentToMissionModalAction.uploadedContent,
        ],
        currentPageOfSearchResults: AddContentToMissionModalState.currentPageOfSearchResults + 1
      };
    case AddContentToMissionModalStateActionTypes.SET_SEARCH_TEXT:
      return {
        ...AddContentToMissionModalState,
        searchText: AddContentToMissionModalAction.searchText
      }
    case AddContentToMissionModalStateActionTypes.START_FETCHING_RESULTS:
      return {
        ...AddContentToMissionModalState,
        uploadedContent: AddContentToMissionModalAction.uploadedContent,
        hasMore: true,
        currentPageOfSearchResults: 1
      }
    case AddContentToMissionModalStateActionTypes.SET_CURRENT_PAGE_OF_SEARCH_RESULTS:
      return {
        ...AddContentToMissionModalState,
        currentPageOfSearchResults: AddContentToMissionModalAction.currentPageOfSearchResults,
      }
    default:
      return AddContentToMissionModalState;
  }
};

export {
  addContentToMissionModalStateInit,
  addContentToMissionModalReducer,
  AddContentToMissionModalStateActionTypes,
};

import * as DataTypes from "data/types";
import { ProgressMessages } from "./AddVideoToPlaylistSectionModalUtil";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

interface AddVideoToPlaylistSectionModalState {
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
  uploadedResources: Array<DataTypes.Resource>;
  isSubmittingForm: boolean;
  successfullySubmitted: boolean;
  submissionErrors: Array<Error>;
  videoFile?: UploadChangeParam<UploadFile>;
  resourcesSelected: Array<string>;
  resourcesSelectedFromClick?: Array<string>;
  resourcesSelectedViaInput?: Array<string>;
  contentFeedViewClicksMade: number;
  textToDisplay?: string;
  pageKey: string;
  next?: DataTypes.FirebaseDate;
  hasMore?: boolean;
  searchText?: string;
  currentPageOfSearchResults?: number;
}

enum AddVideoToPlaylistSectionModalStateActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
  SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE",
  INVERT_SELECTION = "INVERT_SELECTION",
  SET_SUBMITTED_TEXT = "SET_SUBMITTED_TEXT",
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  VIDEO_UPLOAD = "VIDEO_UPLOAD",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  END_FETCHING_NEXT_RESULTS = "END_FETCHING_NEXT_RESULTS",
  FETCHED_NEXT_RESULTS_SUCCESSFULLY = "FETCHED_NEXT_RESULTS_SUCCESSFULLY",
  SET_SEARCH_TEXT = "SET_SEARCH_TEXT",
  START_FETCHING_RESULTS = "START_FETCHING_RESULTS",
  SET_CURRENT_PAGE_OF_SEARCH_RESULTS = "SET_CURRENT_PAGE_OF_SEARCH_RESULTS"
}

interface AddVideoToPlaylistSectionModalStateAction {
  type: AddVideoToPlaylistSectionModalStateActionTypes;
  submissionErrors?: Array<Error>;
  videoFile?: UploadChangeParam<UploadFile>;
  resourceId?: string;
  resourcesSelected?: Array<string>;
  textToDisplay?: string;
  pageKey?: string;
  uploadedResources?: Array<DataTypes.Resource>;
  next?: DataTypes.FirebaseDate;
  searchText?: string;
  currentPageOfSearchResults?: number;
}

const addVideoToPlaylistSectionModalStateInit = (
  initialAddVideoToPlaylistSectionModalState: AddVideoToPlaylistSectionModalState,
): AddVideoToPlaylistSectionModalState => ({
  ...initialAddVideoToPlaylistSectionModalState,
  hasMore: true,
  searchText: "",
  currentPageOfSearchResults: 1
});

const addVideoToPlaylistSectionModalReducer = (
  AddVideoToPlaylistSectionModalState: AddVideoToPlaylistSectionModalState,
  AddVideoToPlaylistSectionModalStateAction: AddVideoToPlaylistSectionModalStateAction,
): AddVideoToPlaylistSectionModalState => {
  switch (AddVideoToPlaylistSectionModalStateAction.type) {
    case AddVideoToPlaylistSectionModalStateActionTypes.SET_FORM_DATA:
      const unionedResources = AddVideoToPlaylistSectionModalState.resourcesSelected.concat(
        AddVideoToPlaylistSectionModalStateAction.resourcesSelected.filter(
          item =>
            AddVideoToPlaylistSectionModalState.resourcesSelected.indexOf(
              item,
            ) < 0,
        ),
      );
      return {
        ...AddVideoToPlaylistSectionModalState,
        resourcesSelected: unionedResources,
        resourcesSelectedViaInput:
          AddVideoToPlaylistSectionModalStateAction.resourcesSelected,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.SET_ACTIVE_PAGE:
      return {
        ...AddVideoToPlaylistSectionModalState,
        pageKey: AddVideoToPlaylistSectionModalStateAction.pageKey,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.INVERT_SELECTION:
      const tempResourcesSelected =
        AddVideoToPlaylistSectionModalState.resourcesSelected;
      const itemIndex = AddVideoToPlaylistSectionModalState.resourcesSelected.indexOf(
        AddVideoToPlaylistSectionModalStateAction.resourceId,
      );
      if (itemIndex < 0)
        tempResourcesSelected.push(
          AddVideoToPlaylistSectionModalStateAction.resourceId,
        );
      else tempResourcesSelected.splice(itemIndex, 1);

      return {
        ...AddVideoToPlaylistSectionModalState,
        resourcesSelected: tempResourcesSelected,
        contentFeedViewClicksMade:
          AddVideoToPlaylistSectionModalState.contentFeedViewClicksMade + 1,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.SET_SUBMITTED_TEXT:
      return {
        ...AddVideoToPlaylistSectionModalState,
        textToDisplay: AddVideoToPlaylistSectionModalStateAction.textToDisplay,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...AddVideoToPlaylistSectionModalState, isSubmittingForm: true };
    case AddVideoToPlaylistSectionModalStateActionTypes.VIDEO_UPLOAD:
      return {
        ...AddVideoToPlaylistSectionModalState,
        videoFile: AddVideoToPlaylistSectionModalStateAction.videoFile,
        textToDisplay: ProgressMessages.STARTED_UPLOAD,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...AddVideoToPlaylistSectionModalState,
        isSubmittingForm: false,
        successfullySubmitted: true,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...AddVideoToPlaylistSectionModalState,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionErrors:
          AddVideoToPlaylistSectionModalStateAction.submissionErrors,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        ...AddVideoToPlaylistSectionModalState,
        isSubmittingForm: false,
        successfullySubmitted: false,
        videoFile: null,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.END_FETCHING_NEXT_RESULTS:
      return {
        ...AddVideoToPlaylistSectionModalState,
        hasMore: false,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY:
      return {
        ...AddVideoToPlaylistSectionModalState,
        uploadedResources: [
          ...AddVideoToPlaylistSectionModalState.uploadedResources,
          ...AddVideoToPlaylistSectionModalStateAction.uploadedResources,
        ],
        currentPageOfSearchResults: AddVideoToPlaylistSectionModalState.currentPageOfSearchResults + 1,
      };
    case AddVideoToPlaylistSectionModalStateActionTypes.SET_SEARCH_TEXT:
      return {
        ...AddVideoToPlaylistSectionModalState,
        searchText: AddVideoToPlaylistSectionModalStateAction.searchText
      }
    case AddVideoToPlaylistSectionModalStateActionTypes.START_FETCHING_RESULTS:
      return {
        ...AddVideoToPlaylistSectionModalState,
        uploadedResources: AddVideoToPlaylistSectionModalStateAction.uploadedResources,
        hasMore: true,
        currentPageOfSearchResults: 1
      }
    case AddVideoToPlaylistSectionModalStateActionTypes.SET_CURRENT_PAGE_OF_SEARCH_RESULTS:
      return {
        ...AddVideoToPlaylistSectionModalState,
        currentPageOfSearchResults: AddVideoToPlaylistSectionModalStateAction.currentPageOfSearchResults,
      }
    default:
      return AddVideoToPlaylistSectionModalState;
  }
};

export {
  addVideoToPlaylistSectionModalStateInit,
  addVideoToPlaylistSectionModalReducer,
  AddVideoToPlaylistSectionModalStateActionTypes,
};

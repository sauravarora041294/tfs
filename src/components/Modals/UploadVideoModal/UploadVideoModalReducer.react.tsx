import * as DataTypes from "data/types";
import { UploadFile } from "antd/lib/upload/interface";

interface UploadVideoModalState {
  currentStep?: number;
  videoFile?: UploadFile<any>;
  videoDownloadURL?: string;
  videoUploadProgress?: number;
  defaultThumbnailFile?: File;
  defaultThumbnailURL?: string;
  customThumbnailFile?: File;
  customThumbnailURL?: string;
  isLoadingCustomThumbnailFile?: boolean;
  isDefaultThumbnailSelected?: boolean;
  isSubmittingVideoDetailsForm?: boolean;
  isSubmittingVideoGroupingsForm?: boolean;
  videoDuration?: number;
  uploadedResource?: DataTypes.Resource;
}

enum UploadVideoModalStateActionTypes {
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  SET_VIDEO_FILE = "SET_VIDEO_FILE",
  SET_VIDEO_UPLOAD_PROGRESS = "SET_VIDEO_UPLOAD_PROGRESS",
  SET_VIDEO_DOWNLOAD_URL = "SET_VIDEO_DOWNLOAD_URL",
  SET_DEFAULT_THUMBNAIL_FILE = "SET_DEFAULT_THUMBNAIL_FILE",
  SET_CUSTOM_THUMBNAIL_DATA = "SET_CUSTOM_THUMBNAIL_DATA",
  SET_IS_LOADING_CUSTOM_THUMBNAIL_FILE = "SET_IS_LOADING_CUSTOM_THUMBNAIL_FILE",
  SET_IS_DEFAULT_THUMBNAIL_SELECTED = "SET_IS_DEFAULT_THUMBNAIL_SELECTED",
  SET_IS_SUBMITTING_VIDEO_DETAILS_FORM = "SET_IS_SUBMITTING_VIDEO_DETAILS_FORM",
  SET_VIDEO_DURATION = "SET_VIDEO_DURATION",
  SET_UPLOADED_RESOURCE = "SET_UPLOADED_RESOURCE",
  SET_IS_SUBMITTING_VIDEO_GROUPINGS_FORM = "SET_IS_SUBMITTING_VIDEO_GROUPINGS_FORM"
}

interface UploadVideoModalStateAction {
  type: UploadVideoModalStateActionTypes;
  currentStep?: number;
  videoFile?: UploadFile<any>;
  videoDownloadURL?: string;
  videoUploadProgress?: number;
  defaultThumbnailFile?: File;
  customThumbnailFile?: File;
  isLoadingCustomThumbnailFile?: boolean;
  customThumbnailURL?: string;
  defaultThumbnailURL?: string;
  isDefaultThumbnailSelected?: boolean;
  isSubmittingVideoDetailsForm?: boolean;
  videoDuration?: number;
  uploadedResource?: DataTypes.Resource;
  isSubmittingVideoGroupingsForm?: boolean;
}

const uploadVideoStateInit = (
  initialUploadVideoModalState: UploadVideoModalState,
): UploadVideoModalState => ({
  ...initialUploadVideoModalState,
});

const uploadVideoReducer = (
  state: UploadVideoModalState,
  action: UploadVideoModalStateAction,
): UploadVideoModalState => {
  switch (action.type) {
    case UploadVideoModalStateActionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.currentStep
      }
    case UploadVideoModalStateActionTypes.SET_VIDEO_FILE:
      return {
        ...state,
        videoFile: action.videoFile
      }
    case UploadVideoModalStateActionTypes.SET_VIDEO_UPLOAD_PROGRESS:
      return {
        ...state,
        videoUploadProgress: action.videoUploadProgress
      }
    case UploadVideoModalStateActionTypes.SET_VIDEO_DOWNLOAD_URL:
      return {
        ...state,
        videoDownloadURL: action.videoDownloadURL
      }
    case UploadVideoModalStateActionTypes.SET_DEFAULT_THUMBNAIL_FILE:
      return {
        ...state,
        defaultThumbnailFile: action.defaultThumbnailFile
      }
    case UploadVideoModalStateActionTypes.SET_CUSTOM_THUMBNAIL_DATA:
      return {
        ...state,
        customThumbnailFile: action.customThumbnailFile,
        customThumbnailURL: action.customThumbnailURL
      }
    case UploadVideoModalStateActionTypes.SET_IS_LOADING_CUSTOM_THUMBNAIL_FILE:
      return {
        ...state,
        isLoadingCustomThumbnailFile: action.isLoadingCustomThumbnailFile
      }
    case UploadVideoModalStateActionTypes.SET_IS_DEFAULT_THUMBNAIL_SELECTED:
      return {
        ...state,
        isDefaultThumbnailSelected: action.isDefaultThumbnailSelected
      }
    case UploadVideoModalStateActionTypes.SET_IS_SUBMITTING_VIDEO_DETAILS_FORM:
      return {
        ...state,
        isSubmittingVideoDetailsForm: action.isSubmittingVideoDetailsForm
      }
    case UploadVideoModalStateActionTypes.SET_UPLOADED_RESOURCE:
      return {
        ...state,
        uploadedResource: action.uploadedResource
      }
    case UploadVideoModalStateActionTypes.SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.videoDuration
      }
    case UploadVideoModalStateActionTypes.SET_IS_SUBMITTING_VIDEO_GROUPINGS_FORM:
      return {
        ...state,
        isSubmittingVideoGroupingsForm: action.isSubmittingVideoGroupingsForm
      }
    default:
      return state;
  }
};

export {
  uploadVideoReducer,
  uploadVideoStateInit,
  UploadVideoModalStateActionTypes,
};

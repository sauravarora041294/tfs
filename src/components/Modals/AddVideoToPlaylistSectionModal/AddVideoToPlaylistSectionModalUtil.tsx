import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";
import { UploadFileResponse } from "FirebaseClient/FirebaseStorage";

export const HITS_PER_PAGE = 6;

interface authUser {
  uid: string;
}

interface formValues {
  resourceIds: Array<string>;
}

interface saveFormDataResponse {
  errors: Array<Error>;
}

interface UploadState {
  isUploading: boolean;
  downloadURL: string;
  uploadError: string | null;
  progress: number;
}

interface FetchDataState {
  isLoading: boolean;
  uploadedResources: Array<DataTypes.Resource>;
  error: Error;
  creator?: DataTypes.Creator;
}

interface SaveUploadedVideoResponse {
  uploadImageResponse: UploadFileResponse;
  saveResourceResponse: DataTypes.Resource;
  error: Error;
}

enum ProgressMessages {
  EMPTY = "",
  STARTED_UPLOAD = "Uploading Video...",
  UPLOADED_NOT_ADDED = "Video was uploaded but could not be added to the playlist...",
  ADDING_TO_PLAYLIST = "Adding uploaded video to this playlist..",
  SUCCESSFULLY_ADDED = "Video successfully added",
  SAVING_VIDEO_AS_RESOURCE = "Saving the uploaded video to your account..",
  ERROR = "Something went wrong",
}

const addVideoToSection = async (
  resourceId: string,
  playlistId: string,
  sectionIndex: number,
  userId: string,
): Promise<{ error: Error }> => {
  try {
    const addVideoResponse = await RESTAPIClient.Playlist.addVideoToSection(
      playlistId,
      sectionIndex,
      resourceId,
      userId,
    );
    return { error: null };
  } catch (error) {
    return { error };
  }
};

const saveFormData = async (
  selectedResourceIds: Array<string>,
  playlistId: string,
  sectionIndex: number,
  userId: string,
): Promise<saveFormDataResponse> => {
  const addVideoToSectionPromiseList = selectedResourceIds.map(
    async resourceId =>
      addVideoToSection(resourceId, playlistId, sectionIndex, userId),
  );
  const addVideoToSectionResponses = await Promise.all(
    addVideoToSectionPromiseList,
  );
  const errors = addVideoToSectionResponses
    .filter(response => response.error)
    .map(response => response.error);
  return { errors };
};

const getUploadedVideos = async (creatorUserId: string, next?: any) => {
  return await RESTAPIClient.Resource.getRecentlyUploadedByCreator(
    creatorUserId,
    6,
    next,
  );
};

const useFetchAddVideoModalData = (authUser: authUser): FetchDataState => {
  const [data, updateData] = React.useState<FetchDataState>({
    isLoading: true,
    uploadedResources: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const uploadedResources = await getCreatorUploadedVideosBySearchStringNewestFirst({
        creatorUserId: authUser.uid,
        searchString: "",
        pageSize: HITS_PER_PAGE,
        currentPage: 0
      })
      const creator = await RESTAPIClient.Creator.get(authUser.uid);
      updateData({
        ...data,
        uploadedResources: uploadedResources.results as Array<DataTypes.Resource>,
        isLoading: false,
        creator,
      });
    } catch (error) {
      updateData({
        ...data,
        isLoading: false,
        error,
        creator: null,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const getCreatorUploadedVideosBySearchStringNewestFirst = async (params: {
  creatorUserId: string;
  searchString: string;
  currentPage: number;
  pageSize: number;
}) => {
  return await RESTAPIClient.Content.getCreatorUploadedContentBySearchStringNewestFirst({
    ...params,
    contentType: "resource"
  })
}

const saveUploadedVideo = async (
  formValues,
  userId: string,
  uploadVideoResponse: UploadState,
  videoDuration: number,
): Promise<SaveUploadedVideoResponse> => {
  try {
    const imageFile = formValues.thumbnail[0];

    const uploadImageResponse = await uploadFile(
      imageFile.originFileObj,
      imageFile.name,
      imageFile.type,
      "thumbnails",
      userId,
      progress => { },
    );

    const saveResourceResponse = await RESTAPIClient.Resource.create(
      formValues.title,
      formValues.description,
      uploadVideoResponse.downloadURL,
      uploadImageResponse.downloadURL,
      userId,
      videoDuration,
    );
    return {
      uploadImageResponse,
      saveResourceResponse,
      error: null,
    };
  } catch (error) {
    return {
      uploadImageResponse: null,
      saveResourceResponse: null,
      error,
    };
  }
};

const useUploadFile = (
  file,
  uploadDirectory: string,
  userId: string,
): UploadState => {
  const [data, updateData] = React.useState<UploadState>({
    isUploading: true,
    downloadURL: null,
    uploadError: null,
    progress: 0,
  });

  const fetchData = async (): Promise<void> => {
    if (!file || !userId) {
      return;
    }
    const uploadVideoResponse: any = await uploadFile(
      file.originFileObj,
      file.name,
      file.type,
      uploadDirectory,
      userId,
      progress => updateData({ ...data, progress: progress }),
    );
    if (uploadVideoResponse.error) {
      updateData({
        ...data,
        isUploading: false,
        uploadError: uploadVideoResponse.error,
      });
    } else {
      updateData({
        ...data,
        isUploading: false,
        downloadURL: uploadVideoResponse.downloadURL,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [file]);

  return data;
};

export {
  saveFormData,
  useFetchAddVideoModalData,
  useUploadFile,
  saveUploadedVideo,
  ProgressMessages,
  getUploadedVideos,
  getCreatorUploadedVideosBySearchStringNewestFirst
};

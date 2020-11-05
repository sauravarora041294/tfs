import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { UploadFileResponse, uploadFile } from "FirebaseClient/FirebaseStorage";
export const HITS_PER_PAGE = 6;

interface formValues {
  contents: Array<string>;
}

interface saveFormDataResponse {
  addContentResponse: Object; //RESTAPIClient returns Object
  error: Error;
}

interface State {
  isLoading: boolean;
  uploadedContent?: Array<DataTypes.Content>;
  error: Error;
  creator: DataTypes.Creator;
}
enum ProgressMessages {
  EMPTY = "",
  STARTED_UPLOAD = "Uploading Video...",
  UPLOADED_NOT_ADDED = "Video was uploaded but could not be added to the collection...",
  ADDING_TO_MISSION = "Adding uploaded video to this collection.",
  SUCCESSFULLY_ADDED = "Video successfully added",
  SAVING_VIDEO_AS_RESOURCE = "Saving the uploaded video to your account..",
  ERROR = "Something went wrong",
}

const addUploadedVideoToMission = async (
  formValues: { content: Array<string> },
  missionId: string,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const addContentResponse = await RESTAPIClient.Mission.addContent(
      missionId,
      formValues.content,
      [],
      userId,
    );

    return {
      addContentResponse,
      error: null,
    };
  } catch (error) {
    return {
      addContentResponse: null,
      error,
    };
  }
};

const saveFormData = async (
  selectedResourceIds: Array<string>,
  selectedPlaylistIds: Array<string>,
  missionId: string,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const addContentResponse = await RESTAPIClient.Mission.addContent(
      missionId,
      selectedResourceIds,
      selectedPlaylistIds,
      userId,
    );

    return {
      addContentResponse,
      error: null,
    };
  } catch (error) {
    return {
      addContentResponse: null,
      error,
    };
  }
};

const getCreatorUploadedContentBySearchStringNewestFirst = async (params: {
  creatorUserId: string;
  searchString: string;
  currentPage: number;
  pageSize: number;
}) => {
  return await RESTAPIClient.Content.getCreatorUploadedContentBySearchStringNewestFirst({
    ...params
  });
}

const useFetchAddContentModalData = (authUser): State => {
  const [data, updateData] = React.useState<State>({
    isLoading: true,
    uploadedContent: null,
    error: null,
    creator: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const uploadedContent = (await getCreatorUploadedContentBySearchStringNewestFirst({
        creatorUserId: authUser.uid,
        searchString: "",
        currentPage: 0,
        pageSize: HITS_PER_PAGE
      })).results
      const creator = await RESTAPIClient.Creator.get(authUser.uid);

      updateData({
        ...data,
        uploadedContent,
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

interface SaveUploadedVideoResponse {
  uploadImageResponse: UploadFileResponse;
  saveResourceResponse: DataTypes.Resource;
  error: Error;
}

const saveUploadedVideo = async (
  formValues,
  userId: string,
  uploadVideoResponse: UploadState,
  videoDuration: number,
): Promise<SaveUploadedVideoResponse> => {
  try {
    const imageFile = formValues.thumbnail[0];

    const uploadImageResponse: any = await uploadFile(
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

export interface UploadState {
  isUploading: boolean;
  downloadURL: string;
  uploadError: Object;
  progress: number;
}

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
    const uploadVideoResponse = await uploadFile(
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
  useFetchAddContentModalData,
  useUploadFile,
  saveUploadedVideo,
  addUploadedVideoToMission,
  ProgressMessages,
  getCreatorUploadedContentBySearchStringNewestFirst
};

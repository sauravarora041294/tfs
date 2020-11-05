import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

interface EditVideoState {
  isLoading: boolean;
  resource: DataTypes.Resource;
  error?: Error;
}

const useFetchEditVideoData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): EditVideoState => {
  const [data, updateData] = React.useState<EditVideoState>({
    isLoading: true,
    resource: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const resource = await RESTAPIClient.Resource.get(matchParams.resourceId);
      updateData({
        ...data,
        resource: resource,
        isLoading: false,
      });
    } catch (error) {
      updateData({
        ...data,
        isLoading: false,
        error: error,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const updateVideoDetails = async (
  formValues,
  resource: DataTypes.Resource,
  currentUser: DataTypes.User,
): Promise<{
  updateResourceResponse: Object;
  error: Error;
}> => {
  try {
    if (formValues.thumbnail) {
      const imageFile = formValues.thumbnail[0];
      const uploadImageResponse: any = await uploadFile(
        imageFile.originFileObj,
        imageFile.name,
        imageFile.type,
        "thumbnails",
        currentUser.userId,
        progress => {},
      );
      const updateResourceResponse = await RESTAPIClient.Resource.update(
        resource.objectID,
        formValues.title,
        formValues.description,
        currentUser.userId,
        uploadImageResponse.downloadURL,
      );
      return {
        updateResourceResponse: updateResourceResponse,
        error: null,
      };
    } else {
      const updateResourceResponse = await RESTAPIClient.Resource.update(
        resource.objectID,
        formValues.title,
        formValues.description,
        currentUser.userId,
        resource.thumbnailUrl,
      );
      return {
        updateResourceResponse: updateResourceResponse,
        error: null,
      };
    }
  } catch (error) {
    return {
      updateResourceResponse: null,
      error: error,
    };
  }
};

export { useFetchEditVideoData, updateVideoDetails };

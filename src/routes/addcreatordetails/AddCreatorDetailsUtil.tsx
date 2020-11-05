import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";
import { firebaseApp } from "FirebaseClient";

interface AddCreatorDetailsData {
  isLoading: boolean;
  error?: Error;
}

interface AddCreatorProfileDetailsResponse {
  uploadResumeResponse?: Object;
  saveDataResponse?: Object;
  uploadProfilePictureResponse?: Object;
  error?: Error;
}

const addCreatorProfileDetails = async (
  userId: string,
  values,
): Promise<AddCreatorProfileDetailsResponse> => {
  try {
    const resume = values.resume.slice(-1)[0];
    const uploadResumeResponse: any = await uploadFile(
      resume.originFileObj,
      resume.name,
      resume.type,
      `Creators/${userId}/Resumes`,
      userId,
      progress => null,
    );

    const profilePicture = values.profilePicture.slice(-1)[0];
    const uploadProfilePictureResponse: any = await uploadFile(
      profilePicture.originFileObj,
      profilePicture.name,
      profilePicture.type,
      `Creators/${userId}/ProfilePictures`,
      userId,
      progress => null,
    );

    const creatorSkills = values.skillTitles.map((title, index) => ({
      title: title,
      justification: values.justifications[index],
    }));

    const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
      title: values.title,
      company: values.company,
      linkedinURL: values.linkedin,
      skills: creatorSkills,
      bio: values.bio,
      resumeURL: uploadResumeResponse.downloadURL,
      profilePictureURL: uploadProfilePictureResponse.downloadURL,
      venmoHandle: values.venmoHandle,
    });

    return {
      uploadResumeResponse: uploadResumeResponse,
      saveDataResponse: saveDataResponse,
      uploadProfilePictureResponse: uploadProfilePictureResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      uploadResumeResponse: null,
      saveDataResponse: null,
      uploadProfilePictureResponse: null,
      error: error,
    };
  }
};

const useFetchAddCreatorDetailsData = (
  authUser: firebaseApp.User,
  pathname,
  matchParams,
) => {
  const [data, updateData] = React.useState<AddCreatorDetailsData>({
    isLoading: true,
    error: null,
  });

  const fetchData = React.useCallback(async (): Promise<void> => {
    if (authUser) {
      try {
        updateData({
          isLoading: false,
          error: null,
        });
      } catch (error) {
        updateData({
          isLoading: false,
          error,
        });
      }
    } else {
      updateData({
        error: null,
        isLoading: false,
      });
    }
  }, [authUser]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export { addCreatorProfileDetails, useFetchAddCreatorDetailsData };

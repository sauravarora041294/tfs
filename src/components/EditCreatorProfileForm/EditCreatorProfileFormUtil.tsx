import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

interface authUser {
  uid: string;
}

interface EditCreatorProfileData {
  isLoading: boolean;
  error?: Error;
}

interface saveBasicDetailsSectionDataResponse {
  saveDataResponse: Object | null;
  uploadProfilePictureResponse: Object | null;
  error?: Error;
}

interface saveLinksSectionDataResponse {
  saveDataResponse: Object | null;
  uploadResumeResponse: Object | null;
  error?: Error;
}

interface saveSkillsSectionDataResponse {
  saveDataResponse: Object | null;
  error?: Error;
}

interface savePayoutSectionDataResponse {
  saveDataResponse: Object | null;
  error?: Error;
}

const useFetchEditCreatorProfileData = (
  authUser: authUser,
  pathname,
  matchParams,
): EditCreatorProfileData => {
  const [data, updateData] = React.useState<EditCreatorProfileData>({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      updateData({
        ...data,
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

const saveBasicDetailsSectionData = async (
  userId: string,
  values,
): Promise<saveBasicDetailsSectionDataResponse> => {
  try {
    if (values.profilePicture && values.profilePicture.length > 0) {
      const profilePicture = values.profilePicture.slice(-1)[0];
      const uploadProfilePictureResponse: any = await uploadFile(
        profilePicture.originFileObj,
        profilePicture.name,
        profilePicture.type,
        `Creators/${userId}/ProfilePictures`,
        userId,
        progress => null,
      );

      const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
        title: values.title,
        company: values.company,
        profilePictureURL: uploadProfilePictureResponse.downloadURL,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      return {
        saveDataResponse: saveDataResponse,
        uploadProfilePictureResponse: uploadProfilePictureResponse,
        error: null,
      };
    } else {
      const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
        title: values.title,
        company: values.company,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      return {
        saveDataResponse: saveDataResponse,
        uploadProfilePictureResponse: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      saveDataResponse: null,
      uploadProfilePictureResponse: null,
      error: error,
    };
  }
};

const saveLinksSectionData = async (
  userId: string,
  values,
): Promise<saveLinksSectionDataResponse> => {
  try {
    if (
      values.resume &&
      values.resume.length > 0 &&
      values.resume.slice(-1)[0].status &&
      values.resume.slice(-1)[0].status !== "previously_uploaded"
    ) {
      const resume = values.resume.slice(-1)[0];
      const uploadResumeResponse: any = await uploadFile(
        resume.originFileObj,
        resume.name,
        resume.type,
        `Creators/${userId}/Resumes`,
        userId,
        progress => null,
      );

      const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
        linkedinURL: values.linkedinURL,
        resumeURL: uploadResumeResponse.downloadURL,
      });
      return {
        saveDataResponse: saveDataResponse,
        uploadResumeResponse: uploadResumeResponse,
        error: null,
      };
    } else {
      const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
        linkedinURL: values.linkedinURL,
      });
      return {
        saveDataResponse: saveDataResponse,
        uploadResumeResponse: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      saveDataResponse: null,
      uploadResumeResponse: null,
      error: error,
    };
  }
};

const saveSkillsSectionData = async (
  userId: string,
  values,
): Promise<saveSkillsSectionDataResponse> => {
  try {
    const creatorSkills = values.skillTitles.map((title, index) => ({
      title: title,
      justification: values.justifications[index],
    }));
    const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
      skills: creatorSkills,
    });
    return {
      saveDataResponse: saveDataResponse,
      error: null,
    };
  } catch (error) {
    return {
      saveDataResponse: null,
      error: error,
    };
  }
};

const savePayoutSectionData = async (
  userId: string,
  values,
): Promise<savePayoutSectionDataResponse> => {
  try {
    const saveDataResponse = await RESTAPIClient.Creator.update(userId, {
      venmoHandle: values.venmoHandle,
    });
    return {
      saveDataResponse: saveDataResponse,
      error: null,
    };
  } catch (error) {
    return {
      saveDataResponse: null,
      error: error,
    };
  }
};

export {
  useFetchEditCreatorProfileData,
  saveBasicDetailsSectionData,
  saveLinksSectionData,
  saveSkillsSectionData,
  savePayoutSectionData,
};

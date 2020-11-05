import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

const saveFormData = async (formValues, userId: string, missionId: string) => {
  try {
    if (formValues.thumbnail) {
      const imageFile = formValues.thumbnail[0];
      const uploadImageResponse: any = await uploadFile(
        imageFile.originFileObj,
        imageFile.name,
        imageFile.type,
        "missionThumbnails",
        userId,
        progress => {},
      );
      const saveMissionResponse = await RESTAPIClient.Mission.update(
        missionId,
        userId,
        formValues.title,
        formValues.purpose,
        formValues.description,
        formValues.formatInformation,
        formValues.creatorQualifications,
        uploadImageResponse.downloadURL,
      );
      return {
        uploadImageResponse: uploadImageResponse,
        saveMissionResponse: saveMissionResponse,
        error: null,
      };
    } else {
      const saveMissionResponse = await RESTAPIClient.Mission.update(
        missionId,
        userId,
        formValues.title,
        formValues.purpose,
        formValues.description,
        formValues.formatInformation,
        formValues.creatorQualifications,
        null,
      );
      return {
        saveMissionResponse: saveMissionResponse,
        error: null,
      };
    }
  } catch (error) {
    return {
      uploadImageResponse: null,
      saveMissionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

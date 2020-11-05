import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

const saveFormData = async (resourceId: string, formValues, userId: string) => {
  try {
    if (formValues.thumbnail) {
      const imageFile = formValues.thumbnail[0];
      const uploadImageResponse: any = await uploadFile(
        imageFile.originFileObj,
        imageFile.name,
        imageFile.type,
        "thumbnails",
        userId,
        progress => {},
      );
      const saveResourceResponse = RESTAPIClient.Resource.update(
        resourceId,
        formValues.title,
        formValues.description,
        uploadImageResponse.downloadURL,
        userId,
      );
      return {
        uploadImageResponse: uploadImageResponse,
        saveResourceResponse: saveResourceResponse,
        error: null,
      };
    } else {
      const saveResourceResponse = RESTAPIClient.Resource.update(
        resourceId,
        formValues.title,
        formValues.description,
        null,
        userId,
      );
      return {
        saveResourceResponse: saveResourceResponse,
        error: null,
      };
    }
  } catch (error) {
    return {
      uploadImageResponse: null,
      saveResourceResponse: null,
      error: error,
    };
  }
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export { saveFormData, getBase64 };

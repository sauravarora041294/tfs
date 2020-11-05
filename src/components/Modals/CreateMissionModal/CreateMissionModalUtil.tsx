import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";

interface formValues {
  title: string;
  purpose: string;
}

interface saveFormDataResponse {
  saveMissionResponse: DataTypes.Mission;
  error?: Error;
}

const saveFormData = async (
  formValues: formValues,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const saveMissionResponse = await RESTAPIClient.Mission.create(
      formValues.title,
      formValues.purpose,
      userId,
    );
    return {
      saveMissionResponse: saveMissionResponse,
      error: null,
    };
  } catch (error) {
    return {
      saveMissionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

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
  contentRequestId: string,
  resolverUserId: string,
  contentIds: Array<string>,
  reviewDetails: string,
) => {
  try {
    const contentRequestResponse = await RESTAPIClient.ContentRequest.resolve({
      contentRequestId,
      resolverUserId,
      contentIds,
      reviewDetails,
    });
    return {
      contentRequestResponse: contentRequestResponse,
      error: null,
    };
  } catch (error) {
    return {
      contentRequestResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

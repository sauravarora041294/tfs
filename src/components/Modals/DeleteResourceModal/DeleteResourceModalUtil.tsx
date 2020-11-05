import RESTAPIClient from "RESTAPIClient";

interface SaveFormDataResponse {
  deleteResourceResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  resourceId: string,
  userId: string,
): Promise<SaveFormDataResponse> => {
  try {
    const deleteResourceResponse = await RESTAPIClient.Resource.delete(
      resourceId,
      userId,
    );
    return {
      deleteResourceResponse: deleteResourceResponse,
      error: null,
    };
  } catch (error) {
    return {
      deleteResourceResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

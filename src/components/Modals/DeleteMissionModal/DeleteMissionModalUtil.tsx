import RESTAPIClient from "RESTAPIClient";

interface SaveFormDataResponse {
  deleteMissionResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  missionId: string,
  userId: string,
): Promise<SaveFormDataResponse> => {
  try {
    const deleteMissionResponse = await RESTAPIClient.Mission.delete(
      missionId,
      userId,
    );
    return {
      deleteMissionResponse: deleteMissionResponse,
      error: null,
    };
  } catch (error) {
    return {
      deleteMissionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

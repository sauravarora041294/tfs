import RESTAPIClient from "RESTAPIClient";

interface saveFormDataResponse {
  joinMissionResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  missionId: string,
  requesterUserId: string,
): Promise<saveFormDataResponse> => {
  try {
    const joinMissionResponse = await RESTAPIClient.Request.createForMissionContributor(
      {
        missionId,
        requesterUserId,
      },
    );
    return {
      joinMissionResponse: joinMissionResponse,
      error: null,
    };
  } catch (error) {
    return {
      joinMissionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

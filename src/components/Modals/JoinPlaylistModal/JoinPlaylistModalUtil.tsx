import RESTAPIClient from "RESTAPIClient";

interface saveFormDataResponse {
  joinPlaylistResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  playlistId: string,
  requesterUserId: string,
): Promise<saveFormDataResponse> => {
  try {
    const joinPlaylistResponse = await RESTAPIClient.Request.createForPlaylistContributor(
      {
        playlistId,
        requesterUserId,
      },
    );
    return {
      joinPlaylistResponse: joinPlaylistResponse,
      error: null,
    };
  } catch (error) {
    return {
      joinPlaylistResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

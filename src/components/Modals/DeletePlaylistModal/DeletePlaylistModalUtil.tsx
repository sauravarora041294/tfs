import RESTAPIClient from "RESTAPIClient";

interface SaveFormDataResponse {
  deletePlaylistResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  playlistId: string,
  userId: string,
): Promise<SaveFormDataResponse> => {
  try {
    const deletePlaylistResponse = await RESTAPIClient.Playlist.delete(
      playlistId,
      userId,
    );
    return {
      deletePlaylistResponse: deletePlaylistResponse,
      error: null,
    };
  } catch (error) {
    return {
      deletePlaylistResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

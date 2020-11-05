import RESTAPIClient from "RESTAPIClient";

interface saveFormDataResponse {
  savePlaylistResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  resourceId: string,
  playlistId: string,
  sectionIndex: number,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const savePlaylistResponse = await RESTAPIClient.Playlist.removeVideoFromSection(
      resourceId,
      playlistId,
      sectionIndex,
      userId,
    );
    return {
      savePlaylistResponse: savePlaylistResponse,
      error: null,
    };
  } catch (error) {
    return {
      savePlaylistResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

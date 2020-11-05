import RESTAPIClient from "RESTAPIClient";

interface saveFormDataResponse {
  deletePlaylistSectionResponse: Object | null;
  error?: Error;
}

const saveFormData = async (
  playlistId: string,
  sectionIndex: number,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const deletePlaylistSectionResponse = await RESTAPIClient.Playlist.deleteSection(
      playlistId,
      sectionIndex,
      userId,
    );
    return {
      deletePlaylistSectionResponse: deletePlaylistSectionResponse,
      error: null,
    };
  } catch (error) {
    return {
      deletePlaylistSectionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

import RESTAPIClient from "RESTAPIClient";
import * as DataTypes from "data/types";

interface saveFormDataResponse {
  updatePlaylistResponse: Object | null;
  error?: Error;
}
const saveFormData = async (
  orderedSectionUIDs: Array<string>,
  playlistId: string,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const updatePlaylistResponse = await RESTAPIClient.Playlist.update(
      playlistId,
      null,
      null,
      null,
      null,
      orderedSectionUIDs,
      userId,
    );
    return {
      updatePlaylistResponse: updatePlaylistResponse,
      error: null,
    };
  } catch (error) {
    return {
      updatePlaylistResponse: null,
      error: error,
    };
  }
};

const compareSections = (a: DataTypes.Section, b: DataTypes.Section) => {
  if (a.sectionIndex < b.sectionIndex) {
    return -1;
  }
  if (a.sectionIndex > b.sectionIndex) {
    return 1;
  }
  return 0;
};

export { saveFormData, compareSections };

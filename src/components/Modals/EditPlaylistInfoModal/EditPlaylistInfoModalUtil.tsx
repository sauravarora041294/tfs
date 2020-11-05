import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

const saveFormData = async (formValues, userId: string, playlistId: string) => {
  try {
    if (formValues.thumbnail) {
      const imageFile = formValues.thumbnail[0];
      const uploadImageResponse: any = await uploadFile(
        imageFile.originFileObj,
        imageFile.name,
        imageFile.type,
        "playlistThumbnails",
        userId,
        progress => {},
      );
      const savePlaylistResponse = await RESTAPIClient.Playlist.update(
        playlistId,
        formValues.title,
        formValues.description,
        formValues.isCollaborative,
        uploadImageResponse.downloadURL,
        null,
        userId,
      );
      return {
        uploadImageResponse: uploadImageResponse,
        savePlaylistResponse: savePlaylistResponse,
        error: null,
      };
    } else {
      const savePlaylistResponse = await RESTAPIClient.Playlist.update(
        playlistId,
        formValues.title,
        formValues.description,
        formValues.isCollaborative,
        null,
        null,
        userId,
      );
      return {
        savePlaylistResponse: savePlaylistResponse,
        error: null,
      };
    }
  } catch (error) {
    return {
      uploadImageResponse: null,
      savePlaylistResponse: null,
      error: error,
    };
  }
};

export { saveFormData };

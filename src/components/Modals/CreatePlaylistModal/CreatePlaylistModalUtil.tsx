import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";
import { uploadFile } from "FirebaseClient";

interface PlaylistDetailsFormValues {
  title: string;
  purpose: string;
  description: string;
  isCollaborative: boolean;
  thumbnailUrl?: string;
  thumbnail?: Array<any>;
}

interface saveFormDataResponse {
  savePlaylistResponse: DataTypes.Playlist;
  error?: Error;
}
const uploadThumbnail = async (
  PlaylistDetailsFormValues: PlaylistDetailsFormValues,
  userId: string,
) => {
  if (
    !PlaylistDetailsFormValues ||
    !PlaylistDetailsFormValues.thumbnail ||
    PlaylistDetailsFormValues.thumbnail.length === 0
  )
    return null;
  const imageFile = PlaylistDetailsFormValues.thumbnail[0];
  try {
    const uploadImageResponse: any = await uploadFile(
      imageFile.originFileObj,
      imageFile.name,
      imageFile.type,
      "playlistThumbnails",
      userId,
      progress => {},
    );
    return uploadImageResponse;
  } catch (error) {
    return null;
  }
};
const saveFormDataWithThumbnail = async (
  PlaylistDetailsFormValues: PlaylistDetailsFormValues,
  userId: string,
  uploadThumbnailResponse,
): Promise<saveFormDataResponse> => {
  try {
    const savePlaylistResponse = await RESTAPIClient.Playlist.create(
      PlaylistDetailsFormValues.title,
      PlaylistDetailsFormValues.description,
      PlaylistDetailsFormValues.isCollaborative,
      userId,
      uploadThumbnailResponse.downloadURL,
    );
    return { savePlaylistResponse, error: null };
  } catch (error) {
    return { savePlaylistResponse: null, error };
  }
};

const saveFormDataWithoutThumbnail = async (
  PlaylistDetailsFormValues: PlaylistDetailsFormValues,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const savePlaylistResponse = await RESTAPIClient.Playlist.create(
      PlaylistDetailsFormValues.title,
      PlaylistDetailsFormValues.description,
      PlaylistDetailsFormValues.isCollaborative,
      userId,
    );
    return { savePlaylistResponse, error: null };
  } catch (error) {
    return { savePlaylistResponse: null, error };
  }
};
const saveFormData = async (
  PlaylistDetailsFormValues: PlaylistDetailsFormValues,
  userId: string,
): Promise<saveFormDataResponse> => {
  const uploadThumbnailResponse = await uploadThumbnail(
    PlaylistDetailsFormValues,
    userId,
  );
  if (uploadThumbnailResponse)
    return saveFormDataWithThumbnail(
      PlaylistDetailsFormValues,
      userId,
      uploadThumbnailResponse,
    );
  return saveFormDataWithoutThumbnail(PlaylistDetailsFormValues, userId);
};

export { saveFormData };

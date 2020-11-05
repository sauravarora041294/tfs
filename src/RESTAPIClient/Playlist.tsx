import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class Playlist {
  static get = async (playlistId: string): Promise<DataTypes.Playlist> => {
    const url = constants.API_URL + `playlists`;
    const params = { playlistId: playlistId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getUploadedByUser = async (
    creatorUserId: string,
  ): Promise<Array<DataTypes.Playlist>> => {
    const url = constants.API_URL + `playlists`;
    const params = { creatorUserId: creatorUserId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByContributorUserId = async (
    contributorUserId: string,
  ): Promise<Array<DataTypes.Playlist>> => {
    const url = constants.API_URL + `playlists`;
    const params = { contributorUserId: contributorUserId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static create = async (
    title: string,
    description: string,
    isCollaborative: boolean,
    creatorUserId: string,
    thumbnailUrl?: string,
  ): Promise<DataTypes.Playlist> => {
    const url = constants.API_URL + "playlists";
    const requiredParams = {
      title,
      description,
      isCollaborative,
      creatorUserId,
    };
    const allParams = thumbnailUrl
      ? { ...requiredParams, thumbnailUrl }
      : requiredParams;

    const response = await axios.post(url, allParams, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static getByMissionId = async (
    missionId: string,
  ): Promise<Array<DataTypes.Playlist>> => {
    const url = constants.API_URL + `playlists`;
    const params = { missionId: missionId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getContributors = async (
    playlistId: string,
  ): Promise<Array<DataTypes.User>> => {
    const url = constants.API_URL + `playlists/${playlistId}/contributors`;
    const params = {};
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static updateSection = async (
    playlistId: string,
    sectionIndex: number,
    userId: string,
    title?: string,
    description?: string,
    resourceIds?: Array<string>,
  ): Promise<Object> => {
    const updates: any = {};
    updates.userId = userId;
    if (title) {
      updates.title = title;
    }
    if (description) {
      updates.description = description;
    }
    if (resourceIds) {
      updates.resourceIds = resourceIds;
    }
    const url =
      constants.API_URL + `playlists/${playlistId}/sections/${sectionIndex}`;
    const response = await axios.patch(url, updates, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static addVideoToSection = async (
    playlistId: string,
    sectionIndex: number,
    resourceId: string,
    userId: string,
  ): Promise<Object> => {
    const url =
      constants.API_URL + `playlists/${playlistId}/sections/${sectionIndex}`;
    const response = await axios.patch(
      url,
      {
        addVideo: true,
        resourceId: resourceId,
        userId: userId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static removeVideoFromSection = async (
    resourceId: string,
    playlistId: string,
    sectionIndex: number,
    userId: string,
  ): Promise<Object> => {
    const url =
      constants.API_URL + `playlists/${playlistId}/sections/${sectionIndex}`;
    const response = await axios.patch(
      url,
      {
        removeVideo: true,
        resourceId: resourceId,
        userId: userId,
      },
      { timeout: constants.TIMEOUT },
    );
    return response.data.result;
  };

  static update = async (
    playlistId: string,
    title?: string,
    description?: string,
    isCollaborative?: boolean,
    thumbnailUrl?: string,
    orderedSectionUIDs?: Array<string>,
    userId?: string,
  ): Promise<Object> => {
    const updates: any = {};
    updates.userId = userId;
    if (title) {
      updates.title = title;
    }
    if (description) {
      updates.description = description;
    }
    if (thumbnailUrl) {
      updates.thumbnailUrl = thumbnailUrl;
    }
    if (orderedSectionUIDs) {
      updates.orderedSectionUIDs = orderedSectionUIDs;
    }
    if (isCollaborative) {
      updates.isCollaborative = isCollaborative;
    }
    const url = constants.API_URL + `playlists/${playlistId}`;
    const response = await axios.patch(url, updates, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static addSection = async (
    playlistId: string,
    userId: string,
    title: string,
    description: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `playlists/${playlistId}/sections`;
    const response = await axios.post(
      url,
      { title, description, userId },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static deleteSection = async (
    playlistId: string,
    sectionIndex: number,
    userId: string,
  ): Promise<Object> => {
    const url =
      constants.API_URL + `playlists/${playlistId}/sections/${sectionIndex}`;
    const response = await axios.delete(url, {
      params: { userId },
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static delete = async (
    playlistId: string,
    userId: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `playlists/${playlistId}`;
    const response = await axios.delete(url, {
      params: { userId },
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static removeContributor = async (
    contributorId: string,
    playlistId: string,
  ) => {
    const url = constants.API_URL + `playlists/${playlistId}`;
    const response = await axios.patch(url, {
      contributorIdToDelete: contributorId,
    });
    return response.data.result;
  };
}

export { Playlist };

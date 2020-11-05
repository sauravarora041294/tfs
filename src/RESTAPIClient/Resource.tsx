import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

interface searchResponse {
  searchResults: Array<DataTypes.Resource>;
  viewlogs: Array<DataTypes.Viewlog>;
}

class Resource {
  static get = async (resourceId: string): Promise<DataTypes.Resource> => {
    const url = constants.API_URL + `resources`;
    const params = { resourceId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static create = async (
    title: string,
    description: string,
    resourceUrl: string,
    thumbnailUrl: string,
    userId: string,
    videoLength: number,
  ): Promise<DataTypes.Resource> => {
    const url = constants.API_URL + "resources";
    const response = await axios.post(
      url,
      {
        title,
        description,
        resourceUrl,
        thumbnailUrl,
        userId,
        videoLength,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static search = async (
    userId: string,
    searchString: string,
    tags: Array<string>,
  ): Promise<searchResponse> => {
    const url = constants.API_URL + `resources`;
    const params = { searchString: searchString, userId: userId };
    if (tags.length > 0) {
      params["tags"] = JSON.stringify(tags);
    }
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByPlaylistId = async (
    playlistId: string,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + `resources`;
    const params = { playlistId: playlistId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByMissionId = async (
    missionId: string,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + `resources`;
    const params = { missionId: missionId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecent = async (): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + `resources`;
    const params = { recent: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecentlyUploadedByCreator = async (
    creatorUserId: string,
    pageSize: number,
    next?,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + `resources`;
    const params = { creatorUserId, recentlyUploaded: true, pageSize, next };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getViewStatsForResource = async (
    resourceId: string,
  ): Promise<DataTypes.ViewCounts> => {
    const url = constants.API_URL + `resources/${resourceId}/viewStats`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result as DataTypes.ViewCounts;
  };

  static getUniqueViewStatsForResource = async (
    resourceId: string,
  ): Promise<DataTypes.UniqueViewCounts> => {
    const url = constants.API_URL + `resources/${resourceId}/uniqueViewStats`;
    const response = await axios.get(url);

    return response.data.result as DataTypes.UniqueViewCounts;
  };

  static getUploadedByUser = async (
    userId: string,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + `resources/`;
    const params = { creatorUserId: userId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getUploadedByCreatorWithStats = async (
    creatorUserId: string,
  ): Promise<Array<DataTypes.ResourceWithViewStatsMetadata>> => {
    const url = constants.API_URL + `resources/`;
    const params = { creatorUserId: creatorUserId, includeStats: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRelated = async (
    resourceId: string,
    userId: string,
  ): Promise<Array<DataTypes.ResourceWithCreatorMetadata>> => {
    const url = constants.API_URL + `resources/`;
    const params = {
      resourceId: resourceId,
      userId: userId,
      related: true,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getMissionContributors = async (
    resourceId: string,
  ): Promise<Array<DataTypes.User>> => {
    const url = constants.API_URL + `resources/${resourceId}/contributors`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result;
  };

  static update = async (
    resourceId: string,
    title: string,
    description: string,
    userId: string,
    thumbnailUrl?: string,
  ): Promise<DataTypes.Resource> => {
    const url = constants.API_URL + `resources/${resourceId}`;
    const updates: any = {
      title,
      description,
      userId,
    };
    if (thumbnailUrl) {
      updates.thumbnailUrl = thumbnailUrl;
    }
    const response = await axios.patch(url, updates, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static delete = async (
    resourceId: string,
    userId: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `resources/${resourceId}`;
    const response = await axios.delete(url, {
      params: { userId },
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Resource };

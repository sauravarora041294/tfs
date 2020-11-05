import axios from "axios";
import * as DataTypes from "data/types";
import * as constants from "RESTAPIClient/constants";

export enum CountTypes {
  MISSIONS = "MISSIONS",
  RESOURCES = "RESOURCES",
  CREATORS = "CREATORS",
}
class Public {
  static getMissionById = async (
    missionId: string,
  ): Promise<DataTypes.Mission> => {
    const url = constants.API_URL + "public/missions";
    const params = { missionId: missionId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
  static getCount = async (itemType: CountTypes): Promise<number> => {
    const url =
      constants.API_URL + `public/${itemType.toLowerCase()}?count=${true}`;
    const response = await axios.get(url, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static getTopMissions = async (
    count: number,
  ): Promise<Array<DataTypes.Mission>> => {
    const url =
      constants.API_URL + `public/missions?top=${true}&count=${count}`;
    const response = await axios.get(url, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecentlyAddedContentInMission = async (
    missionId: string,
  ): Promise<DataTypes.ContentPayload> => {
    const url = constants.API_URL + "public/content";
    const params = { missionId, recentlyAdded: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getWithMetadata = async (
    creatorUserId: string,
  ): Promise<DataTypes.CreatorWithMetadata> => {
    const url = constants.API_URL + `public/creators`;
    const params = {
      creatorUserId,
      includeMetadata: true,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getPubliclyPreviewableContributorsSortedByContribution = async (
    missionId: string,
  ): Promise<Array<DataTypes.Creator>> => {
    const url = constants.API_URL + `public/missions/${missionId}/contributors`;
    const params = { orderByContribution: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getPubliclyPreviewableCreatorsInMission = async (
    creatorId: string,
  ): Promise<any> => {
    const url = constants.API_URL + "public/creators";
    const params = { creatorId, publiclyPreviewable: true };
    const response = await axios.get(url, { params });

    return response.data.result;
  };

  static getPubliclyPreviewableContentInMission = async (
    missionId: string,
  ): Promise<DataTypes.ContentPayload> => {
    const url = constants.API_URL + "public/content";
    const params = { missionId, publiclyPreviewable: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getContentInMissionBySearchString = async (
    missionId: string,
    searchString: string,
    currentPage?: number,
    pageSize?: number,
  ) => {
    const url = constants.API_URL + "public/content";
    const params = { searchString, missionId, currentPage, pageSize };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getResourceById = async (
    resourceId: string,
  ): Promise<DataTypes.Resource> => {
    const url = constants.API_URL + "public/resources";
    const params = { resourceId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getResourceByPlaylistId = async (
    playlistId: string,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + "public/resources";
    const params = { playlistId: playlistId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRelatedResources = async (
    resourceId: string,
  ): Promise<Array<DataTypes.Resource>> => {
    const url = constants.API_URL + "public/resources";
    const params = {
      resourceId: resourceId,
      related: true,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getPlaylistById = async (
    playlistId: string,
  ): Promise<DataTypes.Playlist> => {
    const url = constants.API_URL + "public/playlists";
    const params = { playlistId: playlistId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Public };

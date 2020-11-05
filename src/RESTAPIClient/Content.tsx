import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import * as constants from "./constants";
import { ORDER_BY, CONTENT_TYPE } from "../data/types/enums";

class Content {
  static getBySearchString = async (params: {
    searchString: string;
    userId: string;
    currentPage?: number;
    pageSize?: number;
    contentType?: CONTENT_TYPE;
  }) => {
    const url = constants.API_URL + `content`;
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result as DataTypes.ContentPayload;
  };

  static getByCreatorIdAndSearchString = async (
    userId: string,
    searchString: string,
    currentPage?: number,
    pageSize?: number,
  ): Promise<DataTypes.CreatorsHubSearchPayload> => {
    const url = constants.API_URL + `content`;
    const params = {
      searchString: searchString,
      creatorUserId: userId,
      currentPage,
      pageSize,
    };
    const response = await axios.get(url, { params });

    return response.data.result as DataTypes.CreatorsHubSearchPayload;
  };

  static getCreatorUploadedContentBySearchStringNewestFirst = async (params: {
    creatorUserId: string;
    searchString: string;
    currentPage?: number;
    pageSize?: number;
    contentType?: string;
  }) => {
    const url = constants.API_URL + `content`;
    const queryParams = {
      ...params,
      isUploadedByCreator: true,
      isSortedByNewestFirst: true,
      searchString: params.searchString || `''`,
    };
    const response = await axios.get(url, { params: queryParams });

    return response.data.result as DataTypes.ContentPayload;
  };

  static getByMissionAndCreator = async (
    missionId: string,
    creatorUserId: string,
  ): Promise<Array<DataTypes.Content>> => {
    const url = constants.API_URL + `content`;
    const params = { missionId, creatorUserId };
    const response = await axios.get(url, { params });
    return response.data.result as Array<DataTypes.Content>;
  };

  static getTopRated = async (params: {
    pageSize?: number;
    order?: ORDER_BY;
  }) => {
    const url = constants.API_URL + `content`;
    const queryParams = {
      pageSize: params.pageSize || 20,
      orderByRating: params.order || ORDER_BY.DESCENDING,
    };
    const response = await axios.get(url, { params: queryParams });

    return response.data.result as DataTypes.ContentPayload;
  };

  static getFeatured = async ({ userId }) => {
    const url = constants.API_URL + `content`;
    const params = { userId, featured: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecentlyAdded = async ({ userId }) => {
    const url = constants.API_URL + `content`;
    const params = { userId, recentlyAdded: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecentlyAddedContentInMission = async (
    userId: string,
    missionId: string,
  ) => {
    const url = constants.API_URL + `content`;
    const params = { userId, missionId, recentlyAdded: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecommendedForUser = async ({ userId }) => {
    const url = constants.API_URL + `content`;
    const params = { userId, recommended: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getRecommendedContentInMission = async (
    userId: string,
    missionId: string,
  ) => {
    const url = constants.API_URL + `content`;
    const params = { userId, missionId, recommended: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getContentInMissionBySearchString = async (
    searchString: string,
    userId: string,
    missionId: string,
    currentPage?: number,
    pageSize?: number,
    contentType?: Enums.CONTENT_TYPE
  ): Promise<DataTypes.ContentPayload> => {
    const url = constants.API_URL + `content`;
    const params = {
      searchString: searchString || `''`,
      userId,
      missionId,
      currentPage,
      pageSize,
      contentType
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static searchContentToJoin = async (params: {
    searchString: string;
    userId: string;
    currentPage?: number;
    pageSize?: number;
    contentType?: Enums.CONTENT_TYPE;
  }): Promise<DataTypes.ContentPayload> => {
    const url = constants.API_URL + `content`;
    const queryParams = {
      searchString: params.searchString || `''`,
      creatorUserId: params.userId,
      currentPage: params.currentPage,
      pageSize: params.pageSize,
      contentType: params.contentType,
      canJoinAsContributor: true
    };
    const response = await axios.get(url, {
      params: queryParams,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getMostRecentlyUploadedByCreator = async (
    creatorUserId: string,
    pageSize?: number,
    next?,
  ): Promise<DataTypes.PaginatedContentPayload> => {
    const url = constants.API_URL + `content`;
    const params = {
      creatorUserId,
      recentlyAdded: true,
      pageSize,
      next,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Content };

import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as Enums from "../data/types/enums";
import * as constants from "./constants";

class Mission {
  static get = async (missionId: string): Promise<DataTypes.Mission> => {
    const url = constants.API_URL + `missions`;
    const params = { missionId: missionId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByCreatorUserId = async (
    creatorUserId: string,
  ): Promise<Array<DataTypes.Mission>> => {
    const url = constants.API_URL + `missions`;
    const params = { creatorUserId: creatorUserId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByContributorUserId = async (
    contributorUserId: string,
  ): Promise<Array<DataTypes.Mission>> => {
    const url = constants.API_URL + `missions`;
    const params = { contributorUserId: contributorUserId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static create = async (
    title: string,
    purpose: string,
    creatorUserId: string,
  ): Promise<DataTypes.Mission> => {
    const url = constants.API_URL + "missions";
    const response = await axios.post(
      url,
      {
        title,
        purpose,
        creatorUserId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static getContributors = async (
    missionId: string,
  ): Promise<Array<DataTypes.User>> => {
    const url = constants.API_URL + `missions/${missionId}/contributors`;
    const params = {};
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getContributorsSortedByContribution = async (
    missionId: string,
  ): Promise<Array<DataTypes.Creator>> => {
    const url = constants.API_URL + `missions/${missionId}/contributors`;
    const params = { orderByContribution: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static update = async (
    missionId: string,
    userId: string,
    title?: string,
    purpose?: string,
    description?: string,
    formatInformation?: string,
    creatorQualifications?: string,
    thumbnailUrl?: string,
  ): Promise<DataTypes.Mission> => {
    const updates: any = {};
    updates.userId = userId;
    if (title) {
      updates.title = title;
    }
    if (purpose) {
      updates.purpose = purpose;
    }
    if (description) {
      updates.description = description;
    }
    if (description) {
      updates.description = description;
    }
    if (formatInformation) {
      updates.formatInformation = formatInformation;
    }
    if (creatorQualifications) {
      updates.creatorQualifications = creatorQualifications;
    }
    if (thumbnailUrl) {
      updates.thumbnailUrl = thumbnailUrl;
    }
    const url = constants.API_URL + `missions/${missionId}`;
    const response = await axios.patch(url, updates, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static addContent = async (
    missionId: string,
    resourceIdsToAdd: Array<string>,
    playlistIdsToAdd: Array<string>,
    userId: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `missions/${missionId}`;
    const response = await axios.patch(
      url,
      {
        playlistIdsToAdd,
        resourceIdsToAdd,
        userId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static removeContent = async (
    missionId: string,
    objectIDToRemove: string,
    contentType: string,
    userId: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `missions/${missionId}`;
    const response = await axios.patch(
      url,
      {
        objectIDToRemove,
        contentType,
        userId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static getAll = async (): Promise<Array<DataTypes.Mission>> => {
    const url = constants.API_URL + `missions`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result;
  };

  static removeContributor = async (
    contributorId: string,
    missionId: string,
  ) => {
    const url = constants.API_URL + `missions/${missionId}`;
    const response = await axios.patch(url, {
      contributorIdToDelete: contributorId,
    });
    return response.data.result;
  };

  static delete = async (
    missionId: string,
    userId: string,
  ): Promise<Object> => {
    const url = constants.API_URL + `missions/${missionId}`;
    const response = await axios.delete(url, {
      params: { userId },
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getTopRatedContent = async (params: {
    missionId: string;
    order?: Enums.ORDER_BY;
    pageSize?: number;
  }) => {
    const url = constants.API_URL + `missions/${params.missionId}`;
    const queryParams = {
      pageSize: params.pageSize || 20,
      orderByRating: params.order || Enums.ORDER_BY.DESCENDING,
    };
    const response = await axios.get(url, { params: queryParams });

    return response.data.result as DataTypes.ContentPayload;
  };
}

export { Mission };

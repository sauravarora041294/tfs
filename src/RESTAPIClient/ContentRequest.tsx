import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class ContentRequest {
  static create = async (
    userId: string,
    missionId: string,
    description: string,
  ): Promise<DataTypes.ContentRequest> => {
    const url = constants.API_URL + "contentrequests/";
    const response = await axios.post(
      url,
      {
        userId,
        missionId,
        description,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static resolve = async ({
    contentRequestId,
    resolverUserId,
    contentIds,
    reviewDetails,
  }: {
    contentRequestId: string;
    resolverUserId: string;
    contentIds: Array<string>;
    reviewDetails: string;
  }) => {
    const url = constants.API_URL + `contentrequests/${contentRequestId}`;
    const response = await axios.patch(
      url,
      {
        resolverUserId,
        contentIds,
        reviewDetails,
      },
      { timeout: constants.TIMEOUT },
    );
    return response.data.result;
  };

  static upvote = async ({
    contentRequestId,
    upvoterUserId,
  }: {
    contentRequestId: string;
    upvoterUserId: string;
  }) => {
    const url = constants.API_URL + `contentrequests/${contentRequestId}`;
    const response = await axios.patch(
      url,
      {
        upvoterUserId,
      },
      { timeout: constants.TIMEOUT },
    );
    return response.data.result;
  };

  static getByMissionId = async (
    missionId: string,
  ): Promise<Array<DataTypes.ContentRequest>> => {
    const url = constants.API_URL + `contentrequests/`;
    const params = { missionId: missionId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getByMissionIdWithMetadata = async (
    missionId: string,
  ): Promise<Array<DataTypes.ContentRequest>> => {
    const url = constants.API_URL + `contentrequests/`;
    const params = { missionId: missionId, includeMetadata: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { ContentRequest };

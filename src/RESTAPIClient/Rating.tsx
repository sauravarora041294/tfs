import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class Rating {
  static create = async (
    userId: string,
    resourceId: string,
    rating: number,
    feedback: string,
    creatorUserId: string,
  ): Promise<DataTypes.Rating> => {
    const url = constants.API_URL + "ratings";
    const response = await axios.post(
      url,
      {
        userId,
        resourceId,
        rating,
        feedback: feedback === null || feedback === "" ? undefined : feedback,
        creatorUserId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static getLatestForUserByResourceId = async (
    resourceId: string,
  ): Promise<Array<DataTypes.RatingWithMetadata>> => {
    const url = constants.API_URL + "ratings";
    const params = { resourceId: resourceId, latest: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };
  static getForResourceByIds = async (
    userId: string,
    resourceId: string,
  ): Promise<DataTypes.RatingWithMetadata> => {
    const url = constants.API_URL + "ratings";
    const params = { userId: userId, resourceId: resourceId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getForCreatorUserId = async (
    creatorUserId: string,
  ): Promise<Array<DataTypes.RatingWithMetadata>> => {
    const url = constants.API_URL + "ratings";
    const params = { creatorUserId: creatorUserId };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Rating };

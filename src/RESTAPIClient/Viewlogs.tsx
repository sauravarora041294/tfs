import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class Viewlog {
  static create = async (
    userId: string,
    resourceId: string,
    completed: boolean,
    viewEndTime: number,
  ): Promise<DataTypes.Viewlog> => {
    const url = constants.API_URL + "viewlogs";
    const response = await axios.post(
      url,
      {
        userId,
        resourceId,
        completed,
        viewEndTime,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static getLatestForUserId = async (
    userId: string,
  ): Promise<DataTypes.UserLatestViewlogs> => {
    const url = constants.API_URL + `viewlogs`;
    const params = { userId: userId, latest: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result as DataTypes.UserLatestViewlogs;
  };
}

export { Viewlog };

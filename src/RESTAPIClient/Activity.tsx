import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class Activity {
  static getNotificationsByUserId = async (params: {
    creatorUserId: string;
  }): Promise<Array<DataTypes.ActivityNotification>> => {
    const url = constants.API_URL + `activity/notifications`;
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Activity };
